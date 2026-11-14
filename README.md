# Portfolio

An interactive web portfolio showcasing my work, tools, creative projects, educational background, and achievements.

Link: https://natgluons.github.io/portfolio/

## Run locally

Requires Python 3.8+.

From the project root:

```bash
python serve.py
```

Then open **http://localhost:8123/**.

`serve.py` serves the site on port 8123 and maps the clean URLs used by the
navigation (`/home`, `/experience`, `/questlog`) to their matching `.html`
files, so you can click through every page locally instead of opening each
HTML file separately.

Handy local URLs:

- http://localhost:8123/ — redirects to the home page
- http://localhost:8123/home — home page
- http://localhost:8123/experience — experience and education
- http://localhost:8123/questlog — quest log
- http://localhost:8123/home?intro — replay the storybook intro
- http://localhost:8123/home?skipIntro=1 — skip the intro

> Note: `python -m http.server 8123` also serves the files, but clean links
> such as `/experience` return 404 with it. Use `python serve.py` for local
> browsing.
