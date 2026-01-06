'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';

const testimonials = [
  {
    name_ar: 'أحمد محمد',
    name_en: 'Ahmed Mohammed',
    role_ar: 'مستثمر',
    role_en: 'Investor',
    text_ar: 'أساور غيرت مفهومي عن التطوير العقاري. مشروع متكامل يجمع بين الرفاهية والاستدامة.',
    text_en: 'Asawer changed my perception of real estate development. A comprehensive project that combines luxury and sustainability.',
    rating: 5,
  },
  {
    name_ar: 'فاطمة علي',
    name_en: 'Fatima Ali',
    role_ar: 'مشترية',
    role_en: 'Buyer',
    text_ar: 'الموقع الاستراتيجي والمرافق المتطورة جعلتني أختار أساور. استثمار ممتاز للمستقبل.',
    text_en: 'The strategic location and advanced facilities made me choose Asawer. An excellent investment for the future.',
    rating: 5,
  },
  {
    name_ar: 'خالد سعيد',
    name_en: 'Khalid Saeed',
    role_ar: 'مستثمر',
    role_en: 'Investor',
    text_ar: 'خدمة عملاء ممتازة وتصميم راقي. أساور حققت توقعاتي وتجاوزتها.',
    text_en: 'Excellent customer service and elegant design. Asawer met and exceeded my expectations.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locale = useLocale();

  return (
    <section ref={ref} className="py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-asawer-primary-500 via-asawer-secondary-500 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-asawer-primary-500/10 to-asawer-secondary-500/10 border-2 border-asawer-primary-500/20 rounded-full mb-8 shadow-lg"
          >
            <Quote className="w-6 h-6 text-asawer-primary-500" />
            <Sparkles className="w-5 h-5 text-asawer-secondary-500" />
            <span className="text-sm font-bold text-asawer-primary-500 uppercase tracking-wider">
              {locale === 'ar' ? 'آراء العملاء' : 'Testimonials'}
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
              {locale === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 mx-auto rounded-full shadow-lg" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="card-clean h-full hover:border-asawer-secondary-500/60 transition-all shadow-lg hover:shadow-2xl">
                <Quote className="w-10 h-10 text-asawer-primary-500/30 mb-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-asawer-secondary-500 text-asawer-secondary-500" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  {locale === 'ar' ? testimonial.text_ar : testimonial.text_en}
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <div className="font-bold text-gray-900 text-lg mb-1">
                    {locale === 'ar' ? testimonial.name_ar : testimonial.name_en}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">
                    {locale === 'ar' ? testimonial.role_ar : testimonial.role_en}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
