'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar, Home, Users, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    name_ar: string;
    name_en: string;
    price_from: string;
    is_freehold: boolean;
    completion: string;
    unit_types: string;
    ideal_for: string;
    amenities?: string[];
    image: string;
  };
  locale: string;
  index: number;
}

export default function ProjectCard({ project, locale, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="card-unified h-full flex flex-col">
        <div className="relative h-56 rounded-xl overflow-hidden bg-gradient-to-br from-asawer-primary-500/10 via-asawer-secondary-500/10 to-asawer-primary-500/10 mb-6 flex items-center justify-center">
          <div className="text-7xl opacity-20">{project.image}</div>
          
          {project.is_freehold && (
            <div className="absolute top-4 right-4">
              <div className="badge-unified bg-gradient-to-r from-asawer-secondary-500 to-asawer-secondary-600 text-white border-none">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold">
                  {locale === 'ar' ? 'ملكية حرة' : 'FREEHOLD'}
                </span>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-unified">
              <div className="text-xs text-gray-600 font-semibold mb-0.5">
                {locale === 'ar' ? 'من' : 'From'}
              </div>
              <div className="text-2xl font-black bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent">
                {project.price_from}
              </div>
              <div className="text-xs text-gray-600 font-semibold">
                {locale === 'ar' ? 'ريال' : 'OMR'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {locale === 'ar' ? project.name_ar : project.name_en}
          </h3>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-asawer-primary-500" />
              <span className="font-semibold">{project.completion}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Home className="w-4 h-4 text-asawer-primary-500" />
              <span className="line-clamp-1 font-semibold">{project.unit_types}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Users className="w-4 h-4 text-asawer-primary-500" />
              <span className="font-semibold">{project.ideal_for}</span>
            </div>
          </div>

          {project.amenities && project.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.amenities.slice(0, 3).map((amenity, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="btn-unified btn-primary w-full justify-center"
          >
            {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
