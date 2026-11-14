#!/usr/bin/env python3
"""Local development server for the portfolio.

Run from the project root:

    python serve.py

Then open http://localhost:8123/.

The site links to clean URLs such as /home and /experience. GitHub Pages
resolves those automatically, but Python's stock http.server does not. This
server maps each extensionless URL to the matching .html file so every page and
navigation link works locally too.
"""

from __future__ import annotations

import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
PORT = 8123


class PortfolioRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path: str) -> str:
        # Let the standard handler sanitize the path and resolve real files.
        translated = super().translate_path(path)

        if os.path.exists(translated):
            return translated

        # /home -> /home.html, /experience -> /experience.html, etc.
        clean_path = unquote(urlsplit(path).path)
        if clean_path not in ("", "/") and not Path(clean_path).suffix:
            html_path = translated + ".html"
            if os.path.isfile(html_path):
                return html_path

        return translated

    def end_headers(self) -> None:
        # Make local edits show up immediately.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", PORT), PortfolioRequestHandler)
    print(f"Portfolio running at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")


if __name__ == "__main__":
    main()
