'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Star, MapPin, Headphones } from 'lucide-react';

interface ValuesSectionProps {
  locale: string;
}

interface Value {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  gradient: string;
}

const values: Value[] = [
  {
    id: 'design',
    icon: <Palette className="w-8 h-8" />,
    title: 'Design',
    titleAr: 'التصميم',
    description: 'We create innovative and elegant designs that combine functionality with aesthetic beauty.',
    descriptionAr: 'نصمم تصاميم مبتكرة وأنيقة تجمع بين الوظيفية والجمال الجمالي.',
    gradient: 'from-asawer-primary-500 to-asawer-secondary-500',
  },
  {
    id: 'quality',
    icon: <Star className="w-8 h-8" />,
    title: 'Quality',
    titleAr: 'الجودة',
    description: 'We maintain the highest quality standards in all our projects, ensuring excellence in every detail.',
    descriptionAr: 'نحافظ على أعلى معايير الجودة في جميع مشاريعنا، وضمان التميز في كل تفصيلة.',
    gradient: 'from-asawer-secondary-500 to-asawer-primary-500',
  },
  {
    id: 'location',
    icon: <MapPin className="w-8 h-8" />,
    title: 'Location',
    titleAr: 'الموقع',
    description: 'We carefully select prime locations that offer convenience, accessibility, and exceptional value.',
    descriptionAr: 'نختار بعناية مواقع متميزة توفر الراحة والسهولة في الوصول وقيمة استثنائية.',
    gradient: 'from-asawer-primary-500 to-asawer-secondary-500',
  },
  {
    id: 'after-sales',
    icon: <Headphones className="w-8 h-8" />,
    title: 'After-Sales Service',
    titleAr: 'خدمة ما بعد البيع',
    description: 'We provide exceptional after-sales service and ongoing support to ensure customer satisfaction.',
    descriptionAr: 'نقدم خدمة ما بعد البيع الاستثنائية والدعم المستمر لضمان رضا العملاء.',
    gradient: 'from-asawer-secondary-500 to-asawer-primary-500',
  },
];

export default function ValuesSection({ locale }: ValuesSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="values" className="relative pt-32 md:pt-40 lg:pt-48 pb-32 md:pb-40 lg:pb-48 overflow-hidden intersection-observer-target">
      {/* Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-asawer-primary-50 via-white to-asawer-secondary-50/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(32,178,170,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,49,53,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-asawer-primary-600 mb-4 ${
              locale === 'ar' ? 'font-arabic' : 'font-elegant'
            }`} style={{
              letterSpacing: locale === 'ar' ? '0' : '-0.02em',
              lineHeight: '1.2',
            }}>
              {locale === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
          </motion.div>

          {/* Four Values Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
            {/* Vertical Separator Lines - Between all items (Desktop) */}
            <div className="hidden lg:block absolute top-8 bottom-8 left-1/4 w-px" style={{ backgroundColor: 'rgba(70, 134, 141, 0.4)', transform: 'translateX(-50%)' }} />
            <div className="hidden lg:block absolute top-8 bottom-8 left-2/4 w-px" style={{ backgroundColor: 'rgba(70, 134, 141, 0.4)', transform: 'translateX(-50%)' }} />
            <div className="hidden lg:block absolute top-8 bottom-8 left-3/4 w-px" style={{ backgroundColor: 'rgba(70, 134, 141, 0.4)', transform: 'translateX(-50%)' }} />
            
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Horizontal Separator Line - Mobile (between rows) */}
                {index < 2 && (
                  <div 
                    className="block md:hidden lg:hidden absolute bottom-0 left-8 right-8 h-px"
                    style={{
                      backgroundColor: 'rgba(70, 134, 141, 0.4)',
                      bottom: '-1rem',
                    }}
                  />
                )}
                {/* Vertical Separator Line - Tablet (between columns) */}
                {(index === 0 || index === 2) && (
                  <div 
                    className="hidden md:block lg:hidden absolute top-8 bottom-8 right-0 w-px"
                    style={{
                      backgroundColor: 'rgba(70, 134, 141, 0.4)',
                      right: '-1rem',
                    }}
                  />
                )}
                {/* Icon Container */}
                <div className="relative mb-10">
                  <div 
                    className="inline-flex items-center justify-center p-3 rounded-2xl text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)',
                      boxShadow: '0 8px 24px rgba(70, 134, 141, 0.4), 0 0 20px rgba(70, 134, 141, 0.2)',
                      width: '56px',
                      height: '56px',
                    }}
                  >
                    {value.icon}
                  </div>
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #46868d 0%, #2e5f6e 100%)',
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className={`text-xl md:text-2xl font-bold mb-4 ${
                  locale === 'ar' ? 'font-arabic text-right' : 'font-elegant text-left'
                }`} style={{
                  color: '#2e5f6e',
                  marginTop: '1rem',
                }}>
                  {locale === 'ar' ? value.titleAr : value.title}
                </h3>

                {/* Description */}
                <div className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p 
                    className={`text-sm md:text-base leading-relaxed ${
                      locale === 'ar' ? 'font-arabic' : 'font-sans'
                    }`}
                    style={{
                      color: '#2e5f6e',
                      lineHeight: '1.8',
                    }}
                  >
                    {locale === 'ar' ? value.descriptionAr : value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
