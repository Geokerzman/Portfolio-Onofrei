#!/usr/bin/env python3
"""Check the static site's local HTML/CSS references without external services."""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

REQUIRED = (
    "index.html", "work/marp.html", "work/konform.html", "work/onset.html",
    "impressum.html", "datenschutz.html", "assets/css/main.css",
    "assets/css/tailwind.css", "assets/js/main.js", "favicon.svg",
)


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if value and name in ("href", "src", "poster"):
                self.urls.append(value)
            elif value and name == "srcset":
                self.urls.extend(item.strip().split()[0] for item in value.split(","))


def validate(root):
    root = Path(root).resolve()
    errors = []
    references = 0
    for name in REQUIRED:
        path = root / name
        if not path.is_file() or not path.stat().st_size:
            errors.append(f"Missing or empty required file: {name}")
    for source in sorted(root.rglob("*")):
        if source.is_symlink():
            errors.append(f"Symlinks are not published: {source.relative_to(root)}")
            continue
        if source.suffix not in (".html", ".css", ".js") or not source.is_file():
            continue
        content = source.read_text(encoding="utf-8")
        urls = []
        if source.suffix == ".html":
            parser = References()
            parser.feed(content)
            urls = parser.urls
        elif source.suffix == ".css":
            urls = [m.group(2) for m in re.finditer(r"url\(\s*(['\"]?)(.*?)\1\s*\)", content)]
        else:
            # Translated CV links in main.js are resolved against the HTML page.
            urls = re.findall(r'["\']((?:\.?/?assets/)[^"\']+)["\']', content)
        for url in urls:
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            references += 1
            base = root if parsed.path.startswith("/") or source.suffix == ".js" else source.parent
            target = (base / unquote(parsed.path).lstrip("/")).resolve()
            if not target.is_relative_to(root) or not target.exists():
                errors.append(f"{source.relative_to(root)}: missing local reference {url}")
    if errors:
        raise ValueError("\n".join(errors))
    print(f"Validated {len(list(root.rglob('*.html')))} HTML pages and {references} local references.")


if __name__ == "__main__":
    try:
        validate(sys.argv[1] if len(sys.argv) > 1 else "site")
    except (ValueError, OSError) as error:
        sys.exit(str(error))
