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

### Hard Reset to Remote Version
If you need to discard all local changes and reset to the remote repository version:
```bash
# Fetch the latest state from the remote
git fetch origin

# Reset your local main branch to match the remote main branch
git reset --hard origin/main

# Clean up any untracked files and directories
git clean -fd
```
This will discard all local changes, untracked files, and reset your local repository to exactly match the remote version.

### Working with Branches

#### Creating and Using a Feature Branch
When working on new features or fixes, it's best to use a separate branch:

1. Create a new branch for your feature/changes:
```bash
# Create and switch to a new branch
git checkout -b feature-name
```

2. Make your changes, commit them to the branch:
```bash
git add .
git commit -m "Description of your changes"
```

3. Push the branch to GitHub:
```bash
git push origin feature-name
```

#### Merging Back to Main
When your changes are ready to be merged to the main branch:

1. Switch back to the main branch:
```bash
git checkout main
```

2. Pull the latest changes from remote main:
```bash
git pull origin main
```

3. Merge your feature branch:
```bash
git merge feature-name
```

4. Resolve any conflicts if they occur
   
5. Push the updated main to GitHub:
```bash
git push origin main
```

6. Optional: Delete the feature branch when no longer needed:
```bash
# Delete local branch
git branch -d feature-name

# Delete remote branch
git push origin --delete feature-name
```
```

These instructions cover the full workflow from creating a branch to merging back to main and cleaning up afterward. This approach helps keep the main branch stable while you work on new features or changes.