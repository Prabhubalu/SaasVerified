#!/bin/bash

# Hostinger VPS Deployment Script - End to End
# Pulls from git, builds, and restarts the application

set -e

# Configuration - change these for your setup
APP_DIR="${APP_DIR:-/var/www/saasverified}"  # Project directory on VPS
GIT_BRANCH="${GIT_BRANCH:-main}"             # Branch to deploy (main or master)
PM2_APP_NAME="${PM2_APP_NAME:-saasverified}" # PM2 process name

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 SaasVerified Hostinger VPS Deployment${NC}"
echo "=============================================="
echo ""

# Ensure we're in the app directory (or use APP_DIR if running from elsewhere)
if [ -n "$APP_DIR" ] && [ "$(pwd)" != "$APP_DIR" ]; then
    if [ -d "$APP_DIR" ]; then
        cd "$APP_DIR"
        echo -e "📁 Working in: $APP_DIR"
    else
        echo -e "${RED}❌ App directory not found: $APP_DIR${NC}"
        echo "Clone the repo first: git clone <repo-url> $APP_DIR"
        exit 1
    fi
fi

# Prerequisites check
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo "Copy .env.example to .env and configure it first."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites OK${NC}"
echo ""

# 1. Pull latest from git
echo -e "${BLUE}📥 Pulling from git (branch: $GIT_BRANCH)...${NC}"
git fetch origin
git checkout "$GIT_BRANCH"
git pull origin "$GIT_BRANCH"
echo -e "${GREEN}✅ Git pull complete${NC}"
echo ""

# 2. Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# 3. Prisma
echo -e "${BLUE}🔧 Generating Prisma Client...${NC}"
npm run db:generate
echo ""

echo -e "${BLUE}🗄️  Pushing database schema (if changed)...${NC}"
npm run db:push || echo -e "${YELLOW}⚠️  db:push had issues (may be OK if schema unchanged)${NC}"
echo -e "${GREEN}✅ Prisma complete${NC}"
echo ""

# 4. Build
echo -e "${BLUE}🏗️  Building application...${NC}"
npm run build
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# 5. Restart PM2
if command -v pm2 &> /dev/null; then
    echo -e "${BLUE}🔄 Restarting PM2 process...${NC}"
    if pm2 describe "$PM2_APP_NAME" &> /dev/null; then
        pm2 delete "$PM2_APP_NAME" 2>/dev/null || true
    fi
    pm2 start ecosystem.config.cjs --only "$PM2_APP_NAME"
    pm2 save
    echo -e "${GREEN}✅ PM2 started with ecosystem.config.cjs (loads .env from app directory)${NC}"
else
    echo -e "${YELLOW}⚠️  PM2 not installed. Start manually: npm start${NC}"
fi

echo ""
if grep -qE '^VTIGER_WEBHOOK_TOKEN=.+' .env 2>/dev/null; then
    echo -e "${BLUE}🔗 Testing Vtiger webhook from this server...${NC}"
    node scripts/test-vtiger-webhook.mjs || true
else
    echo -e "${YELLOW}⚠️  VTIGER_WEBHOOK_URL / VTIGER_WEBHOOK_TOKEN missing in .env — buyer forms will not sync to Vtiger.${NC}"
fi

echo ""
echo -e "${GREEN}=============================================="
echo -e "✅ Deployment complete!${NC}"
echo -e "==============================================${NC}"
