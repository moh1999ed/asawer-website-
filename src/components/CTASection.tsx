'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locale = useLocale();

  return (
    <section ref={ref} className="section-padding bg-gradient-to-br from-asawer-primary-500 via-asawer-primary-600 to-asawer-secondary-500 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-6 text-white"
          >
            {locale === 'ar' 
              ? 'ابدأ رحلتك الاستثمارية مع أساور' 
              : 'Start Your Investment Journey with Asawer'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed"
          >
            {locale === 'ar'
              ? 'عروض حصرية ومكافآت مميزة وامتيازات خاصة في انتظار زبائننا الجدد، سارعوا بالاستفادة منها الآن!'
              : 'Exclusive offers, special rewards and privileges await our new customers, hurry to take advantage of them now!'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="btn-unified bg-white text-asawer-primary-500 hover:bg-white/95"
            >
              {locale === 'ar' ? 'استثمر الآن' : 'Invest Now'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
