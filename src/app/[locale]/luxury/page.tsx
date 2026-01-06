import { getTranslations } from 'next-intl/server';
import LuxuryHero from '@/components/LuxuryHero';
import LuxuryProjects from '@/components/LuxuryProjects';
import NewsMedia from '@/components/NewsMedia';
import BrandAmbassador from '@/components/BrandAmbassador';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import ModernHeader from '@/components/ModernHeader';
import WhatsAppButton from '@/components/WhatsAppButton';

export default async function LuxuryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <PageWrapper locale={locale}>
      <div className="min-h-screen bg-white">
        <ModernHeader locale={locale} />
        
        {/* Hero Section */}
        <LuxuryHero locale={locale} />
        
        {/* Luxury Projects */}
        <LuxuryProjects locale={locale} />
        
        {/* News & Media */}
        <NewsMedia locale={locale} />
        
        {/* Brand Ambassador */}
        <BrandAmbassador locale={locale} />
        
        {/* WhatsApp Button */}
        <WhatsAppButton />
        
        {/* Footer */}
        <Footer locale={locale} />
      </div>
    </PageWrapper>
  );
}
