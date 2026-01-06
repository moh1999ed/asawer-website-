'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LuxuryProjectsProps {
  locale: string;
}

interface Project {
  id: number;
  name: string;
  name_ar: string;
  location: string;
  location_ar: string;
  image: string;
  category: 'branded' | 'luxury' | 'premium';
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Bugatti Residences',
    name_ar: 'مساكن بوغاتي',
    location: 'Downtown Dubai',
    location_ar: 'وسط البلد',
    image: '/images/hero-image.png',
    category: 'branded',
  },
  {
    id: 2,
    name: 'Mercedes-Benz Places',
    name_ar: 'أماكن مرسيدس-بنز',
    location: 'Dubai Hills',
    location_ar: 'تلال دبي',
    image: '/images/hero-image-2.png',
    category: 'branded',
  },
  {
    id: 3,
    name: 'Burj Binghatti Jacob&CO',
    name_ar: 'برج أساور جاكوب اند كو',
    location: 'Downtown Dubai',
    location_ar: 'وسط البلد',
    image: '/images/hero-image-3.png',
    category: 'branded',
  },
  {
    id: 4,
    name: 'Luxury Tower',
    name_ar: 'برج فاخر',
    location: 'Business Bay',
    location_ar: 'خليج الأعمال',
    image: '/images/hero-image-4.png',
    category: 'luxury',
  },
  {
    id: 5,
    name: 'Premium Residences',
    name_ar: 'مساكن برميوم',
    location: 'JVC',
    location_ar: 'جميرا فيليج سركل',
    image: '/images/hero-image-5.png',
    category: 'premium',
  },
  {
    id: 6,
    name: 'Skyblade',
    name_ar: 'سكاي بليد',
    location: 'Downtown Dubai',
    location_ar: 'وسط البلد',
    image: '/images/hero-image.png',
    category: 'premium',
  },
];

export default function LuxuryProjects({ locale }: LuxuryProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const brandedProjects = projects.filter((p) => p.category === 'branded');
  const luxuryProjects = projects.filter((p) => p.category === 'luxury');
  const premiumProjects = projects.filter((p) => p.category === 'premium');

  const ProjectGrid = ({
    title,
    title_ar,
    items,
  }: {
    title: string;
    title_ar: string;
    items: Project[];
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="space-y-12 mb-24"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-baseline gap-6 border-b border-gray-900 pb-8"
      >
        <h2 className="text-4xl md:text-5xl font-light tracking-wide text-black">
          {locale === 'ar' ? title_ar : title}
        </h2>
        <span className="text-gray-500 font-light text-sm tracking-widest">
          {items.length} {locale === 'ar' ? 'مشاريع' : 'PROJECTS'}
        </span>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {items.map((project, index) => (
          <motion.div
            key={project.id}
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
            <div className="relative overflow-hidden h-[400px] md:h-[500px] bg-gray-100">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Image
                  src={project.image}
                  alt={locale === 'ar' ? project.name_ar : project.name}
                  fill
                  className="object-cover"
                  quality={85}
                />
              </motion.div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-white font-light text-sm tracking-widest"
                >
                  {locale === 'ar' ? 'اكتشف' : 'DISCOVER'}
                  <span>→</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Project Info */}
            <motion.div
              className="pt-6 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-light text-black group-hover:text-gray-600 transition-colors">
                {locale === 'ar' ? project.name_ar : project.name}
              </h3>
              <p className="text-sm text-gray-500 font-light tracking-wide">
                {locale === 'ar' ? project.location_ar : project.location}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 lg:py-40 bg-white"
      style={{
        backgroundImage:
          'radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.02) 0%, transparent 50%)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-32 md:space-y-48">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
              {locale === 'ar' ? 'مجموعتنا' : 'OUR COLLECTION'}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-0.5 bg-black"
            />
            <p className="text-lg text-gray-600 font-light max-w-2xl">
              {locale === 'ar'
                ? 'استكشف مشاريعنا الفاخرة والمتميزة'
                : 'Explore our exceptional collection of luxury real estate projects'}
            </p>
          </motion.div>

          {/* Branded Collection */}
          <ProjectGrid
            title="BRANDED LUXURY COLLECTION"
            title_ar="مجموعة العلامات الفاخرة"
            items={brandedProjects}
          />

          {/* Luxury Collection */}
          <ProjectGrid
            title="LUXURY COLLECTION"
            title_ar="المجموعة الفاخرة"
            items={luxuryProjects}
          />

          {/* Premium Collection */}
          <ProjectGrid
            title="PREMIUM COLLECTION"
            title_ar="المجموعة المميزة"
            items={premiumProjects}
          />
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center pt-24 md:pt-32"
        >
          <button className="group px-10 py-4 border border-black text-black font-light text-sm md:text-base tracking-widest hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden">
            <motion.span
              className="absolute inset-0 bg-black"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">
              {locale === 'ar' ? 'عرض الكل' : 'VIEW ALL PROJECTS'}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
