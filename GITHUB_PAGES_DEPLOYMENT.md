# GitHub Pages Deployment Guide

## Configuration Completed ✅

Your project has been configured for GitHub Pages deployment. Here's what was set up:

### 1. **package.json Updates**

✅ Added `"homepage": "https://dannitao.github.io"` - This tells the build system to use the correct base path

✅ Added `gh-pages` as a dev dependency - Tool that automates pushing built files to GitHub Pages

✅ Added deployment scripts:

- `predeploy`: Automatically runs the build before deployment
- `deploy`: Pushes the build folder to the `gh-pages` branch

## Deployment Steps

### First Time Setup

1. **Install dependencies** (if not already done):

```bash
npm install
```

2. **Build your project**:

```bash
npm run build
```

3. **Deploy to GitHub Pages**:

```bash
npm run deploy
```

### For Future Deployments

Simply run:

```bash
npm run deploy
```

That's it! The `predeploy` script will automatically rebuild your project before deploying.

## How It Works

1. `npm run deploy` calls `predeploy` which runs `npm run build`
2. The build process creates optimized production files in the `/build` directory
3. The `gh-pages` package takes everything in `/build` and pushes it to the `gh-pages` branch on GitHub
4. GitHub automatically serves the `gh-pages` branch at `https://dannitao.github.io`

## GitHub Pages Configuration

You may need to configure your GitHub repository to serve from the `gh-pages` branch:

1. Go to your repository settings: `https://github.com/dannitao/dannitao.github.io/settings/pages`
2. Under "Source", select:
   - **Branch**: `gh-pages`
   - **Directory**: `/ (root)`
3. Save

## Troubleshooting

### Build fails locally but you want to deploy anyway

```bash
npm run deploy
```

(The predeploy hook will show you the error - fix it before deploying)

### Want to test locally before deploying

```bash
npm start
```

This runs a local development server at `http://localhost:3000`

### Deployed site shows 404 errors on page refresh

This is a common SPA (Single Page Application) issue. Since this project doesn't use routing yet, you shouldn't encounter this. If you add routing in the future, you may need a `public/_redirects` or `public/404.html` file. See [SPA handling docs](https://github.blog/2016-08-17-deploy-jekyll-sites-faster-with-travis-ci/) for solutions.

### Site is blank or shows old content

- Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check that the deployment log shows success (look at the "Actions" tab in your repo)
- Verify the `gh-pages` branch exists in your repository

## Important Notes

⚠️ **Do NOT commit the `/build` directory** - `.gitignore` already excludes it  
⚠️ **The `gh-pages` branch is auto-generated** - Don't manually edit it  
✅ **Your TypeScript will be compiled** - TypeScript is only used during development  
✅ **All TypeScript is removed in production** - Only pure JavaScript is deployed

## Environment Variables (Optional)

If you need environment variables in production, create a `.env.production` file:

```
REACT_APP_API_URL=https://api.example.com
```

Access in code:

```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

Only variables prefixed with `REACT_APP_` are accessible (for security).

## Next Steps After Deployment

1. **Test your site**: Visit `https://dannitao.github.io`
2. **Set up custom domain** (optional): Add a `CNAME` file or configure in repo settings
3. **Monitor deployments**: Check the "Actions" tab in your GitHub repo for deployment logs

## Quick Reference Commands

```bash
# Development
npm start          # Run locally on http://localhost:3000

# Testing
npm test           # Run tests

# Production
npm run build      # Create optimized build (in /build folder)
npm run deploy     # Deploy to GitHub Pages (runs build automatically)
```

---

For more info: https://create-react-app.dev/deployment/github-pages/
