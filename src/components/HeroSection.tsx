'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronDown, Building2, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface AdvancedHeroProps {
  locale: string;
}

const heroImages = [
  '/images/hero-image.png',
  '/images/hero-image-2.png',
  '/images/hero-image-3.png',
  '/images/hero-image-4.png',
  '/images/hero-image-5.png',
];

export default function AdvancedHero({ locale }: AdvancedHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXTransform = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
  const mouseYTransform = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);
  
  const yTransform = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      mouseX.set(xPercent);
      mouseY.set(yPercent);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative w-full overflow-hidden" 
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      {/* 3D Parallax Image Container */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: yTransform,
          scale,
          x: mouseXTransform,
        }}
      >
        {heroImages.map((image, index) => {
          const isActive = index === currentImageIndex;
          return (
            <motion.div
              key={`${image}-${index}`}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 1 : 0,
                filter: isActive ? 'blur(0px)' : 'blur(3px)',
              }}
            >
              <Image
                src={image}
                alt={`${locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate'} - ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                quality={index === 0 ? 80 : 70}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Advanced Gradient Overlays */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(46, 94, 110, 0.7) 0%, transparent 60%)',
          }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(46, 94, 110, 0.7) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 50%, rgba(69, 133, 140, 0.7) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 50%, rgba(46, 94, 110, 0.7) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-asawer-secondary-500/30 to-transparent" />
      </div>

      {/* Interactive Mouse Follower Glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle, rgba(69, 133, 140, 0.3), transparent 70%)',
          filter: 'blur(60px)',
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-30 h-full flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 200 }}
                className="inline-block relative"
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-white/40 via-white/20 to-white/40 rounded-full blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative px-10 py-4 bg-white/20 backdrop-blur-2xl border-2 border-white/40 rounded-full shadow-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <div className="relative flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-3 h-3 rounded-full bg-white shadow-lg"
                    />
                    <span className="text-white font-black text-lg md:text-xl tracking-wider drop-shadow-2xl">
                      {locale === 'ar' ? 'أساور للتطوير العقاري' : 'Asawer Real Estate'}
                    </span>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-3 h-3 rounded-full bg-white shadow-lg"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Main Title with 3D Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight px-4"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(69, 133, 140, 0.3)',
                  transform: 'perspective(1000px) rotateX(0deg)',
                }}
                whileHover={{
                  scale: 1.02,
                  textShadow: '0 15px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(69, 133, 140, 0.5)',
                }}
              >
                {locale === 'ar' ? 'نطور بإتقان، نبني المستقبل' : 'Developing with Excellence, Building the Future'}
              </motion.h1>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="pt-6"
              >
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center gap-4 px-10 py-6 bg-white/95 backdrop-blur-2xl text-asawer-primary-500 font-bold text-lg md:text-xl rounded-2xl hover:bg-white transition-all duration-300 shadow-2xl overflow-hidden"
                  style={{
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-asawer-primary-500/10 via-asawer-secondary-500/10 to-asawer-primary-500/10"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="relative z-10">{locale === 'ar' ? 'استكشف المشاريع' : 'Explore Projects'}</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm font-semibold">{locale === 'ar' ? 'انتقل للأسفل' : 'Scroll Down'}</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

