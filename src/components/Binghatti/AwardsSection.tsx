'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const awards = [
  { id: 1, name: 'Award 1', image: 'https://via.placeholder.com/120x60?text=Award1' },
  { id: 2, name: 'Award 2', image: 'https://via.placeholder.com/120x60?text=Award2' },
  { id: 3, name: 'Award 3', image: 'https://via.placeholder.com/120x60?text=Award3' },
  { id: 4, name: 'Award 4', image: 'https://via.placeholder.com/120x60?text=Award4' },
  { id: 5, name: 'Award 5', image: 'https://via.placeholder.com/120x60?text=Award5' },
  { id: 6, name: 'Award 6', image: 'https://via.placeholder.com/120x60?text=Award6' },
];

export default function AwardsSection() {
  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-light tracking-wider text-black mb-4">
            الجوائز والاعترافات
          </h2>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center h-24"
            >
              <div className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={award.image}
                  alt={award.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
