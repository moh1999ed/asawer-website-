'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface NewsSectionProps {
  locale: string;
}

interface NewsItem {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: '/images/hero-image.png',
    title: 'Asawer Launches New Residential Project',
    titleAr: 'أساور تطلق مشروع سكني جديد',
    description: 'We are excited to announce the launch of our latest residential project in Muscat, featuring modern designs and sustainable living.',
    descriptionAr: 'نحن متحمسون للإعلان عن إطلاق أحدث مشروع سكني لدينا في مسقط، والذي يتميز بتصاميم عصرية وعيش مستدام.',
    date: '2024-01-15',
  },
  {
    id: 2,
    image: '/images/hero-image.png',
    title: 'Award for Excellence in Real Estate',
    titleAr: 'جائزة التميز في التطوير العقاري',
    description: 'Asawer has been recognized with the Excellence Award for outstanding contribution to real estate development in Oman.',
    descriptionAr: 'تم تكريم أساور بجائزة التميز لمساهمتها المتميزة في التطوير العقاري في عمان.',
    date: '2024-01-10',
  },
  {
    id: 3,
    image: '/images/hero-image.png',
    title: 'Partnership with International Architects',
    titleAr: 'شراكة مع مهندسين معماريين دوليين',
    description: 'We are proud to announce our partnership with leading international architects to bring world-class designs to Oman.',
    descriptionAr: 'نفخر بالإعلان عن شراكتنا مع كبار المهندسين المعماريين الدوليين لجلب تصاميم عالمية المستوى إلى عمان.',
    date: '2024-01-05',
  },
];

export default function NewsSection({ locale }: NewsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <section id="news" className="relative pt-32 md:pt-40 lg:pt-48 pb-32 md:pb-40 lg:pb-48 bg-gradient-to-b from-asawer-primary-50 to-white intersection-observer-target">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              locale === 'ar' ? 'font-arabic' : 'font-elegant'
            }`}>
              <span className="bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent">
                {locale === 'ar' ? 'أحدث الأخبار' : 'Latest News'}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-asawer-primary-600 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'تابع آخر أخبارنا وإنجازاتنا' 
                : 'Stay updated with our latest news and achievements'}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            {newsItems.map((news, index) => (
              currentSlide === index && (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="card-glass overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-full min-h-[300px]">
                      <Image
                        src={news.image}
                        alt={locale === 'ar' ? news.titleAr : news.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-asawer-primary-500/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-sm text-asawer-primary-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{news.date}</span>
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                        locale === 'ar' ? 'font-arabic' : 'font-elegant'
                      }`}>
                        {locale === 'ar' ? news.titleAr : news.title}
                      </h3>
                      <p className="text-asawer-primary-700 leading-relaxed mb-6">
                        {locale === 'ar' ? news.descriptionAr : news.description}
                      </p>
                      <button className="inline-flex items-center gap-2 text-asawer-secondary-500 font-semibold hover:gap-4 transition-all">
                        {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                        <ArrowRight className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all z-10"
            aria-label="Previous"
          >
            <ChevronLeft className={`w-6 h-6 text-asawer-primary-600 ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all z-10"
            aria-label="Next"
          >
            <ChevronRight className={`w-6 h-6 text-asawer-primary-600 ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-asawer-secondary-500 w-8'
                    : 'bg-asawer-primary-300 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

