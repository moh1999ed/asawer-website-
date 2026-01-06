'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ConnectSection() {
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
            تواصل معنا
          </h2>
          <p className="text-lg font-light text-gray-600">
            استكشف مشاريعنا الحصرية واحصل على معلومات مفصلة
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
          {/* Find Boutique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="text-6xl font-light text-black">📍</div>
            </div>
            <h3 className="text-xl font-light tracking-wider text-black mb-3">
              أوجدنا
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              زر مكاتبنا في جميع أنحاء المملكة
            </p>
            <button className="text-xs font-light tracking-widest text-black border-b border-black pb-2 hover:opacity-60 transition-opacity">
              ابحث عن مكتب
            </button>
          </motion.div>

          {/* Discover Collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="text-6xl font-light text-black">🏠</div>
            </div>
            <h3 className="text-xl font-light tracking-wider text-black mb-3">
              المجموعة
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              اكتشف محفظتنا الفاخرة الكاملة
            </p>
            <button className="text-xs font-light tracking-widest text-black border-b border-black pb-2 hover:opacity-60 transition-opacity">
              استكشف
            </button>
          </motion.div>

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="text-6xl font-light text-black">💬</div>
            </div>
            <h3 className="text-xl font-light tracking-wider text-black mb-3">
              تواصل
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              تحدث معنا عبر واتس أب
            </p>
            <button className="text-xs font-light tracking-widest text-black border-b border-black pb-2 hover:opacity-60 transition-opacity">
              الدردشة الآن
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
