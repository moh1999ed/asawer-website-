'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import AboutModal from './AboutModal';

interface HeaderProps {
  locale: string;
}

export default function ModernHeader({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    window.location.href = pathname.replace(`/${locale}`, `/${newLocale}`);
  };

  const navItems = [
    { href: '/', label: t('home'), id: 'home' },
    { href: '#', label: t('about'), id: 'about', isModal: true },
    { href: '/projects', label: t('projects'), id: 'projects' },
    { href: '/contact', label: t('contact'), id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 sm:py-4' 
            : 'py-6 sm:py-8'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.95) 100%)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled 
            ? '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)' 
            : 'none',
          borderBottom: isScrolled ? '1px solid rgba(200, 200, 200, 0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="relative h-10 sm:h-12 lg:h-14 flex items-center">
                  <Image
                    src="/images/asawer-logo-vertical.png"
                    alt="أساور للتطوير العقاري"
                    width={140}
                    height={70}
                    className="object-contain h-full w-auto drop-shadow-sm"
                    priority
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 140px"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
                  onMouseEnter={() => setHoveredLink(item.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (item.isModal) {
                        e.preventDefault();
                        setIsAboutModalOpen(true);
                      }
                    }}
                    className={`relative px-5 py-3 font-semibold text-sm transition-all duration-300 group ${
                      isScrolled
                        ? 'text-gray-800 hover:text-asawer-primary-500'
                        : 'text-white/90 hover:text-white drop-shadow-md'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Animated Underline */}
                    <motion.span
                      className={`absolute bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500`}
                      initial={{ scaleX: 0, transformOrigin: locale === 'ar' ? 'right' : 'left' }}
                      animate={{ 
                        scaleX: hoveredLink === item.id ? 1 : 0,
                        opacity: hoveredLink === item.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                    
                    {/* Glow Effect */}
                    <motion.span
                      className={`absolute inset-0 rounded-lg`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredLink === item.id ? 0.1 : 0,
                        scale: hoveredLink === item.id ? 1.2 : 1
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(46, 94, 110, 0.2), rgba(69, 133, 140, 0.2))'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-6">
              {/* Language Switcher */}
              <motion.button
                onClick={toggleLocale}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gray-100/80 text-gray-700 hover:bg-gray-200 hover:text-asawer-primary-500'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
                title={locale === 'ar' ? 'English' : 'العربية'}
              >
                <Globe className="w-5 h-5" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className={`lg:hidden p-2.5 rounded-xl transition-all ${
                  isScrolled
                    ? 'bg-gray-100/80 text-gray-700'
                    : 'bg-white/20 text-white backdrop-blur-sm'
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
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                    >
                      <Menu className="w-6 h-6" />
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
              className="lg:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-4 space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            if (item.isModal) {
                              e.preventDefault();
                              setIsAboutModalOpen(true);
                            }
                          }}
                          className="block px-5 py-3 font-semibold text-gray-800 hover:text-asawer-primary-500 rounded-xl hover:bg-asawer-primary-50 transition-all duration-200 group"
                        >
                          <span className="flex items-center gap-3">
                            {item.label}
                            <motion.span
                              className="opacity-0 group-hover:opacity-100"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* About Modal */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        locale={locale} 
      />
    </>
  );
}
