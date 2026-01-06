'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
  { name: 'شريك 1', logo: '🏢' },
  { name: 'شريك 2', logo: '🏗️' },
  { name: 'شريك 3', logo: '🏘️' },
  { name: 'شريك 4', logo: '🏛️' },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            شركاء النجاح
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-5xl mb-4">{partner.logo}</div>
                <p className="text-gray-600 font-medium">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

