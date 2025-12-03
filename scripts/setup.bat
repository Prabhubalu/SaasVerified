@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 SaasVerified Setup Script
echo.

REM Check Node.js
echo 📋 Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%

REM Check if .env exists
if not exist .env (
    echo.
    echo 📝 Creating .env file from .env.example...
    if exist .env.example (
        copy .env.example .env >nul
        echo ✅ .env file created
        echo ⚠️  Please update DATABASE_URL, NEXTAUTH_SECRET and other credentials in .env file
    ) else (
        echo ❌ .env.example file not found!
        exit /b 1
    )
) else (
    echo ✅ .env file already exists, skipping...
)

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Dependencies installed successfully

REM Generate Prisma Client
echo.
echo 🔧 Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ⚠️  Prisma Client generation failed. You may need to set up your database first.
) else (
    echo ✅ Prisma Client generated successfully
)

REM Summary
echo.
echo ✨ Setup completed successfully!
echo.
echo 📝 Next steps:
echo 1. Update .env file with your database URL and other credentials
echo 2. Set up your database (PostgreSQL recommended)
echo 3. Run: npm run db:push (to push Prisma schema to database)
echo 4. Run: npm run dev (to start development server)
echo.
echo 💡 Quick start:
echo    npm run dev
echo.
echo 📚 For more information, check README.md
echo.

endlocal

