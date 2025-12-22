# SaasVerified - Business Growth Platform

A modern, SEO-optimized website built with Next.js to help businesses grow faster and reach more customers.

## ⚡ Quick Start

```bash
git clone <your-repo-url>
cd SaasVerified
npm run setup
npm run dev
```

That's it! The setup script handles everything automatically. See [SETUP.md](./SETUP.md) for details.

## Tech Stack

- **Next.js 14** (App Router) - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Next-generation ORM for database management
- **NextAuth.js** - Authentication solution
- **TanStack Query (React Query)** - Powerful data synchronization for React

## Features

- ✅ SEO-optimized with metadata, Open Graph, and structured data
- ✅ Responsive design that works on all devices
- ✅ Modern UI with Tailwind CSS
- ✅ Authentication with NextAuth.js
- ✅ Database integration with Prisma
- ✅ Blog system for content marketing
- ✅ Contact form
- ✅ Performance optimized

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or use Prisma with your preferred database)

### Quick Setup (Automated)

**Option 1: Using npm script (Recommended - Cross-platform)**
```bash
git clone <your-repo-url>
cd SaasVerified
npm run setup
```

**Option 2: Using shell script (Mac/Linux)**
```bash
git clone <your-repo-url>
cd SaasVerified
./scripts/setup.sh
```

**Option 3: Using batch script (Windows)**
```bash
git clone <your-repo-url>
cd SaasVerified
scripts\setup.bat
```

The setup script will automatically:
- ✅ Check for Node.js and npm
- ✅ Install all dependencies
- ✅ Create `.env` file from `.env.example` with auto-generated secrets
- ✅ Generate Prisma Client

### Manual Setup (If needed)

1. Clone the repository:
```bash
git clone <your-repo-url>
cd SaasVerified
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- Database URL
- NextAuth secret and OAuth credentials
- Site URL and verification codes

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
SaasVerified/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth routes
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React Query & NextAuth providers
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   └── CTA.tsx
├── lib/                   # Utility libraries
│   └── prisma.ts          # Prisma client
├── prisma/                # Prisma schema
│   └── schema.prisma
└── types/                 # TypeScript type definitions
    └── next-auth.d.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## SEO Features

- Comprehensive metadata configuration
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD)
- Canonical URLs
- Sitemap ready
- Robot.txt ready

## Customization

1. **Branding**: Update the site name, colors, and logo in:
   - `app/layout.tsx` (metadata)
   - `components/Navbar.tsx` (logo)
   - `tailwind.config.ts` (colors)

2. **Content**: Update content in:
   - `components/` (homepage sections)
   - `app/about/page.tsx`
   - `app/services/page.tsx`
   - `app/blog/` (blog posts)

3. **Database**: Modify `prisma/schema.prisma` to add your own models

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

### Netlify (Temporary Hosting)

For detailed instructions on deploying to Netlify, see [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md).

**Note:** You'll need an external PostgreSQL database (Supabase, Neon, or Railway recommended).

### Hostinger VPS

For detailed instructions on deploying to Hostinger VPS, see [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md).

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

See `.env.example` for all required environment variables.

## License

See LICENSE file for details.

## Support

For support, email contact@saasverified.com or visit our website.
