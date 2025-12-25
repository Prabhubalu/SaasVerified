# SSL Certificate Setup Guide (Let's Encrypt)

This guide will help you set up SSL certificate using Let's Encrypt (Certbot) on your Hostinger VPS.

## Prerequisites

- Domain pointing to your VPS IP (DNS propagated)
- Nginx installed and configured
- Port 80 (HTTP) open and accessible
- Domain accessible via HTTP (http://yourdomain.com works)

## Step 1: Verify Prerequisites

### Check DNS is Pointing Correctly

```bash
# Check if domain resolves to your VPS IP
dig saasverify.com +short
nslookup saasverify.com

# Should return your VPS IP address
```

### Verify HTTP is Working

```bash
# Test from your computer
curl -I http://saasverify.com

# Should return HTTP 200 or 301/302
```

### Check Port 80 is Open

```bash
# On your VPS
sudo ufw status
# Should show port 80 allowed

# If not, allow it
sudo ufw allow 'Nginx Full'
sudo ufw allow 80
sudo ufw allow 443
```

## Step 2: Install Certbot

```bash
# Update system
sudo apt update

# Install Certbot and Nginx plugin
sudo apt install certbot python3-certbot-nginx -y

# Verify installation
certbot --version
```

## Step 3: Verify Nginx Configuration

Your Nginx config should have `server_name` matching your domain:

```bash
sudo nano /etc/nginx/sites-available/saasverified
```

Should look like:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        # ... rest of config
    }
}
```

**Important:** Replace `yourdomain.com` with your actual domain.

Test Nginx config:
```bash
sudo nginx -t
```

If there are errors, fix them first before proceeding.

## Step 4: Obtain SSL Certificate

### Method 1: Automatic (Recommended)

Certbot will automatically configure Nginx:

```bash
sudo certbot --nginx -d saasverify.com -d www.saasverify.com
```

**Replace `yourdomain.com` with your actual domain.**

**During the process:**
1. Enter your email address (for renewal notices)
2. Agree to terms of service
3. Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### Method 2: Manual (If automatic fails)

```bash
# Get certificate only (won't modify Nginx)
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

Then manually update Nginx config (see Step 5).

## Step 5: Common Issues and Fixes

### Issue 1: "Failed to obtain certificate"

**Error:** `Failed to obtain certificate` or `Connection refused`

**Solutions:**

1. **Check DNS propagation:**
   ```bash
   dig yourdomain.com +short
   # Should return your VPS IP
   ```

2. **Verify domain is accessible:**
   ```bash
   curl -I http://yourdomain.com
   # Should return HTTP response
   ```

3. **Check firewall:**
   ```bash
   sudo ufw status
   sudo ufw allow 80
   sudo ufw allow 443
   ```

4. **Check Nginx is running:**
   ```bash
   sudo systemctl status nginx
   sudo systemctl start nginx
   ```

5. **Verify server_name matches domain:**
   ```bash
   sudo grep server_name /etc/nginx/sites-available/saasverified
   # Should show your actual domain
   ```

### Issue 2: "Domain not pointing to this server"

**Error:** `The server could not connect to the client to verify the domain`

**Solutions:**

