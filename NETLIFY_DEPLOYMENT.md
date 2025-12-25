# Netlify Deployment Guide

This guide will help you deploy your SaasVerified Next.js application on Netlify temporarily.

## Prerequisites

- Netlify account (free tier available)
- GitHub account (or GitLab/Bitbucket)
- PostgreSQL database (can use free services like Supabase, Railway, or Neon)
- Domain name (optional - Netlify provides free subdomain)

## Important Notes

⚠️ **For Netlify deployment, you'll need:**

1. **External Database:** Netlify serverless functions work best with connection pooling. Use:
   - **Supabase** (free PostgreSQL with connection pooling) - Recommended
   - **Neon** (serverless PostgreSQL) - Recommended
   - **Railway** (PostgreSQL)
   - **Any PostgreSQL with connection pooling enabled**

2. **Connection Pooling:** Your database connection string should use a connection pooler URL (not direct connection)

3. **Environment Variables:** Set all required variables in Netlify dashboard

---

## Step 1: Set Up External Database

### Option A: Supabase (Recommended - Free)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (use the "URI" format)
5. **Important:** Use the **Connection Pooling** URL (port 6543) for serverless functions:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true
   ```
6. Or use the **Transaction** mode connection string from the connection pooler section

### Option B: Neon (Recommended - Free)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string
4. Neon automatically provides connection pooling

### Option C: Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Create a new PostgreSQL database
3. Copy the connection string
4. Add `?pgbouncer=true` if using connection pooling

---

## Step 2: Push Database Schema

Before deploying, set up your database schema:

```bash
# Set your database URL temporarily
export DATABASE_URL="your-database-connection-string"

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

Or use Prisma Studio to manage your database:
```bash
npx prisma studio
```

---

## Step 3: Prepare Your Repository

1. **Commit all files** to your Git repository:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push
   ```

2. **Make sure these files are committed:**
   - `netlify.toml` ✅
   - `package.json` ✅
   - `next.config.mjs` ✅
   - `.env.example` ✅
   - All source files ✅

3. **Do NOT commit:**
   - `.env` file (keep it local)
   - `node_modules/` (already in .gitignore)

---

## Step 4: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Go to [app.netlify.com](https://app.netlify.com)**
2. Click **"Add new site"** → **"Import an existing project"**
3. **Connect to Git:**
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your `SaasVerified` repository

4. **Configure build settings:**
   - **Build command:** `npm run build` (auto-detected)
   - **Publish directory:** `.next` (auto-detected)
   - **Node version:** `18` (or higher)

5. **Add environment variables:**
   Click **"Show advanced"** → **"New variable"** and add:

   ```env
   NODE_ENV=production
   DATABASE_URL=your-database-connection-string-with-pooling
   NEXTAUTH_URL=https://your-site-name.netlify.app
   NEXTAUTH_SECRET=your-generated-secret-here
   NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_VERIFICATION=your-google-verification-code
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

6. **Deploy:**
   - Click **"Deploy site"**
   - Wait for the build to complete (usually 2-5 minutes)

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize site:**
   ```bash
   netlify init
   ```
   - Follow the prompts
   - Choose "Create & configure a new site"
   - Select your team
   - Choose a site name

4. **Set environment variables:**
   ```bash
   netlify env:set DATABASE_URL "your-database-connection-string"
   netlify env:set NEXTAUTH_URL "https://your-site-name.netlify.app"
   netlify env:set NEXTAUTH_SECRET "your-generated-secret"
   netlify env:set NEXT_PUBLIC_SITE_URL "https://your-site-name.netlify.app"
   # Add other variables as needed
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

---

## Step 5: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions:
   - Add A record or CNAME record
   - Wait for DNS propagation (can take up to 48 hours)

5. **Update environment variables** with your custom domain:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

---

## Step 6: Verify Deployment

1. Visit your Netlify site URL
2. Check if the homepage loads
3. Test API routes (e.g., `/api/auth/signin`)
4. Test database connections
5. Test authentication (if configured)

---

## Environment Variables Checklist

Make sure these are set in Netlify:

- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` (with connection pooling)
- [ ] `NEXTAUTH_URL` (your Netlify URL)
- [ ] `NEXTAUTH_SECRET` (generated secret)
- [ ] `NEXT_PUBLIC_SITE_URL` (your Netlify URL)
- [ ] `GOOGLE_CLIENT_ID` (if using Google OAuth)
- [ ] `GOOGLE_CLIENT_SECRET` (if using Google OAuth)
- [ ] `GOOGLE_VERIFICATION` (for SEO)

