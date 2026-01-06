'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin, Calendar, Home, Sparkles, Award } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface FeaturedProjectHeroProps {
  locale: string;
}

export default function FeaturedProjectHero({ locale }: FeaturedProjectHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const project = {
    id: 1,
    name_ar: 'مشروع الخوير السكني',
    name_en: 'Khuwair Residential Project',
    description_ar: 'مشروع سكني متكامل يضم وحدات سكنية عصرية مع مرافق وخدمات متطورة، مصمم خصيصاً للعائلات التي تبحث عن نمط حياة راقي ومستدام في قلب مسقط',
    description_en: 'A comprehensive residential project featuring modern housing units with advanced facilities and services, designed specifically for families seeking an elegant and sustainable lifestyle in the heart of Muscat',
    location_ar: 'الخوير، مسقط',
    location_en: 'Khuwair, Muscat',
    completion: 'Q1 2028',
    price_from: '45,000',
    features: [
      locale === 'ar' ? 'وحدات سكنية عصرية' : 'Modern Housing Units',
      locale === 'ar' ? 'مرافق متطورة' : 'Advanced Facilities',
      locale === 'ar' ? 'موقع استراتيجي' : 'Strategic Location',
      locale === 'ar' ? 'تصميم مستدام' : 'Sustainable Design',
    ],
  };

  return (
    <section ref={ref} className="relative py-0 bg-white overflow-hidden">
      <div className="relative h-[700px] md:h-[800px]">
        {/* Luxurious Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-asawer-primary-500/25 via-asawer-secondary-500/20 to-asawer-primary-500/25">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{ duration: 12, repeat: Infinity }}
              className="text-9xl opacity-8"
            >
              🏘️
            </motion.div>
          </div>
          {/* Elegant Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(46, 94, 110) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Luxurious Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-asawer-primary-500/97 via-asawer-primary-500/94 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, type: 'spring' }}
                className="space-y-12 text-white"
              >
                {/* Luxurious Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-7 py-3 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-2xl"
                >
                  <Sparkles className="w-5 h-5 text-asawer-secondary-500" />
                  <span className="text-sm font-bold tracking-wider">
                    {locale === 'ar' ? 'المشروع المميز' : 'Featured Project'}
                  </span>
                  <Award className="w-5 h-5 text-asawer-secondary-500" />
                </motion.div>

                {/* Luxurious Project Name */}
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight drop-shadow-2xl"
                >
                  {locale === 'ar' ? project.name_ar : project.name_en}
                </motion.h2>

                {/* Luxurious Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl text-white/92 leading-relaxed font-light"
                >
                  {locale === 'ar' ? project.description_ar : project.description_en}
                </motion.p>

                {/* Luxurious Project Details */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5"
                >
                  <div className="flex items-center gap-4 p-5 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 hover:bg-white/20 transition-all group">
                    <div className="p-3 rounded-xl bg-white/25 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1 font-semibold uppercase tracking-wider">{locale === 'ar' ? 'الموقع' : 'Location'}</div>
                      <div className="font-bold text-lg">{locale === 'ar' ? project.location_ar : project.location_en}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 hover:bg-white/20 transition-all group">
                    <div className="p-3 rounded-xl bg-white/25 group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1 font-semibold uppercase tracking-wider">{locale === 'ar' ? 'تاريخ الإنجاز' : 'Completion'}</div>
                      <div className="font-bold text-lg">{project.completion}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 hover:bg-white/20 transition-all group">
                    <div className="p-3 rounded-xl bg-white/25 group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1 font-semibold uppercase tracking-wider">{locale === 'ar' ? 'السعر' : 'Price'}</div>
                      <div className="font-bold text-lg">
                        {locale === 'ar' ? 'من' : 'From'} {project.price_from} {locale === 'ar' ? 'ريال' : 'OMR'}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {project.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-5 py-2.5 bg-white/18 backdrop-blur-xl border border-white/30 rounded-xl text-sm font-semibold shadow-lg hover:bg-white/25 transition-all cursor-pointer"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Luxurious CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-3 px-12 py-6 bg-white text-asawer-primary-500 font-bold text-lg rounded-2xl hover:bg-white/95 transition-all shadow-2xl hover:shadow-white/40 group"
                  >
                    {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Luxurious Decorative Elements */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-asawer-secondary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-asawer-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
