# Portfolio
Web App Portfolio for work/online cv

## Development Guide

### Initial Setup
1. Clone the repository
```bash
git clone https://github.com/natgluons/portfolio.git
cd portfolio
```

### Local Development
2. Run the project locally using Python's HTTP server:
   - Using Python 3:
   ```bash
   python -m http.server 8000
   ```
   - Using Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   Then open http://localhost:8000 in your browser

### Making Changes
3. Edit files as needed
4. Test changes locally using the steps above
5. Stage, commit, and push changes:
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

### Deploying to GitHub Pages
6. Go to your repository on GitHub
7. Click Settings > Pages
8. Under "Source", select "Deploy from a branch"
9. Under "Branch", select "main" and "/(root)"
10. Click Save
11. Wait a few minutes, then your site will be live at:
    https://natgluons.github.io/portfolio/

### Quick Reference
- Clone: `git clone https://github.com/natgluons/portfolio.git`
- Run locally: `python -m http.server 8000`
- View local: http://localhost:8000
- Push changes: `git add . && git commit -m "message" && git push origin main`
- View live: https://natgluons.github.io/portfolio/