'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function BinghattiBrandHeader({ locale }: { locale: string }) {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: locale === 'ar' ? 'الرئيسية' : 'HOME' },
    { href: '#', label: locale === 'ar' ? 'المجموعة' : 'COLLECTION' },
    { href: '#', label: locale === 'ar' ? 'المشاريع' : 'PROJECTS' },
    { href: '#', label: locale === 'ar' ? 'نبذة' : 'ABOUT' },
    { href: '#', label: locale === 'ar' ? 'التواصل' : 'CONTACT' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white border-b border-gray-100'
          : 'bg-white/70 backdrop-blur-md'
      }`}
      style={{ height: '80px' }}
    >
      <div className="h-full flex items-center justify-between px-8 lg:px-16 max-w-full">
        {/* Logo */}
        <Link href="/" className="text-xl font-light tracking-widest text-black">
          ASAWER
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-light tracking-wider text-black hover:opacity-60 transition-opacity duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 py-4"
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-8 py-3 text-sm font-light tracking-wider text-black hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