---

## Troubleshooting

### Build Fails

1. **Check build logs** in Netlify dashboard
2. **Common issues:**
   - Missing environment variables
   - Node version mismatch (ensure Node 18+)
   - Build timeout (increase in netlify.toml if needed)

3. **Fix build command:**
   ```toml
   [build]
     command = "npm install && npm run build"
   ```

### Database Connection Errors

1. **Use connection pooling URL:**
   - Supabase: Use port 6543 with `?pgbouncer=true`
   - Neon: Use the provided connection string
   - Other: Ensure connection pooling is enabled

2. **Check Prisma Client:**
   - Ensure `npm run db:generate` runs during build
   - Check `postinstall` script in package.json

3. **Test connection:**
   ```bash
   # Test locally with production database URL
   DATABASE_URL="your-db-url" npx prisma db push
   ```

### API Routes Not Working

1. **Check Netlify Functions:**
   - API routes should work automatically with Next.js plugin
   - Check function logs in Netlify dashboard

2. **Verify Next.js plugin:**
   - Ensure `@netlify/plugin-nextjs` is installed
   - Check netlify.toml configuration

### Authentication Issues

1. **Check NEXTAUTH_URL:**
   - Must match your actual site URL exactly
   - Include `https://` protocol
   - No trailing slash

2. **Verify OAuth callbacks:**
   - Update Google OAuth redirect URLs to include Netlify domain
   - Format: `https://your-site.netlify.app/api/auth/callback/google`

---

## Updating Your Site

### Automatic Deployments

Netlify automatically deploys when you push to your main branch.

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update site"
   git push
   ```
3. Netlify will automatically build and deploy

### Manual Deploy

```bash
netlify deploy --prod
```

### Preview Deployments

Netlify creates preview deployments for pull requests automatically.

---

## Netlify-Specific Optimizations

### 1. Enable Edge Functions (Optional)

For better performance, you can use Netlify Edge Functions for some routes.

### 2. Image Optimization

Next.js Image component works with Netlify. Ensure your image domains are configured in `next.config.mjs`.

### 3. Caching

Netlify automatically caches static assets. For API routes, configure cache headers if needed.

---

## Cost Considerations

### Netlify Free Tier Includes:

- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ SSL certificates
- ✅ Custom domains
- ✅ Serverless functions (125k invocations/month)

### When You Might Need to Upgrade:

- High traffic (>100GB/month)
- Many builds (>300 minutes/month)
- High API usage (>125k invocations/month)

---

## Migration to Hostinger VPS Later

When ready to move to Hostinger VPS:

1. **Export database:**
   ```bash
   # From your current database
   pg_dump your-database-url > backup.sql
   ```

2. **Follow Hostinger VPS deployment guide:**
   - See `HOSTINGER_DEPLOYMENT.md`
   - Import database backup
   - Update environment variables
   - Deploy application

3. **Update DNS:**
   - Point domain to Hostinger VPS
   - Wait for DNS propagation

---

## Quick Reference

### Netlify Dashboard
- **Site URL:** `https://app.netlify.com`
- **Build logs:** Site → Deploys → Click on deploy
- **Environment variables:** Site settings → Environment variables
- **Domain settings:** Site settings → Domain management

### Useful Commands
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# View logs
netlify logs

# Open site
netlify open
```

---

## Support

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Next.js on Netlify:** [docs.netlify.com/integrations/frameworks/nextjs](https://docs.netlify.com/integrations/frameworks/nextjs)
- **Netlify Support:** Available in dashboard

For application-specific issues, refer to the main README.md file.




