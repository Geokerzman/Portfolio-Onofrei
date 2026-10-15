import io
import os
from pathlib import Path
import sys
import tarfile
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import server_deploy
from validate_site import REQUIRED, validate


class DeploymentTests(unittest.TestCase):
    def archive(self, name, kind=tarfile.REGTYPE):
        stream = io.BytesIO()
        with tarfile.open(fileobj=stream, mode="w:gz") as archive:
            entry = tarfile.TarInfo(name)
            entry.type = kind
            entry.linkname = "/etc/passwd" if kind == tarfile.SYMTYPE else ""
            entry.size = 4 if kind == tarfile.REGTYPE else 0
            archive.addfile(entry, io.BytesIO(b"test") if entry.size else None)
        stream.seek(0)
        return stream

    def test_unsafe_archives_are_rejected(self):
        for name, kind in (("../outside", tarfile.REGTYPE), ("/tmp/outside", tarfile.REGTYPE),
                           (".ssh/key", tarfile.REGTYPE), ("link", tarfile.SYMTYPE),
                           ("hardlink", tarfile.LNKTYPE)):
            with self.subTest(name=name), tempfile.TemporaryDirectory() as directory:
                with self.assertRaises(ValueError):
                    server_deploy.extract(self.archive(name, kind), Path(directory))

    def test_regular_file_is_extracted_without_archive_permissions(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory)
            server_deploy.extract(self.archive("./assets/file.txt"), path)
            self.assertEqual((path / "assets/file.txt").read_bytes(), b"test")
            self.assertEqual((path / "assets/file.txt").stat().st_mode & 0o777, 0o644)

    def test_broken_reference_blocks_release(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in REQUIRED:
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("placeholder")
            (root / "index.html").write_text('<img src="missing.webp">')
            with self.assertRaisesRegex(ValueError, "missing.webp"):
                validate(root)

    def test_failed_health_check_restores_previous_release(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            old, new = base / "old", base / "new"
            old.mkdir()
            new.mkdir()
            (base / "current").symlink_to(old)
            with patch.object(server_deploy, "BASE", base), patch.object(
                    server_deploy, "health", side_effect=ValueError("unhealthy")):
                with self.assertRaisesRegex(ValueError, "unhealthy"):
                    server_deploy.switch_and_check(new)
            self.assertEqual((base / "current").resolve(), old.resolve())

    def test_arbitrary_ssh_commands_are_rejected(self):
        with patch.dict(os.environ, {"SSH_ORIGINAL_COMMAND": "cat /etc/passwd"}):
            with self.assertRaisesRegex(ValueError, "Only"):
                server_deploy.main()


if __name__ == "__main__":
    unittest.main()
