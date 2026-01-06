# Asawer Real Estate Development Website

A professional website for Asawer Real Estate Development built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Modern and responsive design
- ✅ Full Arabic language support (RTL)
- ✅ Multiple pages: Home, About, Projects, Services, Contact
- ✅ High performance and fast loading
- ✅ SEO optimized
- ✅ Complete admin panel for content management

## Technologies Used

- **Next.js 15.5.6** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Styling
- **React 19** - UI library
- **Supabase** - Database (optional)
- **next-intl** - Internationalization

## Installation and Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

### 4. Run Production Server

```bash
npm start
```

## Project Structure

```
asawer-website/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── admin/         # Admin panel
│   │   │   ├── projects/      # Projects page
│   │   │   └── page.tsx       # Homepage
│   │   └── api/               # API routes
│   ├── components/            # React components
│   ├── lib/                   # Utilities and configs
│   └── data/                  # Static data
├── public/                    # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Admin Panel

The website includes a complete admin panel for managing:
- Projects
- Content
- Statistics
- Images
- Contact messages
- Staff members

**Access:** `/admin/login`

**Default Credentials:**
- Email: `admin@asawer.om`
- Password: `Asawer123!@#`

## Company Information

- **Name:** Asawer Real Estate Development
- **Slogan:** We develop with excellence
- **Established:** 2009
- **Phone:** 93994710 - 8009008
- **WhatsApp:** 96893994710
- **Email:** info@asawer.om
- **Website:** www.asawer.om
- **Address:** Sultanate of Oman, Al Khuwair, Al Khuwair Square Building

## Deployment

The website can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Any hosting service that supports Node.js

## Environment Variables

Create a `.env.local` file with:

```env
ADMIN_EMAIL=admin@asawer.om
ADMIN_PASSWORD=Asawer123!@#
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Future Development

- [ ] Add CMS integration
- [ ] Add project gallery
- [ ] Add consultation booking form
- [ ] Add news blog
- [ ] Add interactive project map

## License

This project is proprietary to Asawer Real Estate Development.

---

**Developed by:** Asawer Development Team  
**Last Updated:** 2025
