'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { allProjects } from '@/data/projects';

interface ProjectsGridProps {
  locale: string;
}

const projects = allProjects;

export default function ProjectsGrid({ locale }: ProjectsGridProps) {
  const t = useTranslations('projects');
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => 
    filter === 'all' || (project.type && project.type === filter)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'planning':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    if (locale === 'ar') {
      switch (status) {
        case 'completed':
          return 'مكتمل';
        case 'in_progress':
          return 'قيد التنفيذ';
        case 'planning':
          return 'قيد التخطيط';
        default:
          return '';
      }
    } else {
      switch (status) {
        case 'completed':
          return 'Completed';
        case 'in_progress':
          return 'In Progress';
        case 'planning':
          return 'Planning';
        default:
          return '';
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('all')}
        </button>
        <button
          onClick={() => setFilter('residential')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'residential'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('residential')}
        </button>
        <button
          onClick={() => setFilter('commercial')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'commercial'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('commercial')}
        </button>
        <button
          onClick={() => setFilter('mixed')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'mixed'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('mixed')}
        </button>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className="h-64 bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center relative">
                    <div className="text-8xl">{project.image}</div>
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(project.status)}`}
                      >
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {locale === 'ar' ? project.name_ar : project.name_en}
                    </h3>
                    {project.location_ar && project.location_en && (
                      <p className="text-gray-600 mb-4">
                        {locale === 'ar' ? project.location_ar : project.location_en}
                      </p>
                    )}
                    {project.price_from && (
                      <p className="text-asawer-primary-600 font-semibold mb-2">
                        {locale === 'ar' ? `من ${project.price_from} ريال` : `From ${project.price_from} OMR`}
                      </p>
                    )}
                    <div className="flex items-center text-teal-600 font-medium">
                      <span className={locale === 'ar' ? 'ml-2' : 'mr-2'}>
                        {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      </span>
                      <svg
                        className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

