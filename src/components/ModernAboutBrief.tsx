'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface ModernAboutBriefProps {
  locale: string;
}

export default function ModernAboutBrief({ locale }: ModernAboutBriefProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 sm:py-32 lg:py-40 overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(46, 94, 110, 0.15) 0%, transparent 70%)',
            top: '10%',
            left: '0%',
          }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(69, 133, 140, 0.15) 0%, transparent 70%)',
            bottom: '-10%',
            right: '5%',
          }}
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-asawer-primary-50 rounded-full border border-asawer-primary-200 mb-6"
            >
              <Building2 className="w-4 h-4 text-asawer-primary-500" />
              <span className="font-bold text-asawer-primary-600">
                {locale === 'ar' ? 'عن أساور' : 'About Asawer'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                {locale === 'ar' ? 'شركة أساور للتطوير العقاري' : 'Asawer Real Estate Development Company'}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-24 h-1.5 bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 mx-auto rounded-full"
            />
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 60 : -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium"
                >
                  {locale === 'ar'
                    ? 'شركة أساور للتطوير العقاري أُسست لتتربع مستوى عال في التطوير العُمراني، بتميز التصميم وجودة البناء والتشييد وإضفاء طابع الأمن والسلامة، وبكفاءة عُمانية مُتخصص بفهم عميق في القطاع العقاري.'
                    : 'Asawer Real Estate Development Company was established to reach a high level in urban development, with distinguished design, quality construction and building, and adding security and safety, with Omani expertise specialized with deep understanding in the real estate sector.'}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium"
                >
                  {locale === 'ar'
                    ? 'تتفرد أساور بتحسينها المستمر وتطوير المشاريع العقارية بأحدث الوسائل والمواد في الواقع المعاصر، تحت أيادي أكفاء يتميزون بالرشاقة، المصداقية، والعمل بمهنية عالية.'
                    : 'Asawer is distinguished by its continuous improvement and development of real estate projects with the latest means and materials in the contemporary reality, under the hands of competent people who are distinguished by agility, credibility, and high professionalism.'}
                </motion.p>
              </div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { number: '15+', label: locale === 'ar' ? 'سنة خبرة' : 'Years Experience' },
                  { number: '500+', label: locale === 'ar' ? 'مشروع' : 'Projects' },
                  { number: '20K+', label: locale === 'ar' ? 'عميل' : 'Clients' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 200 }}
                    className="text-center p-4 bg-gradient-to-br from-asawer-primary-50 to-asawer-secondary-50 rounded-xl border border-asawer-primary-100"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="pt-6"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  {locale === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -60 : 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
                {/* Main Image Container */}
                <div className="relative h-full bg-gradient-to-br from-asawer-primary-500/20 via-asawer-secondary-500/20 to-asawer-primary-500/20 rounded-2xl border-2 border-gray-200 overflow-hidden shadow-2xl">
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(circle at 0% 0%, rgba(46, 94, 110, 0.2), transparent)',
                        'radial-gradient(circle at 100% 100%, rgba(69, 133, 140, 0.2), transparent)',
                        'radial-gradient(circle at 0% 0%, rgba(46, 94, 110, 0.2), transparent)',
                      ],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />

                  {/* Large Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="text-8xl lg:text-9xl opacity-20 group-hover:opacity-30 transition-opacity"
                    >
                      🏢
                    </motion.div>
                  </div>

                  {/* Corner Accents */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-asawer-primary-500 rounded-tl-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-asawer-secondary-500 rounded-br-2xl"
                  />

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-asawer-primary-500/0 to-asawer-secondary-500/0 group-hover:from-asawer-primary-500/10 group-hover:to-asawer-secondary-500/10 transition-all duration-500"
                  />
                </div>

                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-6 border border-gray-200 max-w-xs"
                  whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="font-bold text-gray-900">
                      {locale === 'ar' ? 'معتمدة' : 'Certified'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {locale === 'ar'
                      ? 'شركة معتمدة ومرخصة بأعلى معايير الجودة'
                      : 'Certified and licensed company with highest quality standards'}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
