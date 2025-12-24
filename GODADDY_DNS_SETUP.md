# Pointing GoDaddy Domain to Hostinger VPS

This guide will help you configure your GoDaddy domain to point to your Hostinger VPS server.

## Prerequisites

- Domain purchased from GoDaddy
- Hostinger VPS with a static IP address
- Access to GoDaddy account
- Your Hostinger VPS IP address

## Step 1: Get Your Hostinger VPS IP Address

1. Log in to your Hostinger account
2. Go to **VPS** section
3. Find your VPS server
4. Note down the **IP Address** (e.g., `123.45.67.89`)

**Important:** You need the **IPv4 address** of your VPS.

## Step 2: Access GoDaddy DNS Management

1. **Log in to GoDaddy:**
   - Go to [godaddy.com](https://www.godaddy.com)
   - Click **Sign In** (top right)
   - Enter your credentials

2. **Navigate to Domain Management:**
   - Click **My Products** (or **My Account**)
   - Find your domain in the list
   - Click **DNS** (or **Manage DNS**)

3. **You should see the DNS Management page** with records like:
   - A Records
   - CNAME Records
   - MX Records
   - TXT Records

## Step 3: Update A Records

You need to update/create two A records:

### A Record for Root Domain (e.g., yourdomain.com)

1. **Find the existing A record** for `@` (or root domain)
2. **Click the pencil icon** (Edit) or **Add** if it doesn't exist
3. **Configure:**
   - **Type:** A
   - **Name:** `@` (or leave blank, or enter your domain without www)
   - **Value:** Your Hostinger VPS IP address (e.g., `123.45.67.89`)
   - **TTL:** 600 seconds (or 1 hour - 3600)
4. **Click Save**

### A Record for WWW (e.g., www.yourdomain.com)

1. **Find the existing A record** for `www`
2. **Click the pencil icon** (Edit) or **Add** if it doesn't exist
3. **Configure:**
   - **Type:** A
   - **Name:** `www`
   - **Value:** Your Hostinger VPS IP address (same as above)
   - **TTL:** 600 seconds (or 1 hour - 3600)
4. **Click Save**

## Step 4: Remove/Update Conflicting Records

### Remove Old A Records (if any)

If there are old A records pointing to different IPs:
- Delete them or update them to point to your Hostinger VPS IP

### Update CNAME Records (if needed)

If you have a CNAME record for `www` pointing elsewhere:
- **Option 1:** Remove the CNAME and use A record (recommended)
- **Option 2:** Keep CNAME but ensure it points correctly

**Note:** You cannot have both A record and CNAME record for the same name.

## Step 5: Verify DNS Settings

Your DNS records should look like this:

```
Type    Name    Value              TTL
A       @       123.45.67.89       600
A       www     123.45.67.89       600
```

(Replace `123.45.67.89` with your actual Hostinger VPS IP)

## Step 6: Wait for DNS Propagation

DNS changes can take **15 minutes to 48 hours** to propagate worldwide. Typically:
- **GoDaddy:** 15-30 minutes
- **Global propagation:** 1-24 hours

### Check DNS Propagation

You can check if DNS has propagated using:

1. **Online Tools:**
   - [whatsmydns.net](https://www.whatsmydns.net)
   - [dnschecker.org](https://dnschecker.org)
   - Enter your domain and check A records

2. **Command Line (from your computer):**
   ```bash
   # Check root domain
   nslookup yourdomain.com
   
   # Check www subdomain
   nslookup www.yourdomain.com
   
   # Or use dig
   dig yourdomain.com
   dig www.yourdomain.com
   ```

3. **From Hostinger VPS:**
   ```bash
   # Check if domain resolves to your IP
   dig yourdomain.com +short
   ```

## Step 7: Update Nginx Configuration

Once DNS is pointing to your VPS, make sure your Nginx config matches your domain:

```bash
sudo nano /etc/nginx/sites-available/saasverified
```

Update the `server_name` directive:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # ... rest of config
}
```

Replace `yourdomain.com` with your actual domain.

Test and restart:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Update Environment Variables

Update your `.env` file on the VPS:

```bash
cd /var/www/saasverified
nano .env
```

Update these variables:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Note:** Use `https://` once SSL is set up. For now, you can use `http://` or wait until SSL is configured.

## Step 9: Set Up SSL Certificate (After DNS Propagates)

Once DNS has propagated and your site is accessible via HTTP:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

This will:
- Automatically configure SSL
- Update Nginx config for HTTPS
- Set up auto-renewal

## Troubleshooting

### Domain Not Resolving

1. **Check DNS records in GoDaddy:**
   - Ensure A records are correct
   - Check TTL values
   - Wait for propagation

2. **Clear DNS cache:**
   ```bash
   # On your local machine
   # Windows:
   ipconfig /flushdns
   
   # Mac/Linux:
   sudo dscacheutil -flushcache
   # or
   sudo systemd-resolve --flush-caches
   ```

3. **Check from different location:**
   - Use online DNS checker tools
   - Try from different network

### Domain Resolves But Site Doesn't Load

1. **Check if app is running:**
   ```bash
   pm2 status
   curl http://localhost:3000
   ```

2. **Check Nginx:**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

3. **Check firewall:**
   ```bash
   sudo ufw status
   # Ensure ports 80 and 443 are open
   sudo ufw allow 'Nginx Full'
   ```

4. **Check Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### Wrong IP Address

If you entered the wrong IP:
1. Go back to GoDaddy DNS management
2. Edit the A records
3. Update to correct IP
4. Wait for propagation

### Both A and CNAME Records

You cannot have both A and CNAME for the same name:
- Remove CNAME
- Use A record instead

## Quick Checklist

- [ ] Got Hostinger VPS IP address
- [ ] Logged into GoDaddy
- [ ] Updated A record for `@` (root domain)
- [ ] Updated A record for `www`
- [ ] Removed conflicting records
- [ ] Updated Nginx `server_name`
- [ ] Updated `.env` file with domain
- [ ] Waited for DNS propagation (15 min - 24 hours)
- [ ] Tested domain resolution
- [ ] Set up SSL certificate (after DNS works)

## Example Configuration

**GoDaddy DNS Records:**
```
Type: A
Name: @
Value: 192.168.1.100
TTL: 600

Type: A
Name: www
Value: 192.168.1.100
TTL: 600
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # ... proxy config
}
```

**Environment Variables:**
```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Support

- **GoDaddy Support:** [help.godaddy.com](https://help.godaddy.com)
- **Hostinger Support:** Available in your Hostinger dashboard
- **DNS Propagation Check:** [whatsmydns.net](https://www.whatsmydns.net)

## Next Steps

After DNS is configured and propagated:

1. ✅ Verify domain resolves to your VPS IP
2. ✅ Test HTTP access (http://yourdomain.com)
3. ✅ Set up SSL certificate with Certbot
4. ✅ Update environment variables for HTTPS
5. ✅ Restart application: `pm2 restart saasverified`
6. ✅ Test HTTPS access (https://yourdomain.com)

Your site should now be accessible via your domain!

