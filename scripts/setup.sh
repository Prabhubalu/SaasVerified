#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 SaasVerified Setup Script${NC}\n"

# Check Node.js
echo -e "${CYAN}📋 Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js found: $NODE_VERSION${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm.${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm found: $NPM_VERSION${NC}"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "\n${CYAN}📝 Creating .env file from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        
        # Generate a secure random secret for NextAuth
        SECRET=$(openssl rand -hex 32)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/NEXTAUTH_SECRET=\"your-secret-key-here\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env
        else
            # Linux
            sed -i "s/NEXTAUTH_SECRET=\"your-secret-key-here\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env
        fi
        
        echo -e "${GREEN}✅ .env file created with auto-generated NEXTAUTH_SECRET${NC}"
        echo -e "${YELLOW}⚠️  Please update DATABASE_URL and other credentials in .env file${NC}"
    else
        echo -e "${RED}❌ .env.example file not found!${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file already exists, skipping...${NC}"
fi

# Install dependencies
echo -e "\n${CYAN}📦 Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Generate Prisma Client
echo -e "\n${CYAN}🔧 Generating Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma Client generated successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Prisma Client generation failed. You may need to set up your database first.${NC}"
fi

# Summary
echo -e "\n${CYAN}✨ Setup completed successfully!${NC}\n"
echo -e "${CYAN}📝 Next steps:${NC}"
echo -e "1. Update .env file with your database URL and other credentials"
echo -e "2. Set up your database (PostgreSQL recommended)"
echo -e "3. Run: ${GREEN}npm run db:push${NC} (to push Prisma schema to database)"
echo -e "4. Run: ${GREEN}npm run dev${NC} (to start development server)\n"
echo -e "${CYAN}💡 Quick start:${NC}"
echo -e "   ${GREEN}npm run dev${NC}\n"
echo -e "${CYAN}📚 For more information, check README.md${NC}\n"

