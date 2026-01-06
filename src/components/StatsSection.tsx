'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { Ruler, TrendingUp, DollarSign, Layers, Home } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface StatItem {
  value: number;
  unit?: string;
  label_ar: string;
  label_en: string;
  icon: React.ReactNode;
  gradientColors: string[];
  decimals?: number;
}

const stats: StatItem[] = [
  { 
    value: 14.8, 
    unit: 'km²',
    decimals: 1,
    label_ar: 'متر مربع (إجمالي المساحات المطورة)', 
    label_en: 'Square meters (Total Developed Areas)', 
    icon: <Ruler className="w-8 h-8" />,
    gradientColors: ['#8bc8d3', '#2e5e6e', '#27505e'], // primary-300, primary-500, primary-600
  },
  { 
    value: 20000, 
    decimals: 0,
    label_ar: 'مجموع الوحدات المطورة وقيد التطوير', 
    label_en: 'Total Units Developed and Under Development', 
    icon: <Home className="w-8 h-8" />,
    gradientColors: ['#2e5e6e', '#47c3cf', '#3a6e74'], // primary-500, secondary-400, secondary-600
  },
  { 
    value: 500, 
    unit: 'M',
    decimals: 0,
    label_ar: 'مليون ريال إجمالي قيمة المشاريع', 
    label_en: 'Million OMR Total Project Value', 
    icon: <DollarSign className="w-8 h-8" />,
    gradientColors: ['#75d2db', '#45858c', '#3a6e74'], // secondary-300, secondary-500, secondary-600
  },
  { 
    value: 50, 
    decimals: 0,
    label_ar: 'إجمالي عدد المشاريع', 
    label_en: 'Total Number of Projects', 
    icon: <Layers className="w-8 h-8" />,
    gradientColors: ['#27505e', '#45858c', '#5aacbc'], // primary-600, secondary-500, primary-400
  },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locale = useLocale();

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(46, 94, 110) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(46, 94, 110, 0.1) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(69, 133, 140, 0.1) 0%, transparent 70%)',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-unified mx-auto mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>{locale === 'ar' ? 'إحصائياتنا' : 'Our Statistics'}</span>
            </div>
            
            <h2 className="mb-6">
              <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                {locale === 'ar' ? 'الأرقام تتحدث' : 'Numbers Speak'}
              </span>
            </h2>
            
            <p>
              {locale === 'ar'
                ? 'إنجازاتنا تتحدث عن نفسها من خلال الأرقام'
                : 'Our achievements speak for themselves through numbers'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const gradientStyle = `linear-gradient(135deg, ${stat.gradientColors.join(', ')})`;
            const gradientTextStyle = `linear-gradient(135deg, ${stat.gradientColors[0]}, ${stat.gradientColors[stat.gradientColors.length - 1]})`;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="card-unified h-full text-center relative overflow-hidden">
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: gradientStyle }}
                  />
                  
                  {/* Icon Container with Brand Colors */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-6"
                  >
                    <div 
                      className="relative p-6 rounded-2xl text-white shadow-brand group-hover:shadow-brand-lg transition-all group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: gradientStyle }}
                    >
                      {stat.icon}
                      {/* Animated Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl -z-10"
                        style={{ background: gradientStyle }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Animated Counter with Brand Gradient */}
                  <div className="mb-4">
                    <div className="text-5xl md:text-6xl font-black mb-2">
                      <span 
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage: gradientTextStyle,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        <AnimatedCounter 
                          value={stat.value} 
                          decimals={stat.decimals}
                          suffix={stat.unit ? ` ${stat.unit}` : '+'}
                        />
                      </span>
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-base md:text-lg text-gray-700 font-semibold leading-relaxed">
                    {locale === 'ar' ? stat.label_ar : stat.label_en}
                  </div>

                  {/* Animated Decorative Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '60px' } : {}}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                    className="h-1 mx-auto mt-6 rounded-full relative overflow-hidden"
                    style={{ background: gradientTextStyle }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: gradientTextStyle }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>

                  {/* Corner Accents */}
                  <div 
                    className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-br-full"
                    style={{ background: gradientStyle }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-tl-full"
                    style={{ background: gradientStyle }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
