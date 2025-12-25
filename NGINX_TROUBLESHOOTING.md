# Nginx Configuration Troubleshooting

If you're getting `nginx: configuration file /etc/nginx/nginx.conf test failed`, follow these steps:

## Step 1: Check the Error Details

Run the test command with verbose output to see the exact error:

```bash
sudo nginx -t
```

This will show you the specific line and error message.

## Step 2: Common Issues and Fixes

### Issue 1: Syntax Error in Site Configuration

**Error:** `syntax error` or `unexpected token`

**Fix:**
1. Check for missing semicolons (`;`) at the end of directives
2. Check for unmatched braces `{` and `}`
3. Check for typos in directive names

### Issue 2: Duplicate Server Name

**Error:** `server name "yourdomain.com" has already been used`

**Fix:**
```bash
# Check for duplicate server blocks
sudo grep -r "server_name" /etc/nginx/sites-enabled/

# Remove duplicate configuration or disable one
sudo rm /etc/nginx/sites-enabled/duplicate-config
```

### Issue 3: Port Already in Use

**Error:** `bind() to 0.0.0.0:80 failed`

**Fix:**
```bash
# Check what's using port 80
sudo lsof -i :80

# Or check port 443 for HTTPS
sudo lsof -i :443
```

### Issue 4: Invalid Path or File Not Found

**Error:** `open() "/path/to/file" failed`

**Fix:**
- Ensure all file paths exist
- Check file permissions
- Use absolute paths

## Step 3: Correct Nginx Configuration

Here's the correct configuration for your Next.js app:

### Create/Edit Site Configuration

```bash
sudo nano /etc/nginx/sites-available/saasverified
```

**Paste this configuration (replace `yourdomain.com` with your actual domain):**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Increase body size limit if needed
    client_max_body_size 10M;

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

**Important:** Make sure:
- No extra spaces or characters
- All lines end properly
- All braces `{` and `}` are matched
- Semicolons `;` are at the end of directives

### Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/saasverified /etc/nginx/sites-enabled/

# Remove default site if it conflicts
sudo rm /etc/nginx/sites-enabled/default
```

### Test Configuration

```bash
sudo nginx -t
```

If successful, you should see:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

## Step 4: Verify Nginx Status

```bash
# Check Nginx status
sudo systemctl status nginx

# Check if it's running
sudo systemctl is-active nginx

# View error logs if still having issues
sudo tail -f /var/log/nginx/error.log
```

## Step 5: Common Configuration Mistakes

### ❌ Wrong - Missing Semicolon
```nginx
proxy_pass http://localhost:3000  # Missing semicolon
```

### ✅ Correct
```nginx
proxy_pass http://localhost:3000;  # Has semicolon
```

### ❌ Wrong - Unmatched Braces
```nginx
server {
    listen 80;
    # Missing closing brace
```

### ✅ Correct
```nginx
server {
    listen 80;
    # ... config ...
}
```

### ❌ Wrong - Wrong Port Format
```nginx
listen 3000;  # Should be 80 for HTTP
```

### ✅ Correct
```nginx
listen 80;  # HTTP port
```

## Step 6: Check Main Nginx Config

If the site config looks correct, check the main config:

```bash
sudo nginx -t -c /etc/nginx/nginx.conf
```

View the main config:
```bash
sudo cat /etc/nginx/nginx.conf
```

Look for:
- Syntax errors
- Include statements pointing to non-existent files
- Duplicate directives

## Step 7: Reset to Default (Last Resort)

If nothing works, you can reset Nginx:

```bash
# Backup current config
sudo cp -r /etc/nginx /etc/nginx.backup

# Remove site configs
sudo rm /etc/nginx/sites-enabled/*

# Test default config
sudo nginx -t

# If default works, add your config again
```

## Quick Fix Checklist

- [ ] Run `sudo nginx -t` to see exact error
- [ ] Check for missing semicolons `;`
- [ ] Check for unmatched braces `{` `}`
- [ ] Verify domain name is correct
- [ ] Ensure port 3000 is where your app runs
- [ ] Check file permissions
- [ ] Remove default site if conflicting
- [ ] Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

## Still Having Issues?

1. **Share the exact error message** from `sudo nginx -t`
2. **Check Nginx logs:**
   ```bash
   sudo tail -50 /var/log/nginx/error.log
   ```
3. **Verify your app is running:**
   ```bash
   pm2 status
   curl http://localhost:3000
   ```

## After Fixing

Once Nginx test passes:

```bash
# Test configuration
sudo nginx -t

# If successful, restart
sudo systemctl restart nginx

# Verify it's running
sudo systemctl status nginx

# Test your site
curl http://yourdomain.com
```



