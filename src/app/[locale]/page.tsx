'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import LuxuryHeader from '@/components/sections/LuxuryHeader';
import LuxuryHero from '@/components/sections/LuxuryHero';
import AboutSection from '@/components/sections/AboutSection';
import CEOSection from '@/components/sections/CEOSection';
import LuxuryTeam from '@/components/sections/LuxuryTeam';
import VisionSection from '@/components/sections/VisionSection';
import ValuesSection from '@/components/sections/ValuesSection';
import WhatsAppButton from '@/components/sections/WhatsAppButton';

// Lazy load components for better performance
const FeaturedProjects = dynamic(() => import('@/components/sections/FeaturedProjects'), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-asawer-secondary-500"></div></div>,
});
const LuxuryStats = dynamic(() => import('@/components/sections/LuxuryStats'), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-asawer-secondary-500"></div></div>,
});
const NewsSection = dynamic(() => import('@/components/sections/NewsSection'), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-asawer-secondary-500"></div></div>,
});
const ContactFormSection = dynamic(() => import('@/components/sections/ContactFormSection'), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-asawer-secondary-500"></div></div>,
});
const Footer = dynamic(() => import('@/components/sections/Footer'));

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';

  useEffect(() => {
    // Enhanced Page Reveal Animation
    const timer = setTimeout(() => {
      document.body.classList.add('page-reveal');
    }, 100);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.intersection-observer-target');
    sections.forEach((section) => observer.observe(section));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Structured Data for Homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate Development',
    description: locale === 'ar'
      ? 'شركة رائدة في مجال التطوير العقاري الفاخر في سلطنة عمان'
      : 'Leading luxury real estate development company in Oman',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://asawer.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://asawer.com'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Luxury Header */}
      <LuxuryHeader locale={locale} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <LuxuryHero locale={locale} />
        
        {/* Spacer between Hero and About Section */}
        <div className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40"></div>

        {/* 1. About Section - النبذة عن الشركة مع صورة */}
        <AboutSection locale={locale} />
        
        {/* Spacer between About and CEO - Clear Separation */}
        <div className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40"></div>

        {/* 2. CEO Section - كلمة الرئيس التنفيذي مع صورته */}
        <CEOSection locale={locale} />

        {/* 3. Team Section - فريق أساور */}
        <LuxuryTeam locale={locale} />

        {/* Spacer between Team and Vision */}
        <div className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40"></div>

        {/* 4. Vision Section - الرؤية */}
        <VisionSection locale={locale} />

        {/* Spacer between Vision and Values */}
        <div className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40"></div>

        {/* 5. Values Section - القيم */}
        <ValuesSection locale={locale} />

        {/* 6. Projects Section - المشاريع */}
        <section id="projects" className="relative pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 pb-16 sm:pb-24 md:pb-32 lg:pb-40 xl:pb-48 intersection-observer-target">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="text-center mb-16"
            >
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 ${
                locale === 'ar' ? 'font-arabic' : 'font-elegant'
              }`}>
                <span className="bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent">
                  {locale === 'ar' ? 'مشاريعنا' : 'Our Projects'}
                </span>
              </h2>
            </motion.div>
            <FeaturedProjects locale={locale} />
          </div>
        </section>

        {/* 7. Stats Section - الإحصائيات */}
        <LuxuryStats locale={locale} />

        {/* 8. News Section - الأخبار */}
        <NewsSection locale={locale} />

        {/* 9. Contact Section - تواصل معنا */}
        <section id="contact" className="relative pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 pb-16 sm:pb-24 md:pb-32 lg:pb-40 xl:pb-48 bg-gradient-to-b from-asawer-primary-50 to-white intersection-observer-target">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="text-center mb-16"
            >
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 ${
                locale === 'ar' ? 'font-arabic' : 'font-elegant'
              }`}>
                <span className="bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent">
                  {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-asawer-primary-600 max-w-2xl mx-auto px-4">
                {locale === 'ar' 
                  ? 'نحن هنا للإجابة على جميع استفساراتك' 
                  : 'We are here to answer all your inquiries'}
              </p>
            </motion.div>
            <ContactFormSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer locale={locale} />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
