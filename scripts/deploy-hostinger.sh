#!/bin/bash

# Hostinger VPS Deployment Script
# This script helps automate the deployment process on Hostinger VPS

set -e

echo "🚀 SaasVerified Hostinger VPS Deployment Script"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo "Please copy .env.example to .env and configure it first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed!${NC}"
    echo "Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${YELLOW}⚠️  Warning: Node.js version should be 18 or higher${NC}"
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"
echo ""

# Install/update dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run db:generate

# Push database schema
echo "🗄️  Pushing database schema..."
npm run db:push

# Build the application
echo "🏗️  Building application..."
npm run build

echo ""
echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Make sure PM2 is installed: npm install -g pm2"
echo "2. Start the application: pm2 start npm --name 'saasverified' -- start"
echo "3. Save PM2 config: pm2 save"
echo "4. Configure Nginx reverse proxy (see HOSTINGER_DEPLOYMENT.md)"
echo "5. Set up SSL certificate with Certbot"
echo ""
echo "For detailed instructions, see HOSTINGER_DEPLOYMENT.md"

