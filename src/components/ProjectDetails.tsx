'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, CheckCircle } from 'lucide-react';
import LeadForm from './LeadForm';

interface ProjectDetailsProps {
  projectId: string;
  locale: string;
}

// Mock project data - replace with actual data from Supabase
const projectData = {
  id: 1,
  name_ar: 'مشروع الخوير السكني',
  name_en: 'Khuwair Residential Project',
  description_ar: 'مجمع سكني عصري يتكون من فلل وشقق بمواصفات عالية الجودة',
  description_en: 'Modern residential complex consisting of villas and apartments with high-quality specifications',
  location_ar: 'الخوير، مسقط',
  location_en: 'Khuwair, Muscat',
  latitude: 23.6145,
  longitude: 58.5453,
  project_type: 'residential',
  status: 'completed',
  units_count: 120,
  delivery_date: '2024-12-31',
  amenities: ['مساحات خضراء', 'مواقف سيارات', 'أمن 24/7', 'صالة ألعاب', 'مسبح'],
  gallery_urls: ['🏘️', '🏢', '🌳'],
  video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  virtual_tour_url: 'https://my.matterport.com/show/?m=example',
};

export default function ProjectDetails({ projectId, locale }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'location'>('overview');

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image/Video */}
          <div className="h-96 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl mb-8 flex items-center justify-center">
            <div className="text-9xl">🏘️</div>
          </div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'ar' ? projectData.name_ar : projectData.name_en}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {locale === 'ar' ? projectData.description_ar : projectData.description_en}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <Building className="w-6 h-6 text-teal-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{projectData.units_count}</div>
                <div className="text-sm text-gray-600">
                  {locale === 'ar' ? 'وحدة سكنية' : 'Units'}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <Calendar className="w-6 h-6 text-teal-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {new Date(projectData.delivery_date).getFullYear()}
                </div>
                <div className="text-sm text-gray-600">
                  {locale === 'ar' ? 'تاريخ التسليم' : 'Delivery'}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <MapPin className="w-6 h-6 text-teal-600 mb-2" />
                <div className="text-sm text-gray-600">
                  {locale === 'ar' ? projectData.location_ar : projectData.location_en}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 space-x-reverse mb-6 border-b border-gray-200">
              {[
                { id: 'overview', label: locale === 'ar' ? 'نظرة عامة' : 'Overview' },
                { id: 'gallery', label: locale === 'ar' ? 'معرض الصور' : 'Gallery' },
                { id: 'location', label: locale === 'ar' ? 'الموقع' : 'Location' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {locale === 'ar' ? 'المرافق' : 'Amenities'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {projectData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Virtual Tour */}
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {locale === 'ar' ? 'الجولة الافتراضية 360°' : '360° Virtual Tour'}
                    </h3>
                    <a
                      href={projectData.virtual_tour_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all"
                    >
                      {locale === 'ar' ? 'ابدأ الجولة الافتراضية' : 'Start Virtual Tour'}
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {projectData.gallery_urls.map((url, index) => (
                    <div
                      key={index}
                      className="h-48 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center text-6xl"
                    >
                      {url}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'location' && (
                <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-600">
                    {locale === 'ar' ? 'خريطة Google ستظهر هنا' : 'Google Map will appear here'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar - Lead Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <LeadForm projectId={projectId} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}

