'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface BrandAmbassadorProps {
  locale: string;
}

export default function BrandAmbassador({ locale }: BrandAmbassadorProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 60 : -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <span className="text-xs font-light tracking-widest text-gray-500 uppercase">
                  {locale === 'ar' ? 'قيم الشركة' : 'OUR VALUES'}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light text-black"
              >
                {locale === 'ar'
                  ? 'إرث من التميز'
                  : 'A LEGACY OF EXCELLENCE'}
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6 text-gray-700 font-light leading-relaxed"
              >
                <p>
                  {locale === 'ar'
                    ? 'نحن نؤمن بأن كل مشروع هو فرصة لإنشاء شيء استثنائي. مع التزامنا بالتميز والابتكار، نطور مشاريع عقارية متميزة تثري حياة الناس.'
                    : 'We believe that every project is an opportunity to create something exceptional. With our commitment to excellence and innovation, we develop outstanding real estate projects that enrich lives.'}
                </p>
                <p>
                  {locale === 'ar'
                    ? 'فريقنا من الخبراء المتخصصين يعمل بشغف لتحقيق أحلام العملاء وتجاوز التوقعات في كل تفصيل.'
                    : 'Our team of specialized experts work with passion to fulfill client dreams and exceed expectations in every detail.'}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
              >
                {[
                  { number: '500+', label: locale === 'ar' ? 'مشروع' : 'Projects' },
                  { number: '20K+', label: locale === 'ar' ? 'عميل' : 'Clients' },
                  { number: '15+', label: locale === 'ar' ? 'سنة' : 'Years' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="text-3xl font-light text-black">
                      {stat.number}
                    </div>
                    <div className="text-xs font-light tracking-widest text-gray-500 mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="group px-8 py-4 border border-black text-black font-light text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-black"
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">
                  {locale === 'ar' ? 'اتصل بنا' : 'CONTACT US'}
                </span>
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -60 : 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
                <Image
                  src="/images/hero-image-5.png"
                  alt="Brand Ambassador"
                  fill
                  className="object-cover"
                  quality={95}
                />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white shadow-2xl p-8 max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ y: -10 }}
              >
                <div className="space-y-3">
                  <p className="text-sm font-light text-gray-600">
                    {locale === 'ar'
                      ? '"نحن نبني المستقبل بإتقان وشغف"'
                      : '"We build the future with excellence and passion"'}
                  </p>
                  <p className="text-xs font-light tracking-widest text-black uppercase">
                    {locale === 'ar' ? 'أساور' : 'ASAWER'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
