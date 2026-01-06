'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface HeroImageProps {
  locale: string;
}

export default function HeroImage({ locale }: HeroImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Large Hero Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="/images/hero-image.png"
          alt={locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate'}
          fill
          priority
          className="object-cover scale-110"
          sizes="100vw"
          quality={95}
        />
        
        {/* Beautiful Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-asawer-primary-500/60 via-asawer-primary-500/45 to-asawer-primary-500/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-asawer-secondary-500/20 to-transparent" />
        
        {/* Animated Gradient Mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(69, 133, 140, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(46, 94, 110, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(69, 133, 140, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Elegant Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-asawer-secondary-500/60 to-transparent z-20" />
      
      {/* Side Accent Lines */}
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 transform -translate-y-1/2" />

      {/* Content Overlay */}
      <motion.div 
        className="relative z-10 h-full flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Decorative Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block"
              >
                <div className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <span className="text-white/90 text-sm font-semibold tracking-wide">
                    {locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate'}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                {locale === 'ar' ? 'نصيغ المستقبل، نبني المستقبل' : 'Crafting the Future, Building the Future'}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="pt-4"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white/95 backdrop-blur-xl text-asawer-primary-500 font-bold text-lg rounded-2xl hover:bg-white hover:shadow-2xl hover:scale-105 transition-all group border-2 border-white/30"
                >
                  <span>{locale === 'ar' ? 'استكشف المشاريع' : 'Explore Projects'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Beautiful Animated Ornaments */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 z-10"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-full h-full border-2 border-asawer-secondary-500/40 rounded-full relative">
          <motion.div
            className="absolute inset-0 border-2 border-asawer-secondary-500/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 md:w-36 md:h-36 z-10"
        initial={{ opacity: 0, scale: 0, rotate: 180 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="w-full h-full border-2 border-asawer-primary-500/40 rounded-full relative">
          <motion.div
            className="absolute inset-0 border-2 border-asawer-primary-500/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
      </motion.div>

      {/* Floating Particles Effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full z-10"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </section>
  );
}

