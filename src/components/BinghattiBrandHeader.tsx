'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  locale: string;
}

export default function BinghattiBrandHeader({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: locale === 'ar' ? 'الرئيسية' : 'HOME', id: 'home' },
    { href: '/luxury', label: locale === 'ar' ? 'المجموعة' : 'COLLECTION', id: 'collection' },
    { href: '/projects', label: locale === 'ar' ? 'المشاريع' : 'PROJECTS', id: 'projects' },
    { href: '/contact', label: locale === 'ar' ? 'التواصل' : 'CONTACT', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200/30 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="text-lg font-light tracking-widest text-black">
                {locale === 'ar' ? 'أساور' : 'ASAWER'}
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={item.href}
                  className={`relative font-light text-xs tracking-widest transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-800 hover:text-black'
                      : 'text-white drop-shadow-sm hover:text-white/80'
                  }`}
                >
                  {item.label}
                  
                  {/* Underline Animation */}
                  <motion.span
                    className={`absolute bottom-0 left-0 right-0 h-px ${
                      isScrolled ? 'bg-black' : 'bg-white'
                    }`}
                    initial={{ scaleX: 0, transformOrigin: locale === 'ar' ? 'right' : 'left' }}
                    animate={{ 
                      scaleX: hoveredLink === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <motion.button
              onClick={() => {
                const newLocale = locale === 'ar' ? 'en' : 'ar';
                window.location.href = newLocale === 'ar' ? '/ar' : '/en';
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded transition-all ${
                isScrolled
                  ? 'text-gray-700 hover:text-black'
                  : 'text-white hover:text-white/80'
              }`}
              title={locale === 'ar' ? 'English' : 'العربية'}
            >
              <Globe className="w-4 h-4" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className={`lg:hidden p-2 rounded ${
                isScrolled
                  ? 'text-gray-800'
                  : 'text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-gray-200/30"
          >
            <div className="container mx-auto px-4 lg:px-12 py-4">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 font-light text-xs tracking-widest text-gray-800 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
