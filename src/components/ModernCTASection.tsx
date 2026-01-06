'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { ArrowRight, Zap, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function ModernCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locale = useLocale();

  return (
    <section ref={ref} className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-asawer-primary-900 to-gray-900" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(46, 94, 110, 0.3) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(69, 133, 140, 0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '-10%',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1) 76%, transparent 77%, transparent),
                              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="max-w-4xl mx-auto"
        >
          {/* Content */}
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mx-auto"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.span>
              <span className="text-sm font-semibold text-white">
                {locale === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                {locale === 'ar' 
                  ? 'هل أنت مستعد لبناء حلمك؟'
                  : 'Ready to Build Your Dream?'}
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {locale === 'ar'
                  ? 'انضم إلى مئات العملاء الراضين وابدأ رحلتك نحو استثمار عقاري ناجح مع أساور'
                  : 'Join hundreds of satisfied clients and start your journey towards a successful real estate investment with Asawer'}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6"
            >
              {/* Primary Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl text-base sm:text-lg overflow-hidden shadow-2xl"
                >
                  {/* Animated Background Shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent"
                    animate={{ x: ['200%', '-200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-300" />
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white/15 backdrop-blur-xl text-white font-bold rounded-xl text-base sm:text-lg border-2 border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {locale === 'ar' ? 'استكشف المشاريع' : 'Explore Projects'}
                    <motion.span
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-5 h-5" style={{
                        transform: locale === 'ar' ? 'scaleX(-1)' : 'none'
                      }} />
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 border-t border-white/10"
            >
              {[
                {
                  number: '500+',
                  label_ar: 'مشروع منجز',
                  label_en: 'Completed Projects',
                },
                {
                  number: '20K+',
                  label_ar: 'عميل راضي',
                  label_en: 'Happy Clients',
                },
                {
                  number: '15+',
                  label_ar: 'سنة خبرة',
                  label_en: 'Years Experience',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  className="space-y-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                    className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-400 text-base sm:text-lg">
                    {locale === 'ar' ? stat.label_ar : stat.label_en}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-asawer-primary-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-asawer-secondary-500/20 to-transparent rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
