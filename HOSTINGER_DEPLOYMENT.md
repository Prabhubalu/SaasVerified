# Hostinger VPS Deployment Guide

This guide will help you deploy your SaasVerified Next.js application on Hostinger VPS hosting.

## Prerequisites

- Hostinger VPS hosting plan (recommended: at least 2GB RAM)
- Domain name pointed to your Hostinger VPS
- SSH access to your VPS
- Basic knowledge of Linux commands

## Step 1: Connect to Your VPS

1. Log in to your Hostinger account
2. Go to VPS section and note your server IP address
3. Connect via SSH:
   ```bash
   ssh root@your-server-ip
   ```

## Step 2: Update System and Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx (for reverse proxy)
sudo apt install nginx -y

# Install PM2 (process manager for Node.js)
sudo npm install -g pm2

# Install Git (if not already installed)
sudo apt install git -y
```

## Step 3: Set Up PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql
```

In the PostgreSQL prompt, run these commands:

```sql
-- Create database
CREATE DATABASE saasverified;

-- Create user with password
CREATE USER saasverified_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';

-- Grant database privileges
GRANT ALL PRIVILEGES ON DATABASE saasverified TO saasverified_user;

-- Connect to the database
\c saasverified

-- Grant schema privileges (important for PostgreSQL 15+)
GRANT USAGE ON SCHEMA public TO saasverified_user;
GRANT CREATE ON SCHEMA public TO saasverified_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO saasverified_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO saasverified_user;

-- Grant privileges on future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO saasverified_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO saasverified_user;

-- Exit PostgreSQL
\q
```

**Note:** Replace `your_secure_password_here` with a strong password. Save this password for your `.env` file.

**Important:** The schema permissions are required for PostgreSQL 15+ to prevent permission errors when running `prisma db push`.

## Step 4: Clone and Set Up Your Application

```bash
# Navigate to web directory (or create one)
cd /var/www

# Clone your repository
git clone <your-repository-url> saasverified
cd saasverified

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

Update your `.env` file with the following:

```env
# Database
DATABASE_URL="postgresql://saasverified_user:your_secure_password_here@localhost:5432/saasverified?schema=public"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# OAuth Providers (if using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"

# SEO Verification
GOOGLE_VERIFICATION="your-google-verification-code"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Step 5: Build and Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push database schema
npm run db:push

# Build the application
npm run build
```

## Step 6: Set Up PM2 Process Manager

```bash
# Start the application with PM2
pm2 start npm --name "saasverified" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
# Follow the instructions shown by the command above
```

## Step 7: Configure Nginx Reverse Proxy

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/saasverified
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name saasverify.com www.saasverify.com;

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

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/saasverified /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 8: Set Up SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d saasverify.com -d www.saasverify.com

# Follow the prompts to complete the setup
```

Certbot will automatically update your Nginx configuration to use HTTPS.

## Step 9: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 10: Verify Deployment

1. Visit `https://yourdomain.com` in your browser
2. Check if the application loads correctly
3. Test authentication and database connections

## Useful Commands

### PM2 Commands
```bash
# View application status
pm2 status

# View logs
pm2 logs saasverified

# Restart application
pm2 restart saasverified

# Stop application
pm2 stop saasverified

# Monitor application
pm2 monit
```

### Application Updates
```bash
cd /var/www/saasverified

# Pull latest changes
git pull

# Install new dependencies (if any)
npm install

# Rebuild Prisma Client (if schema changed)
npm run db:generate

# Run database migrations (if schema changed)
npm run db:push

# Rebuild application
npm run build

# Restart PM2
pm2 restart saasverified
```

### Database Management
```bash
# Access PostgreSQL
sudo -u postgres psql -d saasverified

# Backup database
sudo -u postgres pg_dump saasverified > backup_$(date +%Y%m%d).sql

# Restore database
sudo -u postgres psql saasverified < backup_YYYYMMDD.sql
```

## Troubleshooting

### Application Not Starting
```bash
# Check PM2 logs
pm2 logs saasverified

# Check if port 3000 is in use
sudo lsof -i :3000

# Check Node.js version
node --version
```

### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
sudo -u postgres psql -d saasverified -U saasverified_user
```

### Nginx Issues
```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

## Security Best Practices

1. **Keep system updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords** for database and environment variables

3. **Regular backups:**
   - Set up automated database backups
   - Backup your application files

4. **Firewall configuration:**
   - Only open necessary ports
   - Use fail2ban for SSH protection

5. **Environment variables:**
   - Never commit `.env` file to Git
   - Use strong secrets for NEXTAUTH_SECRET

## Why VPS is Recommended

### Advantages of VPS Hosting:

✅ **Full Control:** Complete root access to configure everything  
✅ **Performance:** Dedicated resources (CPU, RAM, storage)  
✅ **Flexibility:** Install any software, configure as needed  
✅ **Scalability:** Easy to upgrade resources as you grow  
✅ **Node.js Support:** Native support for Node.js applications  
✅ **Database Control:** Full PostgreSQL installation and management  
✅ **Process Management:** Use PM2, systemd, or any process manager  
✅ **No Limitations:** No restrictions on build processes or resource usage  
✅ **Better Security:** Full control over security configurations  
✅ **Cost-Effective:** Better value for production applications  

### When to Use Shared Hosting:

- Simple static websites
- WordPress sites
- Small projects with minimal requirements
- Budget constraints (though VPS is often similar in price)

## Support

For Hostinger-specific issues, contact Hostinger support.
For application issues, refer to the main README.md file.
