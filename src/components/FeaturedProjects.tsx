'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Building2, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { allProjects } from '@/data/projects';

interface FeaturedProjectsProps {
  locale: string;
}

const projects = allProjects;

export default function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // عرض أول 5 مشاريع فقط
  const featuredProjects = projects.slice(0, 5);

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
      }
    };

    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-unified mx-auto mb-6">
              <Building2 className="w-4 h-4" />
              <Sparkles className="w-4 h-4" />
              <span>{locale === 'ar' ? 'مشاريعنا المميزة' : 'Featured Projects'}</span>
            </div>
            
            <h2 className="mb-6">
              <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                {locale === 'ar' ? 'المشاريع' : 'Our Projects'}
              </span>
            </h2>
            
            <p>
              {locale === 'ar'
                ? 'استكشف مشاريعنا العقارية المتميزة المصممة للعائلات'
                : 'Explore our distinguished real estate projects designed for families'}
            </p>
          </motion.div>
        </div>

        {/* Slider Container */}
        <div className="relative mb-12">
          {/* Scroll Buttons */}
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
              }
            }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-6 h-6 text-asawer-primary-500" />
          </button>
          
          <button
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
              }
            }}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-6 h-6 text-asawer-primary-500" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={(e) => {
              const target = e.target as HTMLDivElement;
              setCanScrollLeft(target.scrollLeft > 0);
              setCanScrollRight(
                target.scrollLeft < target.scrollWidth - target.clientWidth - 10
              );
            }}
          >
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {featuredProjects.map((project, index) => (
                <div key={project.id} className="flex-shrink-0 w-[300px] md:w-[350px]">
                  <ProjectCard
                    project={project}
                    locale={locale}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="btn-unified btn-primary"
          >
            {locale === 'ar' ? 'عرض جميع المشاريع' : 'View All Projects'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