1. **Wait for DNS propagation** (can take up to 48 hours)
2. **Check DNS from multiple locations:**
   - Use [whatsmydns.net](https://www.whatsmydns.net)
   - Check from different networks

3. **Verify A records in GoDaddy:**
   - Should point to your VPS IP
   - Both `@` and `www` should be configured

### Issue 3: "Port 80 is already in use"

**Error:** `Port 80 is already in use`

**Solutions:**

```bash
# Check what's using port 80
sudo lsof -i :80
sudo netstat -tulpn | grep :80

# Stop conflicting service
sudo systemctl stop apache2  # If Apache is running
# Or
sudo systemctl stop nginx    # If old Nginx instance

# Restart Nginx
sudo systemctl start nginx
```

### Issue 4: "Nginx configuration test failed"

**Error:** `nginx: configuration file /etc/nginx/nginx.conf test failed`

**Solutions:**

1. **Fix Nginx config first:**
   ```bash
   sudo nginx -t
   # Fix any errors shown
   ```

2. **See NGINX_TROUBLESHOOTING.md for detailed help**

### Issue 5: "Too many certificates already issued"

**Error:** `Too many certificates already issued for exact set of domains`

**Solutions:**

1. **Wait 7 days** - Let's Encrypt has rate limits
2. **Use existing certificate:**
   ```bash
   sudo certbot certificates
   # List existing certificates
   ```

3. **Use staging environment for testing:**
   ```bash
   sudo certbot --nginx --staging -d yourdomain.com -d www.yourdomain.com
   ```

### Issue 6: "Permission denied"

**Error:** `Permission denied` or `Could not bind to port 80`

**Solutions:**

```bash
# Use sudo
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Check Nginx user
sudo grep user /etc/nginx/nginx.conf
```

## Step 6: Verify SSL Certificate

After successful installation:

```bash
# Check certificate status
sudo certbot certificates

# Test SSL
curl -I https://yourdomain.com
# Should return HTTP 200

# Check certificate details
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

## Step 7: Update Environment Variables

After SSL is set up, update your `.env` file:

```bash
cd /var/www/saasverified
nano .env
```

Update:
```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Restart application:
```bash
pm2 restart saasverified
```

## Step 8: Set Up Auto-Renewal

Certbot should set up auto-renewal automatically. Verify:

```bash
# Check renewal timer
sudo systemctl status certbot.timer

# Test renewal (dry run)
sudo certbot renew --dry-run

# If timer is not active, enable it
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Manual Nginx SSL Configuration

If Certbot didn't automatically configure Nginx, add this manually:

```bash
sudo nano /etc/nginx/sites-available/saasverified
```

**Full configuration with SSL:**

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (Certbot will add these paths)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

**Replace `yourdomain.com` with your actual domain.**

Then:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Troubleshooting Checklist

- [ ] DNS is pointing to VPS IP
- [ ] Domain is accessible via HTTP
- [ ] Port 80 is open in firewall
- [ ] Nginx is running
- [ ] Nginx config test passes (`sudo nginx -t`)
- [ ] `server_name` matches your domain
- [ ] No other service using port 80
- [ ] Certbot is installed
- [ ] Using correct domain name in certbot command

## Step-by-Step Debugging

### 1. Test Domain Resolution

```bash
# From your computer
nslookup yourdomain.com
dig yourdomain.com

# Should return your VPS IP
```

### 2. Test HTTP Access

```bash
# From your computer
curl -I http://yourdomain.com

# Should return HTTP 200 or redirect
```

### 3. Check Nginx

```bash
# On VPS
sudo systemctl status nginx
sudo nginx -t
sudo cat /etc/nginx/sites-available/saasverified | grep server_name
```

### 4. Check Firewall

```bash
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
```

### 5. Try Certbot with Verbose Output

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com --verbose
```

This will show detailed error messages.

## Alternative: Use Hostinger SSL (If Available)

Some Hostinger plans include free SSL:

1. Log in to Hostinger hPanel
2. Go to **SSL** section
3. Enable free SSL certificate
4. Wait for activation
5. Update Nginx to use HTTPS

## Still Having Issues?

### Get Detailed Error

```bash
# Run certbot with verbose output
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com --verbose

# Check Certbot logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Common Error Messages

**"Connection refused":**
- Nginx not running or port 80 blocked

**"Domain not pointing to this server":**
- DNS not propagated or wrong IP

**"Too many requests":**
- Rate limit exceeded, wait 7 days or use staging

**"Permission denied":**
- Need to use `sudo`

## Quick Reference Commands

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Check certificates
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Revoke certificate (if needed)
sudo certbot revoke --cert-path /etc/letsencrypt/live/yourdomain.com/cert.pem
```

## After SSL is Set Up

1. ✅ Test HTTPS: `https://yourdomain.com`
2. ✅ Update environment variables (use `https://`)
3. ✅ Restart application: `pm2 restart saasverified`
4. ✅ Verify auto-renewal: `sudo certbot renew --dry-run`
5. ✅ Test site functionality with HTTPS

Your site should now be accessible via HTTPS!

