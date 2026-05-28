# 🚀 GitHub Pages Deployment Guide for SmallTalkLab

## Step 1: Initialize Git in Your Project Folder

Open PowerShell and run:

```powershell
cd "c:\Users\Dell\Documents\english trainer"
git init
git add .
git commit -m "Initial commit: SmallTalkLab English Learning Platform"
```

## Step 2: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it: `speakup-ai` (or any name you prefer)
4. Keep it **Public** (required for free GitHub Pages)
5. **Do NOT** check "Add a README" (we already have files)
6. Click **Create repository**

## Step 3: Push Your Code to GitHub

After creating the repo, GitHub will show you commands. Use these:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/speakup-ai.git
git branch -M main
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username

## Step 4: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select: **Deploy from a branch**
5. Branch: **main** | Folder: **/ (root)**
6. Click **Save**

## Step 5: Access Your Live Site

After ~2 minutes, your site will be live at:

```
https://YOUR_USERNAME.github.io/speakup-ai
```

## Notes

- **Web Speech API** requires HTTPS — GitHub Pages provides this automatically! ✅
- If speech recognition doesn't work locally (file://), use GitHub Pages or a local server
- For local development: `npx serve .` or use VS Code Live Server extension

## Running Locally with a Server

```powershell
# Option 1: npx serve
npx serve "c:\Users\Dell\Documents\english trainer"

# Option 2: Python
cd "c:\Users\Dell\Documents\english trainer"
python -m http.server 8000
# Then open: http://localhost:8000
```
