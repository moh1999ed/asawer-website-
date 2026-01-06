'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function BinghattiBrandFooter() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-light tracking-widest text-white mb-6">
              ASAWER
            </h3>
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              شركة رائدة في تطوير العقارات الفاخرة والحصرية
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-light tracking-wider text-white mb-6 uppercase">
              الشركة
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  عن الشركة
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  المشاريع
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  الأخبار
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  الوظائف
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-sm font-light tracking-wider text-white mb-6 uppercase">
              استكشف
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  المجموعة الفاخرة
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  الإصدارات الجديدة
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  البحث في العقارات
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  الأحداث
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-light tracking-wider text-white mb-6 uppercase">
              التواصل
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs font-light text-gray-400">
            © 2025 ASAWER. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <Link href="#" className="text-xs font-light text-gray-400 hover:text-white transition-colors">
              الشروط والشروط
            </Link>
            <Link href="#" className="text-xs font-light text-gray-400 hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="text-xs font-light text-gray-400 hover:text-white transition-colors">
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
