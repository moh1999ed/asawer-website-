'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface AboutBriefProps {
  locale: string;
}

export default function AboutBrief({ locale }: AboutBriefProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(46, 94, 110) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="badge-unified mx-auto mb-6">
              <Building2 className="w-4 h-4" />
              <span>{locale === 'ar' ? 'عن أساور' : 'About Asawer'}</span>
            </div>
            
            <h2 className="mb-4">
              <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                {locale === 'ar' ? 'شركة أساور للتطوير العقاري' : 'Asawer Real Estate Development Company'}
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 mx-auto rounded-full" />
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 40 : -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-5">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {locale === 'ar'
                    ? 'شركة أساور للتطوير العقاري أُسست لتتربع مستوى عال في التطوير العُمراني، بتميز التصميم وجودة البناء والتشييد وإضفاء طابع الأمن والسلامة، وبكفاءة عُمانية مُتخصص بفهم عميق في القطاع العقاري، ورؤى ثاقبة لاقتناص فرص الاستثمار في المجال.'
                    : 'Asawer Real Estate Development Company was established to reach a high level in urban development, with distinguished design, quality construction and building, and adding security and safety, with Omani expertise specialized with deep understanding in the real estate sector, and insightful visions to seize investment opportunities in the field.'}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {locale === 'ar'
                    ? 'تتفرد أساور بتحسينها المستمر وتطوير المشاريع العقارية بأحدث الوسائل والمواد في الواقع المعاصر، تحت أيادي أكفاء يتميزون بالرشاقة، المصداقية، والعمل بمهنية عالية.'
                    : 'Asawer is distinguished by its continuous improvement and development of real estate projects with the latest means and materials in the contemporary reality, under the hands of competent people who are distinguished by agility, credibility, and high professionalism.'}
                </p>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-asawer-primary-500/10 via-asawer-secondary-500/10 to-asawer-primary-500/10 border-2 border-gray-200 shadow-elegant">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="text-9xl opacity-10"
                  >
                    🏢
                  </motion.div>
                </div>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-asawer-primary-500/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-asawer-secondary-500/30 rounded-br-2xl" />
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Link
              href="/about"
              className="btn-unified btn-primary inline-flex items-center gap-3"
            >
              {locale === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
