#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    try {
      execSync(`where ${command}`, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
}

function generateSecret() {
  return crypto.randomBytes(32).toString('hex');
}

function setup() {
  log('\n🚀 SaasVerified Setup Script\n', 'bright');
  
  // Check Node.js
  log('📋 Checking prerequisites...', 'cyan');
  if (!checkCommand('node')) {
    log('❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/', 'red');
    process.exit(1);
  }
  
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  log(`✅ Node.js found: ${nodeVersion}`, 'green');
  
  if (!checkCommand('npm')) {
    log('❌ npm is not installed. Please install npm.', 'red');
    process.exit(1);
  }
  
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  log(`✅ npm found: ${npmVersion}`, 'green');
  
  // Check if .env exists
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  if (!fs.existsSync(envPath)) {
    log('\n📝 Creating .env file from .env.example...', 'cyan');
    if (fs.existsSync(envExamplePath)) {
      let envContent = fs.readFileSync(envExamplePath, 'utf8');
      
      // Generate a secure random secret for NextAuth
      const secret = generateSecret();
      envContent = envContent.replace(
        'NEXTAUTH_SECRET="your-secret-key-here"',
        `NEXTAUTH_SECRET="${secret}"`
      );
      
      fs.writeFileSync(envPath, envContent);
      log('✅ .env file created with auto-generated NEXTAUTH_SECRET', 'green');
      log('⚠️  Please update DATABASE_URL and other credentials in .env file', 'yellow');
    } else {
      log('❌ .env.example file not found!', 'red');
      process.exit(1);
    }
  } else {
    log('✅ .env file already exists, skipping...', 'green');
  }
  
  // Install dependencies
  log('\n📦 Installing dependencies...', 'cyan');
  try {
    execSync('npm install', { stdio: 'inherit' });
    log('✅ Dependencies installed successfully', 'green');
  } catch (error) {
    log('❌ Failed to install dependencies', 'red');
    process.exit(1);
  }
  
  // Generate Prisma Client
  log('\n🔧 Generating Prisma Client...', 'cyan');
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    log('✅ Prisma Client generated successfully', 'green');
  } catch (error) {
    log('⚠️  Prisma Client generation failed. You may need to set up your database first.', 'yellow');
  }
  
  // Summary
  log('\n✨ Setup completed successfully!\n', 'bright');
  log('📝 Next steps:', 'cyan');
  log('1. Update .env file with your database URL and other credentials', 'reset');
  log('2. Set up your database (PostgreSQL recommended)', 'reset');
  log('3. Run: npm run db:push (to push Prisma schema to database)', 'reset');
  log('4. Run: npm run dev (to start development server)\n', 'reset');
  
  log('💡 Quick start:', 'cyan');
  log('   npm run dev', 'green');
  log('\n📚 For more information, check README.md\n', 'reset');
}

try {
  setup();
} catch (error) {
  log(`\n❌ Setup failed: ${error.message}`, 'red');
  process.exit(1);
}

