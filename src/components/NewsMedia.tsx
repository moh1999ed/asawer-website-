'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface NewsMediaProps {
  locale: string;
}

const news = [
  {
    id: 1,
    title: 'New Luxury Project Launch',
    title_ar: 'إطلاق مشروع فاخر جديد',
    date: 'December 30, 2025',
    date_ar: '30 ديسمبر 2025',
    image: '/images/hero-image-2.png',
    excerpt:
      'Experience the pinnacle of luxury living with our latest architectural masterpiece',
    excerpt_ar: 'اختبر قمة الرفاهية مع تحفتنا المعمارية الأحدث',
  },
  {
    id: 2,
    title: 'Award Recognition',
    title_ar: 'جائزة معترف بها',
    date: 'December 28, 2025',
    date_ar: '28 ديسمبر 2025',
    image: '/images/hero-image-3.png',
    excerpt: 'We are proud to receive recognition for our commitment to excellence',
    excerpt_ar: 'نفتخر بتلقي الاعتراف بالتزامنا بالتميز',
  },
  {
    id: 3,
    title: 'Sustainability Initiative',
    title_ar: 'مبادرة الاستدامة',
    date: 'December 25, 2025',
    date_ar: '25 ديسمبر 2025',
    image: '/images/hero-image-4.png',
    excerpt: 'Introducing eco-friendly features in our upcoming developments',
    excerpt_ar: 'إدخال ميزات صديقة للبيئة في مشاريعنا القادمة',
  },
];

export default function NewsMedia({ locale }: NewsMediaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 lg:py-40 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-8">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-black">
                {locale === 'ar' ? 'الأخبار والإعلام' : 'NEWS & MEDIA'}
              </h2>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-sm font-light tracking-widest text-gray-700 hover:text-black transition-colors"
              >
                {locale === 'ar' ? 'عرض الكل' : 'VIEW ALL'} →
              </motion.button>
            </div>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-64 md:h-80 bg-gray-200 mb-6">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={item.image}
                      alt={locale === 'ar' ? item.title_ar : item.title}
                      fill
                      className="object-cover"
                      quality={85}
                    />
                  </motion.div>

                  {/* Date Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs font-light tracking-widest text-black">
                      {locale === 'ar' ? item.date_ar : item.date}
                    </p>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
                >
                  <h3 className="text-lg md:text-xl font-light text-black group-hover:text-gray-600 transition-colors">
                    {locale === 'ar' ? item.title_ar : item.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {locale === 'ar' ? item.excerpt_ar : item.excerpt}
                  </p>
                  <motion.div
                    className="flex items-center gap-2 text-xs font-light tracking-widest text-gray-500 group-hover:text-black transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {locale === 'ar' ? 'اقرأ المزيد' : 'READ MORE'} →
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
