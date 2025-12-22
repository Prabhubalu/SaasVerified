# Netlify "Page Not Found" Troubleshooting Guide

If you're seeing "Page Not Found" errors on Netlify, follow these steps:

## Quick Fixes

### 1. Update netlify.toml Configuration

Make sure your `netlify.toml` looks like this (without the `publish` directory):

```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Important:** Remove the `publish = ".next"` line - the Next.js plugin handles this automatically.

### 2. Install Netlify Next.js Plugin

The plugin should be installed automatically, but you can add it to your `package.json`:

```bash
npm install --save-dev @netlify/plugin-nextjs
```

Or add it manually to `package.json`:

```json
{
  "devDependencies": {
    "@netlify/plugin-nextjs": "^4.39.0"
  }
}
```

### 3. Check Build Logs

1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Deploys** tab
4. Click on the latest deploy
5. Check the build logs for errors

**Common build errors:**
- Missing environment variables
- Prisma Client not generated
- Build timeout

### 4. Verify Environment Variables

Make sure these are set in Netlify:
- `NODE_ENV=production`
- `DATABASE_URL` (your database connection string)
- `NEXTAUTH_URL` (your Netlify site URL, e.g., `https://your-site.netlify.app`)
- `NEXTAUTH_SECRET` (generated secret)
- `NEXT_PUBLIC_SITE_URL` (your Netlify site URL)

### 5. Rebuild the Site

After making changes:

1. **Trigger a new deploy:**
   - Go to Netlify dashboard
   - Click **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

2. **Or push a new commit:**
   ```bash
   git add netlify.toml
   git commit -m "Fix Netlify configuration"
   git push
   ```

### 6. Check Function Logs

1. Go to Netlify dashboard
2. Click **Functions** tab
3. Check for any errors in the function logs
4. Look for `___netlify-handler` function

### 7. Verify Next.js Version Compatibility

Your Next.js 14 should work, but verify in build logs that it's building correctly.

## Common Issues and Solutions

### Issue: "404 Page Not Found" on all routes

**Solution:**
- Remove `publish` directory from `netlify.toml`
- Ensure `@netlify/plugin-nextjs` is in the plugins section
- Clear cache and redeploy

### Issue: Build succeeds but pages don't load

**Solution:**
- Check that `NEXT_PUBLIC_SITE_URL` matches your Netlify URL exactly
- Verify environment variables are set correctly
- Check function logs for runtime errors

### Issue: API routes return 404

**Solution:**
- API routes should work automatically with the plugin
- Check that your API routes are in `app/api/` directory
- Verify the route structure matches Next.js App Router conventions

### Issue: Database connection errors

**Solution:**
- Use connection pooling URL (especially for Supabase - use port 6543)
- Verify `DATABASE_URL` is set correctly
- Check that Prisma Client is generated during build (check `postinstall` script)

### Issue: Static assets not loading

**Solution:**
- Ensure images are in the `public/` directory
- Check that image domains are configured in `next.config.mjs`
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly

## Step-by-Step Fix

1. **Update netlify.toml:**
   ```toml
   [build]
     command = "npm run build"

   [build.environment]
     NODE_VERSION = "18"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Commit and push:**
   ```bash
   git add netlify.toml
   git commit -m "Fix Netlify configuration for Next.js"
   git push
   ```

3. **In Netlify dashboard:**
   - Go to **Site settings** → **Build & deploy**
   - Verify build command: `npm run build`
   - Verify publish directory is empty (or `.next` if it doesn't work)
   - Go to **Environment variables** and verify all are set

4. **Clear cache and redeploy:**
   - **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

5. **Wait for build to complete** (usually 2-5 minutes)

6. **Test your site:**
   - Visit your Netlify URL
   - Check homepage loads
   - Test navigation to other pages
   - Test API routes

## Still Not Working?

### Check Build Output

Look for these in build logs:
- ✅ "Next.js plugin detected"
- ✅ "Generating static pages"
- ✅ "Build completed successfully"

### Verify Plugin Installation

The plugin should be listed in build logs. If not:
1. Add to `package.json` devDependencies
2. Commit and push
3. Redeploy

### Test Locally

Build locally to check for errors:
```bash
npm run build
npm run start
```

If it works locally but not on Netlify, it's likely a configuration issue.

### Contact Support

If nothing works:
1. Check Netlify community forums
2. Review Netlify Next.js documentation
3. Check your build logs for specific error messages

## Additional Resources

- [Netlify Next.js Plugin Docs](https://github.com/netlify/netlify-plugin-nextjs)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Support](https://www.netlify.com/support/)

