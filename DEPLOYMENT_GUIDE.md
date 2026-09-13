# Netlify Deployment Guide

This guide walks you through deploying your JavaScript web app to Netlify using GitHub Actions.

## Prerequisites

1. **Netlify Account** — Sign up at [netlify.com](https://netlify.com)
2. **GitHub Repository** — Already have `varadareddyjyothi-sketch/ganesh-chathruti`

## Setup Steps

### Step 1: Create Netlify Site

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Choose your repository: `varadareddyjyothi-sketch/ganesh-chathruti`
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist` (or your output folder)
6. Click **Deploy site**

### Step 2: Get Netlify Credentials

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Get your **Site ID** (found in **General** → **Site information**)
3. Go to **User settings** → **Applications** → **Personal access tokens**
4. Create a new token and copy it

### Step 3: Add GitHub Secrets

1. Go to your GitHub repo: https://github.com/varadareddyjyothi-sketch/ganesh-chathruti
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Create two new repository secrets:
   - `NETLIFY_SITE_ID` — Your Netlify site ID
   - `NETLIFY_AUTH_TOKEN` — Your Netlify personal access token

### Step 4: Deploy

Push code to `main` branch and GitHub Actions will automatically deploy to Netlify:

```bash
git push origin main
```

Monitor deployment:
- **GitHub Actions**: https://github.com/varadareddyjyothi-sketch/ganesh-chathruti/actions
- **Netlify Dashboard**: https://app.netlify.com

## Troubleshooting

**Build fails?** Check:
- `npm install` works locally
- `npm run build` produces output in `dist/` folder
- Update `publish` in `netlify.toml` if your output folder is different

**Deploy fails?** Check:
- `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are set correctly in GitHub Secrets
- Your Netlify account has permission to the site

**Need help?** See [Netlify Docs](https://docs.netlify.com)
