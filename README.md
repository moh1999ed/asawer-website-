# Asawer Real Estate Development Website

Professional real estate development company website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 15.5.6
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Database)
- next-intl (Internationalization)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app router
│   ├── [locale]/     # Localized routes
│   └── api/          # API routes
├── components/       # React components
├── lib/              # Utilities and configs
└── data/             # Static data
```

## Environment Variables

Create `.env.local`:

```env
ADMIN_EMAIL=admin@asawer.om
ADMIN_PASSWORD=Asawer123!@#
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## License

Proprietary - Asawer Real Estate Development
