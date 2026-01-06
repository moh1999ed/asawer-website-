'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AboutSectionProps {
  locale: string;
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-16 overflow-hidden intersection-observer-target">
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
          {/* Split Layout - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${locale === 'ar' ? 'lg:order-2' : 'lg:order-1'} space-y-8`}
            >
              {/* Company Name */}
              <div className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-asawer-primary-600 mb-6 ${
                  locale === 'ar' ? 'font-arabic' : 'font-elegant'
                }`} style={{
                  letterSpacing: locale === 'ar' ? '0' : '-0.02em',
                  lineHeight: '1.2',
                }}>
                  {locale === 'ar' 
                    ? 'أساور للتطوير العقاري' 
                    : 'Asawer Real Estate Development'}
                </h2>
              </div>

              {/* Company Description */}
              <div className={`${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className={`text-base md:text-lg lg:text-xl text-asawer-primary-700 leading-relaxed ${
                  locale === 'ar' ? 'font-arabic' : 'font-sans'
                }`} style={{
                  letterSpacing: '0.015em',
                  lineHeight: '1.8',
                  fontWeight: '400',
                  textAlign: locale === 'ar' ? 'justify' : 'justify',
                  textAlignLast: locale === 'ar' ? 'right' : 'left',
                }}>
                  {locale === 'ar' ? (
                    <p>
                      شركة <strong className="text-asawer-primary-600">أساور للتطوير العقاري</strong> هي شركة رائدة في مجال التطوير العقاري الفاخر في سلطنة عمان، متخصصة في إنشاء مشاريع استثنائية تجمع بين التصميم المعماري المتميز والجودة العالية والاستدامة. نحن ملتزمون ببناء مستقبل أفضل للأجيال القادمة من خلال مشاريعنا المبتكرة التي تركز على الاستدامة والتميز في كل تفصيلة، مع الاهتمام بالبيئة والمجتمع المحلي. بفضل فريقنا المتميز وخبرتنا الواسعة التي تمتد لأكثر من عقدين، نقدم حلولاً عقارية متكاملة تلبي احتياجات عملائنا وتتجاوز توقعاتهم، مما يجعلنا الخيار الأمثل للاستثمار العقاري في عمان.
                    </p>
                  ) : (
                    <p>
                      <strong className="text-asawer-primary-600">Asawer Real Estate Development</strong> is a leading company in luxury real estate development in the Sultanate of Oman, specializing in creating exceptional projects that combine outstanding architectural design, high quality, and sustainability. We are committed to building a better future for generations to come through our innovative projects that focus on sustainability and excellence in every detail, while caring for the environment and local community. Thanks to our distinguished team and extensive experience spanning more than two decades, we provide integrated real estate solutions that meet our clients' needs and exceed their expectations, making us the ideal choice for real estate investment in Oman.
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Button */}
              <motion.div
                className={`${locale === 'ar' ? 'text-right' : 'text-left'} pt-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <Link href="#contact">
                  <motion.button
                    className="group relative px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    style={{
                      backgroundColor: '#2e5f6e',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: '#46868d' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button Background Animation */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundColor: '#46868d',
                      }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-2 font-bold" style={{
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                    }}>
                      {locale === 'ar' ? (
                        <>
                          <span>تواصل معنا</span>
                          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                          }} />
                        </>
                      ) : (
                        <>
                          <span>Contact Us</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                          }} />
                        </>
                      )}
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${locale === 'ar' ? 'lg:order-1' : 'lg:order-2'} relative`}
            >
              <div className="relative h-[300px] md:h-[380px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-asawer-primary-100 to-asawer-secondary-50">
                <Image
                  src="/images/about/asawer-building.jpg"
                  alt={locale === 'ar' ? 'مبنى أساور للتطوير العقاري' : 'Asawer Real Estate Development Building'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
