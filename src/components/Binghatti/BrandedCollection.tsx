'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brandedProjects = [
  {
    id: 1,
    title: 'THE LUXURY COLLECTION',
    subtitle: 'ASAWER PREMIUM',
    description: 'مجموعة فاخرة من العقارات الحصرية',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 2,
    title: 'THE SKY COLLECTION',
    subtitle: 'ASAWER ELITE',
    description: 'تصاميم عصرية فاخرة',
    image: 'https://images.unsplash.com/photo-1613977257363-8383ee8a8232?w=800&q=80',
  },
  {
    id: 3,
    title: 'THE PRESTIGE COLLECTION',
    subtitle: 'ASAWER ICONIC',
    description: 'عقارات الخمس نجوم',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd54340?w=800&q=80',
  },
];

export default function BrandedCollection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light tracking-wider text-black mb-4">
            مجموعات فاخرة
          </h2>
          <p className="text-lg font-light text-gray-600 tracking-wide">
            استكشف أفضل عروضنا المميزة
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-96 overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-light tracking-wider text-black">
                  {project.title}
                </h3>
                <p className="text-sm font-light tracking-wider text-gray-500">
                  {project.subtitle}
                </p>
                <p className="text-sm font-light text-gray-600">
                  {project.description}
                </p>
              </div>

              {/* Link */}
              <button className="mt-6 text-xs font-light tracking-widest text-black hover:opacity-50 transition-opacity">
                اكتشف
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
