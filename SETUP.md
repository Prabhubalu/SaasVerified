# Quick Setup Guide

## One-Command Setup 🚀

After cloning the repository, simply run:

```bash
npm run setup
```

That's it! The script will handle everything automatically.

## What the Setup Script Does

1. ✅ Checks for Node.js and npm
2. ✅ Installs all dependencies
3. ✅ Creates `.env` file with auto-generated secrets
4. ✅ Generates Prisma Client

## After Setup

1. **Update `.env` file** with your actual credentials:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - For OAuth (optional)
   - `NEXT_PUBLIC_SITE_URL` - Your production URL (for local dev, keep as `http://localhost:3000`)

2. **Set up your database**:
   ```bash
   npm run db:push
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Platform-Specific Scripts

- **Mac/Linux**: `./scripts/setup.sh`
- **Windows**: `scripts\setup.bat`
- **All platforms**: `npm run setup` (uses Node.js script)

## Troubleshooting

### Database Connection Issues
If you see Prisma errors, make sure:
- PostgreSQL is installed and running
- `DATABASE_URL` in `.env` is correct
- Database exists (or Prisma will create it)

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

### Missing Dependencies
If setup fails, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Need Help?

Check the main [README.md](./README.md) for more detailed information.

