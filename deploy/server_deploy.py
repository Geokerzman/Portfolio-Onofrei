#!/usr/bin/python3
"""Forced SSH command for portfolio-deploy; installed and owned by root."""
import fcntl
import hashlib
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import signal
import subprocess
import sys
import tarfile
import tempfile

from validate_site import validate

BASE = Path("/var/www/portfolio.bo-design.info")
RELEASES = BASE / "releases"
RELEASE_ID = r"[0-9a-f]{40}-[1-9][0-9]*-[1-9][0-9]*"
HEALTH_PATHS = ("/", "/work/marp.html", "/work/konform.html", "/work/onset.html",
                "/impressum.html", "/datenschutz.html", "/assets/css/main.css",
                "/assets/js/main.js", "/assets/fonts/Satoshi-Regular.woff2",
                "/assets/images/hero/portrait.webp",
                "/assets/docs/Boris_Onofrei_CV_ProductDesigner_EN.pdf",
                "/assets/docs/Boris_Onofrei_Lebenslauf_Produktdesigner_DE.pdf")


def activate(release):
    pending = BASE / "current.next"
    pending.unlink(missing_ok=True)
    pending.symlink_to(release)
    pending.replace(BASE / "current")


def health(release):
    for path in HEALTH_PATHS:
        result = subprocess.run(
            ["curl", "--fail", "--silent", "--show-error", "--noproxy", "*",
             "--connect-timeout", "5", "--max-time", "15", "--retry", "2",
             "--resolve", "portfolio.bo-design.info:443:127.0.0.1",
             "https://portfolio.bo-design.info" + path],
            check=True, stdout=subprocess.PIPE,
        )
        expected = release / ("index.html" if path == "/" else path.lstrip("/"))
        if hashlib.sha256(result.stdout).digest() != hashlib.sha256(expected.read_bytes()).digest():
            raise ValueError(f"HTTPS content mismatch: {path}")


def switch_and_check(release):
    previous = (BASE / "current").resolve(strict=True)
    try:
        activate(release)
        health(release)
    except BaseException:
        activate(previous)
        print(f"Health check failed; restored {previous.name}.", file=sys.stderr)
        raise


def extract(stream, destination):
    size = 0
    seen = set()
    with tarfile.open(fileobj=stream, mode="r|gz") as archive:
        for member in archive:
            path = PurePosixPath(member.name)
            if member.name in (".", "./") and member.isdir():
                continue
            if (path.is_absolute() or not path.parts or
                    any(part in ("..", "") or part.startswith(".") for part in path.parts) or
                    member.name in seen or len(seen) >= 10000 or
                    not (member.isfile() or member.isdir())):
                raise ValueError(f"Unsafe archive entry: {member.name}")
            seen.add(member.name)
            size += member.size
            if size > 256 * 1024 * 1024:
                raise ValueError("Unpacked site exceeds 256 MiB.")
            target = destination.joinpath(*path.parts)
            if member.isdir():
                target.mkdir(mode=0o755, parents=True, exist_ok=True)
            else:
                target.parent.mkdir(mode=0o755, parents=True, exist_ok=True)
                with archive.extractfile(member) as source, target.open("xb") as output:
                    shutil.copyfileobj(source, output)
                target.chmod(0o644)


def deploy(release_id):
    destination = RELEASES / release_id
    if destination.exists():
        raise ValueError("Release already exists; rerun the GitHub job for a new attempt.")
    staging = Path(tempfile.mkdtemp(prefix=".upload-", dir=RELEASES))
    try:
        staging.chmod(0o755)
        extract(sys.stdin.buffer, staging)
        validate(staging)
        staging.rename(destination)
        switch_and_check(destination)
    finally:
        if staging.exists():
            shutil.rmtree(staging)
    # Keep five CI releases, always preserving current and the original deployment.
    active = (BASE / "current").resolve()
    versions = sorted((p for p in RELEASES.iterdir() if re.fullmatch(RELEASE_ID, p.name)
                       and p.is_dir() and not p.is_symlink()),
                      key=lambda p: p.stat().st_mtime, reverse=True)
    for old in versions[5:]:
        if old != active:
            shutil.rmtree(old)
    print(f"Deployed {release_id}: https://portfolio.bo-design.info/")


def main():
    os.umask(0o022)
    command = os.environ.get("SSH_ORIGINAL_COMMAND", "")
    match = re.fullmatch(r"(deploy|rollback) (" + RELEASE_ID + r")", command)
    if not match:
        raise ValueError("Only 'deploy <sha>-<run>-<attempt>' or 'rollback <release>' is allowed.")
    # Timeout also covers a client that stops sending an archive. SIGTERM rolls back.
    def interrupted(signum, frame):
        raise RuntimeError("Deployment interrupted.")
    for sig in (signal.SIGTERM, signal.SIGHUP, signal.SIGALRM):
        signal.signal(sig, interrupted)
    signal.alarm(480)
    with (BASE / ".deploy.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        operation, release_id = match.groups()
        if operation == "deploy":
            deploy(release_id)
        else:
            target = RELEASES / release_id
            if not target.is_dir() or target.is_symlink():
                raise ValueError("Unknown release.")
            validate(target)
            switch_and_check(target)
            print(f"Rolled back to {release_id}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        sys.exit(str(error))
