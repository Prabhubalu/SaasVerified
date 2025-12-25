# What to Do After Git Pull on Hostinger VPS

After pulling the latest changes from GitHub, follow these steps to update your production site.

## Quick Command (All-in-One)

```bash
cd /var/www/saasverified && \
git pull && \
npm install && \
npm run db:generate && \
npm run build && \
pm2 restart saasverified
```

## Step-by-Step Process

### Step 1: Navigate to Project Directory

```bash
cd /var/www/saasverified
```

### Step 2: Pull Latest Changes

```bash
git pull
```

**If you get merge conflicts:**
```bash
# Stash local changes (if any)
git stash

# Pull again
git pull

# Apply stashed changes (if needed)
git stash pop
```

### Step 3: Install New Dependencies

```bash
npm install
```

**Why:** New packages might have been added to `package.json`

### Step 4: Generate Prisma Client (If Database Schema Changed)

```bash
npm run db:generate
```

**When to run:**
- If `prisma/schema.prisma` was modified
- If you see Prisma-related errors
- After pulling changes that include database updates

### Step 5: Run Database Migrations (If Schema Changed)

```bash
npm run db:push
```

**When to run:**
- Only if database schema was changed
- Check `prisma/schema.prisma` for changes first
- **Warning:** This modifies your database structure

### Step 6: Rebuild the Application

```bash
npm run build
```

**Why:** Next.js needs to rebuild for production with latest changes

**If build fails:**
- Check error messages
- Verify all dependencies are installed
- Check for TypeScript/ESLint errors
- See troubleshooting section below

### Step 7: Restart PM2 Process

```bash
pm2 restart saasverified
```

**Alternative commands:**
```bash
# Restart specific app
pm2 restart saasverified

# Or reload (zero-downtime)
pm2 reload saasverified

# Check status
pm2 status

# View logs
pm2 logs saasverified
```

### Step 8: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check if app is running
curl http://localhost:3000

# View recent logs
pm2 logs saasverified --lines 50
```

## Complete Workflow Script

Create a deployment script for easier updates:

```bash
# Create deployment script
nano /var/www/saasverified/deploy.sh
```

Add this content:

```bash
#!/bin/bash

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/saasverified

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run db:generate

# Build application
echo "🏗️  Building application..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart saasverified

echo "✅ Deployment complete!"
echo "📊 Checking status..."
pm2 status
```

Make it executable:

```bash
chmod +x /var/www/saasverified/deploy.sh
```

**Usage:**
```bash
cd /var/www/saasverified
./deploy.sh
```

## When to Run Each Step

### Always Run:
- ✅ `git pull` - Get latest code
- ✅ `npm install` - Install new packages
- ✅ `npm run build` - Rebuild for production
- ✅ `pm2 restart saasverified` - Restart app

### Run When Needed:
- `npm run db:generate` - Only if Prisma schema changed
- `npm run db:push` - Only if database structure changed
- `sudo systemctl restart nginx` - Only if Nginx config changed

## Troubleshooting

### Issue: "npm install" fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails

```bash
# Check for errors
npm run build

# Common fixes:
# 1. Check TypeScript errors
# 2. Check ESLint errors (if not disabled)
# 3. Verify all dependencies installed
# 4. Check Node.js version (should be 18+)
node --version
```

### Issue: PM2 restart fails

```bash
# Check PM2 status
pm2 status

# View error logs
pm2 logs saasverified --err

# Stop and start manually
pm2 stop saasverified
pm2 start npm --name "saasverified" -- start
```

### Issue: Application not loading

```bash
# Check if app is running
pm2 status

# Check if port 3000 is in use
sudo lsof -i :3000

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check application logs
pm2 logs saasverified
```

### Issue: Database connection errors

```bash
# Regenerate Prisma Client
npm run db:generate

# Check database connection
# (Update .env if DATABASE_URL changed)
```

## Quick Reference

### Minimal Update (No DB Changes)
```bash
cd /var/www/saasverified
git pull
npm install
npm run build
pm2 restart saasverified
```

### Full Update (With DB Changes)
```bash
cd /var/www/saasverified
git pull
npm install
npm run db:generate
npm run db:push
npm run build
pm2 restart saasverified
```

### Emergency Rollback
```bash
cd /var/www/saasverified
git log  # Find previous commit
git checkout <previous-commit-hash>
npm install
npm run build
pm2 restart saasverified
```

## Pre-Deployment Checklist

Before running `git pull`:

- [ ] Check what changes are being pulled (`git log` on local machine)
- [ ] Backup database (if schema changes expected)
- [ ] Verify `.env` file has all required variables
- [ ] Check if database migrations are needed
- [ ] Ensure you have SSH access to VPS

## Post-Deployment Checklist

After deployment:

- [ ] Verify site loads: `curl http://localhost:3000`
- [ ] Check PM2 status: `pm2 status`
- [ ] View logs for errors: `pm2 logs saasverified`
- [ ] Test website in browser
- [ ] Check for any console errors
- [ ] Verify database connections work
- [ ] Test key functionality (if applicable)

## Environment Variables

If `.env` file changed, update it:

```bash
cd /var/www/saasverified
nano .env
# Update variables as needed
pm2 restart saasverified
```

**Important:** Never commit `.env` file to Git!

## Database Migrations

If database schema changed:

```bash
# 1. Backup database first
sudo -u postgres pg_dump saasverified > backup_$(date +%Y%m%d).sql

# 2. Generate Prisma Client
npm run db:generate

# 3. Push schema changes
npm run db:push

# 4. Verify no errors
```

## Nginx Updates

If Nginx configuration changed:

```bash
# Test configuration
sudo nginx -t

# If test passes, restart
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

## Monitoring After Deployment

```bash
# Watch logs in real-time
pm2 logs saasverified --lines 100

# Monitor application
pm2 monit

# Check system resources
htop
# or
top
```

## Best Practices

1. **Always test locally first** before deploying to production
2. **Pull during low-traffic periods** if possible
3. **Keep backups** before major changes
4. **Monitor logs** after deployment
5. **Test functionality** after each deployment
6. **Use PM2 reload** for zero-downtime (if supported)
7. **Document changes** in commit messages

## Quick Commands Reference

```bash
# Status check
pm2 status
pm2 logs saasverified --lines 20

# Restart
pm2 restart saasverified

# Stop
pm2 stop saasverified

# Start
pm2 start npm --name "saasverified" -- start

# View all logs
pm2 logs

# Clear logs
pm2 flush

# Monitor
pm2 monit
```

## Summary

**Standard workflow after `git pull`:**

1. `npm install` - Get new packages
2. `npm run db:generate` - Update Prisma (if needed)
3. `npm run build` - Rebuild app
4. `pm2 restart saasverified` - Restart app
5. Verify it works

That's it! Your site should now be updated with the latest changes.

