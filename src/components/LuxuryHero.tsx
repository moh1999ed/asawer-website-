'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface LuxuryHeroProps {
  locale: string;
}

export default function LuxuryHero({ locale }: LuxuryHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const slides = [
    {
      image: '/images/hero-image.png',
      title: locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate Development',
      subtitle: locale === 'ar' 
        ? 'بناء المستقبل، إرث للأجيال' 
        : 'Building the Future, Legacy for Generations',
      description: locale === 'ar'
        ? 'نحن نخلق مشاريع استثنائية تجمع بين التصميم المعماري المتميز والجودة العالية'
        : 'We create exceptional projects that combine outstanding architectural design with high quality',
    },
    {
      image: '/images/hero-image.png',
      title: locale === 'ar' ? 'مشاريع فاخرة' : 'Luxury Projects',
      subtitle: locale === 'ar' 
        ? 'تصميمات معمارية استثنائية' 
        : 'Exceptional Architectural Designs',
      description: locale === 'ar'
        ? 'اكتشف مجموعتنا المميزة من المشاريع الفاخرة في أفضل المواقع'
        : 'Discover our exceptional collection of luxury projects in prime locations',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    // Preload images
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = slide.image;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true)); // Continue even if images fail
  }, [slides]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden pb-16 md:pb-20 lg:pb-24"
    >
      {/* Background Images with Enhanced Zoom Effect */}
      <motion.div
        ref={imageRef}
        style={{ y, scale }}
        className="absolute inset-0 bg-black"
      >
        <AnimatePresence mode="popLayout">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    quality={90}
                    className="object-cover"
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-asawer-primary-900/20 via-transparent to-asawer-secondary-900/20" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Floating Typography */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Text Background Overlay for Better Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <Link href={`/${locale}#projects`}>
            <button
              className="btn-liquid px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold relative overflow-hidden group rounded-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                {locale === 'ar' ? 'استكشف المشاريع' : 'Explore Projects'}
                <ArrowRight className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-asawer-secondary-500 to-asawer-primary-500 opacity-0 group-hover:opacity-100"
              />
            </button>
          </Link>
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-white/80 text-white hover:bg-white hover:text-asawer-primary-500 relative overflow-hidden group rounded-lg backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" />
              {locale === 'ar' ? 'شاهد الفيديو' : 'Watch Video'}
            </span>
            <div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
            />
          </button>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-24 sm:bottom-28 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-2.5 rounded-full ${
              currentSlide === index
                ? 'bg-asawer-secondary-500 w-8 sm:w-10 shadow-neon'
                : 'bg-white/50 w-2 sm:w-2.5 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Enhanced Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white hover:text-asawer-secondary-500 group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider opacity-70 group-hover:opacity-100">
            {locale === 'ar' ? 'انتقل للأسفل' : 'Scroll Down'}
          </span>
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </button>
    </section>
  );
}
