'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface VisionSectionProps {
  locale: string;
}

export default function VisionSection({ locale }: VisionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="vision" className="relative pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-16 overflow-hidden intersection-observer-target">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-asawer-primary-50 via-white to-asawer-secondary-50/30" />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-7xl mx-auto"
        >
          {/* Split Layout - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${locale === 'ar' ? 'lg:order-2' : 'lg:order-1'} relative`}
            >
              <div className="relative h-[300px] md:h-[380px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-asawer-primary-100 to-asawer-secondary-50">
                <Image
                  src="/images/about/asawer-building.jpg"
                  alt={locale === 'ar' ? 'رؤية أساور' : 'Asawer Vision'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${locale === 'ar' ? 'lg:order-1' : 'lg:order-2'} space-y-8`}
            >
              {/* Vision Title */}
              <div className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-asawer-primary-600 mb-6 ${
                  locale === 'ar' ? 'font-arabic' : 'font-elegant'
                }`} style={{
                  letterSpacing: locale === 'ar' ? '0' : '-0.02em',
                  lineHeight: '1.2',
                }}>
                  {locale === 'ar' 
                    ? 'رؤيتنا' 
                    : 'Our Vision'}
                </h2>
              </div>

              {/* Vision Description */}
              <div className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className={`text-base md:text-lg lg:text-xl text-asawer-primary-700 leading-relaxed ${
                  locale === 'ar' ? 'font-arabic' : 'font-sans'
                }`} style={{
                  letterSpacing: '0.015em',
                  lineHeight: '1.8',
                  fontWeight: '400',
                  textAlign: 'justify',
                  textAlignLast: locale === 'ar' ? 'right' : 'left',
                }}>
                  {locale === 'ar' ? (
                    <p>
                      أن نكون <strong className="text-asawer-primary-600">العلامة الأبرز والأسرع نمواً والأكثر موثوقية</strong> في قطاع التطوير العقاري، ونتصدر ضمن أفضل ثلاثة مطورين في سلطنة عمان بحلول عام 2028، من خلال تقديم مشاريع مبتكرة، ومعايير عالية للجودة، وتجربة عملاء استثنائية ترتقي بتطلعات السوق وتلبي احتياجات المستقبل.
                    </p>
                  ) : (
                    <p>
                      To be the <strong className="text-asawer-primary-600">most prominent, fastest-growing, and most trusted</strong> brand in the real estate development sector, and to rank among the top three developers in the Sultanate of Oman by 2028, through delivering innovative projects, high quality standards, and exceptional customer experiences that elevate market aspirations and meet future needs.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

