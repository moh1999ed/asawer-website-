import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Tajawal, Playfair_Display } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const title = isArabic 
    ? 'أساور للتطوير العقاري - مشاريع فاخرة في عمان'
    : 'Asawer Real Estate Development - Luxury Projects in Oman';
  
  const description = isArabic
    ? 'أساور للتطوير العقاري - شركة رائدة في مجال التطوير العقاري الفاخر في سلطنة عمان. اكتشف مشاريعنا الاستثنائية المصممة للعائلات.'
    : 'Asawer Real Estate Development - Leading luxury real estate development company in Oman. Discover our exceptional projects designed for families.';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asawer.com';
  const ogImage = `${siteUrl}/images/og-image.jpg`;

  return {
    title: {
      default: title,
      template: isArabic ? '%s | أساور للتطوير العقاري' : '%s | Asawer Real Estate',
    },
    description,
    keywords: isArabic
      ? ['أساور', 'تطوير عقاري', 'عمان', 'مشاريع سكنية', 'عقارات فاخرة']
      : ['Asawer', 'Real Estate', 'Oman', 'Residential Projects', 'Luxury Properties'],
    authors: [{ name: 'Asawer Real Estate Development' }],
    creator: 'Asawer Real Estate Development',
    publisher: 'Asawer Real Estate Development',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ar': `${siteUrl}/ar`,
        'en': `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_OM' : 'en_US',
      url: `${siteUrl}/${locale}`,
      title,
      description,
      siteName: isArabic ? 'أساور للتطوير العقاري' : 'Asawer Real Estate',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${locale === 'ar' ? tajawal.variable : playfair.variable} font-sans antialiased overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate Development',
              description: locale === 'ar'
                ? 'شركة رائدة في مجال التطوير العقاري الفاخر في سلطنة عمان'
                : 'Leading luxury real estate development company in Oman',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://asawer.com',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://asawer.com'}/images/asawer-logo.png`,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'OM',
                addressLocality: 'Muscat',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['Arabic', 'English'],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
