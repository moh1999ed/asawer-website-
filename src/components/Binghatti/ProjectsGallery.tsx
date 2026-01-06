'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  { id: 1, name: 'Desert Heights', location: 'الرياض', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { id: 2, name: 'Marina Bay', location: 'جدة', image: 'https://images.unsplash.com/photo-1613977257363-8383ee8a8232?w=600&q=80' },
  { id: 3, name: 'Royal Villas', location: 'الدمام', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd54340?w=600&q=80' },
  { id: 4, name: 'Sky Tower', location: 'الرياض', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' },
  { id: 5, name: 'Sunset Plaza', location: 'جدة', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { id: 6, name: 'Palace Residences', location: 'الخبر', image: 'https://images.unsplash.com/photo-1613977257363-8383ee8a8232?w=600&q=80' },
];

export default function ProjectsGallery() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light tracking-wider text-black mb-4">
            مشاريعنا
          </h2>
          <p className="text-lg font-light text-gray-600 tracking-wide">
            اكتشف محفظتنا المتنوعة
          </p>
        </motion.div>

        {/* Projects Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-light tracking-wider text-black">
                  {project.name}
                </h3>
                <p className="text-sm font-light text-gray-500 tracking-wide">
                  {project.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
