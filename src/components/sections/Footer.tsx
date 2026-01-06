'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Instagram, Sparkles, Settings } from 'lucide-react';
import Image from 'next/image';

// Meta Logo Component (New Meta Logo - Infinity Symbol ∞)
const MetaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
    <path d="M16 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" transform="translate(-8 0)"/>
  </svg>
);

// X (Twitter) Logo Component (New X Logo)
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('nav');

  return (
    <footer className="bg-white relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-asawer-secondary-500 to-transparent z-10" />

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          {/* Social Links */}
              <div>
            <div className="flex gap-3 justify-center">
              {/* Meta (Facebook) */}
                <motion.a
                href="#"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl bg-asawer-primary-50 flex items-center justify-center transition-all hover:bg-asawer-primary-100 shadow-lg border border-asawer-primary-200"
                style={{
                  color: '#46868d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2e5f6e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#46868d';
                }}
              >
                <MetaIcon className="w-5 h-5" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl bg-asawer-primary-50 flex items-center justify-center transition-all hover:bg-asawer-primary-100 shadow-lg border border-asawer-primary-200"
                style={{
                  color: '#46868d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2e5f6e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#46868d';
                }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>

              {/* X (Twitter) */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl bg-asawer-primary-50 flex items-center justify-center transition-all hover:bg-asawer-primary-100 shadow-lg border border-asawer-primary-200"
                style={{
                  color: '#46868d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2e5f6e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#46868d';
                }}
              >
                <XIcon className="w-5 h-5" />
              </motion.a>
                </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-asawer-primary-300 to-transparent mb-10" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Admin Panel Link - Left */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={`/${locale}/admin/login`}
              className="flex items-center justify-center w-10 h-10 text-asawer-primary-600 hover:text-asawer-primary-700 transition-colors rounded-lg hover:bg-asawer-primary-50"
              title={locale === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
            >
              <Settings size={20} className="text-asawer-primary-500" />
            </a>
          </motion.div>

          {/* Copyright - Center/Right */}
          <div className="text-center md:text-right text-asawer-primary-900 text-sm font-semibold">
            &copy; {new Date().getFullYear()} {locale === 'ar' ? 'شركة أساور للتطوير العقاري' : 'Asawer Real Estate'}.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </div>
        </div>
      </div>
    </footer>
  );
}
