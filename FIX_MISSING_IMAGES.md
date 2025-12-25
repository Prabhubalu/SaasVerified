# Fix Missing Images in Production

If images are not displaying in production, follow these steps:

## Quick Fix: Disable Image Optimization

The fastest solution is to disable Next.js image optimization:

**Update `next.config.mjs`:**

```javascript
const nextConfig = {
  images: {
    unoptimized: true,  // Add this line
    domains: ["logo.clearbit.com", "cdn.simpleicons.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
  // ... rest of config
};
```

**Then on your VPS:**

```bash
cd /var/www/saasverified
git pull
npm install
npm run build
pm2 restart saasverified
```

## Step-by-Step Troubleshooting

### Step 1: Verify Images Exist on Server

```bash
# SSH into your VPS
cd /var/www/saasverified

# Check if images exist
ls -la public/assets/
ls -la public/assets/marketplace/
ls -la public/assets/vendors/

# Check specific image
ls -la public/assets/Hero-image-1.png
```

**If images are missing:**
- They weren't uploaded to the server
- Git might be ignoring them (check `.gitignore`)

### Step 2: Check Image Paths in Code

Verify image paths in your components match the file structure:

```bash
# Search for image references
grep -r "src=" components/ app/ | grep -i image
grep -r "/assets/" components/ app/
```

**Common issues:**
- Wrong path: `/assets/image.png` vs `/public/assets/image.png`
- Case sensitivity: `Hero-image-1.png` vs `hero-image-1.png`
- Missing leading slash: `assets/image.png` vs `/assets/image.png`

### Step 3: Test Image Access

```bash
# Test if images are accessible via HTTP
curl -I http://localhost:3000/assets/Hero-image-1.png
curl -I http://yourdomain.com/assets/Hero-image-1.png

# Should return HTTP 200
```

### Step 4: Check Nginx Configuration

Ensure Nginx is serving static files correctly:

```bash
sudo nano /etc/nginx/sites-available/saasverified
```

Add or verify this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Serve static files directly (faster)
    location /assets/ {
        alias /var/www/saasverified/public/assets/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Serve other static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
    }

    # Image optimization endpoint
    location /_next/image {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Test and restart:**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Check File Permissions

```bash
# Ensure public folder is readable
cd /var/www/saasverified
chmod -R 755 public/
chown -R $USER:$USER public/

# Verify permissions
ls -la public/assets/
```

### Step 6: Check Browser Console

Open browser developer tools (F12) and check:
- **Console tab:** Look for 404 errors for images
- **Network tab:** Check which images are failing to load
- **Check the exact URL** that's failing

### Step 7: Verify Image Optimization API

If using Next.js Image component:

```bash
# Test image optimization endpoint
curl "http://localhost:3000/_next/image?url=/assets/Hero-image-1.png&w=800&q=75"

# Should return image data
```

If this fails, image optimization isn't working.

## Solutions by Issue Type

### Issue 1: Images Not Uploaded to Server

**Problem:** Images exist locally but not on VPS

**Solution:**

```bash
# Option 1: Copy images manually
# From your local machine, upload images via SCP:
scp -r public/assets/ root@your-vps-ip:/var/www/saasverified/public/

# Option 2: Ensure images are committed to Git
git add public/assets/
git commit -m "Add missing images"
git push

# Then on VPS:
git pull
```

### Issue 2: Image Optimization Failing

**Problem:** Next.js Image optimization not working

**Solution 1: Disable Optimization (Quick Fix)**

```javascript
// next.config.mjs
images: {
  unoptimized: true,
}
```

**Solution 2: Fix Optimization (Proper Fix)**

```bash
# Check if image optimization API is accessible
curl http://localhost:3000/_next/image?url=/assets/Hero-image-1.png

# Check PM2 logs for errors
pm2 logs saasverified | grep -i image
```

### Issue 3: Wrong Image Paths

**Problem:** Code references images with wrong paths

**Solution:**

Check your components. Images in `public/` should be referenced as:

```tsx
// ✅ Correct
<Image src="/assets/Hero-image-1.png" ... />

// ❌ Wrong
<Image src="/public/assets/Hero-image-1.png" ... />
<Image src="assets/Hero-image-1.png" ... />
```

### Issue 4: Case Sensitivity

**Problem:** Linux is case-sensitive, Windows/Mac are not

**Solution:**

```bash
# Check exact case of filenames
ls -la public/assets/ | grep -i hero

# Ensure code matches exact case
# Hero-image-1.png ≠ hero-image-1.png
```

### Issue 5: Nginx Not Serving Static Files

**Problem:** Nginx not configured to serve images

**Solution:**

Add static file serving to Nginx (see Step 4 above)

## Complete Fix Workflow

### Option A: Quick Fix (Disable Optimization)

1. **Update `next.config.mjs`:**
   ```javascript
   images: {
     unoptimized: true,
   }
   ```

2. **On VPS:**
   ```bash
   cd /var/www/saasverified
   git pull
   npm install
   npm run build
   pm2 restart saasverified
   ```

### Option B: Proper Fix (Keep Optimization)

1. **Verify images exist:**
   ```bash
   ls -la public/assets/
   ```

2. **Update Nginx config** (see Step 4)

3. **Test image access:**
   ```bash
   curl http://localhost:3000/assets/Hero-image-1.png
   ```

4. **Check PM2 logs:**
   ```bash
   pm2 logs saasverified
   ```

5. **Restart services:**
   ```bash
   sudo systemctl restart nginx
   pm2 restart saasverified
   ```

## Verify Images Are Working

### Test Individual Images

```bash
# From your computer
curl -I https://saasverify.com/assets/Hero-image-1.png
# Should return HTTP 200

# Test in browser
# Visit: https://saasverify.com/assets/Hero-image-1.png
# Should display the image
```

### Check Browser Console

1. Open your site in browser
2. Press F12 (Developer Tools)
3. Go to **Network** tab
4. Filter by **Img**
5. Reload page
6. Check which images return 404

### Common 404 Patterns

- `/assets/image.png` → Check if file exists at `public/assets/image.png`
- `/_next/image?url=...` → Image optimization issue
- `/public/assets/image.png` → Wrong path (should be `/assets/`)

## Quick Diagnostic Commands

```bash
# 1. Check if images exist
ls -la /var/www/saasverified/public/assets/

# 2. Test local access
curl http://localhost:3000/assets/Hero-image-1.png

# 3. Test public access
curl https://saasverify.com/assets/Hero-image-1.png

# 4. Check file permissions
ls -la /var/www/saasverified/public/assets/

# 5. Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# 6. Check PM2 logs
pm2 logs saasverified | grep -i image
```

## Most Common Solution

**90% of the time, this fixes it:**

1. **Disable image optimization:**
   ```javascript
   // next.config.mjs
   images: {
     unoptimized: true,
   }
   ```

2. **Rebuild and restart:**
   ```bash
   npm run build
   pm2 restart saasverified
   ```

This bypasses Next.js image optimization and serves images directly, which is more reliable in production.

## After Fixing

1. ✅ Clear browser cache (Ctrl+Shift+R)
2. ✅ Test in incognito mode
3. ✅ Check multiple pages
4. ✅ Verify all image types (PNG, SVG, JPG)
5. ✅ Test on mobile devices

## Still Not Working?

Share:
1. **Browser console errors** (F12 → Console)
2. **Network tab** showing failed image requests
3. **PM2 logs:** `pm2 logs saasverified`
4. **Image file list:** `ls -la public/assets/`

This will help identify the exact issue.

