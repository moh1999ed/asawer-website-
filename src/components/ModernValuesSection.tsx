'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { Zap, Shield, Target, Users, Heart, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title_ar: 'التميز والإبداع',
    title_en: 'Excellence & Innovation',
    desc_ar: 'نسعى للتطوير المستمر والابتكار في كل مشروع عقاري',
    desc_en: 'We strive for continuous development and innovation in every real estate project',
    color: 'from-yellow-400 to-orange-500',
    delay: 0,
  },
  {
    icon: Shield,
    title_ar: 'الأمان والموثوقية',
    title_en: 'Security & Reliability',
    desc_ar: 'نضمن أعلى معايير الجودة والسلامة في كل بناء',
    desc_en: 'We ensure the highest standards of quality and safety in every construction',
    color: 'from-blue-400 to-cyan-500',
    delay: 0.1,
  },
  {
    icon: Target,
    title_ar: 'التركيز على العميل',
    title_en: 'Customer Focus',
    desc_ar: 'رضا العميل هو أولويتنا الأساسية',
    desc_en: 'Customer satisfaction is our primary priority',
    color: 'from-purple-400 to-pink-500',
    delay: 0.2,
  },
  {
    icon: Users,
    title_ar: 'الفريق المحترف',
    title_en: 'Professional Team',
    desc_ar: 'فريق متخصص ومحترف بكفاءة عالية',
    desc_en: 'A specialized and professional team with high competence',
    color: 'from-green-400 to-emerald-500',
    delay: 0.3,
  },
  {
    icon: Heart,
    title_ar: 'المسؤولية الاجتماعية',
    title_en: 'Social Responsibility',
    desc_ar: 'نساهم في تطوير المجتمع والبيئة',
    desc_en: 'We contribute to community and environmental development',
    color: 'from-red-400 to-rose-500',
    delay: 0.4,
  },
  {
    icon: Lightbulb,
    title_ar: 'الرؤية المستقبلية',
    title_en: 'Future Vision',
    desc_ar: 'نخطط لمستقبل مزدهر ومستدام',
    desc_en: 'We plan for a prosperous and sustainable future',
    color: 'from-indigo-400 to-blue-500',
    delay: 0.5,
  },
];

export default function ModernValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locale = useLocale();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-20 sm:py-32 lg:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 50%, #e8f1f7 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(46, 94, 110, 0.15) 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(69, 133, 140, 0.15) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block mb-6 px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-sm"
          >
            <span className="bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent font-bold text-sm">
              {locale === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-asawer-primary-600 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
              {locale === 'ar' 
                ? 'ما يحركنا نحو النجاح'
                : 'What Drives Us to Success'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {locale === 'ar'
              ? 'مبادئ راسخة وقيم عميقة توجه كل خطواتنا نحو بناء مستقبل أفضل'
              : 'Deep-rooted principles and values guide every step we take towards building a better future'}
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: value.delay,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Outer Glow */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${value.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Card */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                    {/* Animated gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color}`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.05 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{
                          delay: value.delay + 0.2,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-all`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: value.delay + 0.3, duration: 0.6 }}
                        className="text-xl font-bold text-gray-900 group-hover:text-asawer-primary-500 transition-colors"
                      >
                        {locale === 'ar' ? value.title_ar : value.title_en}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: value.delay + 0.4, duration: 0.6 }}
                        className="text-gray-600 leading-relaxed text-sm sm:text-base"
                      >
                        {locale === 'ar' ? value.desc_ar : value.desc_en}
                      </motion.p>

                      {/* Divider */}
                      <motion.div
                        className={`h-1 w-0 bg-gradient-to-r ${value.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 border-gradient pointer-events-none`}
                      style={{
                        backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
                        backgroundPosition: '200% center',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['200% center', '-200% center'],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 sm:mt-20 lg:mt-24"
        >
          <p className="text-gray-600 text-lg mb-8">
            {locale === 'ar'
              ? 'هذه القيم تشكل أساس كل قراراتنا وأعمالنا'
              : 'These values form the foundation of all our decisions and actions'}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-10 py-4 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg">
              {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
