'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import AboutModal from './AboutModal';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    window.location.href = pathname.replace(`/${locale}`, `/${newLocale}`);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-luxury py-3 sm:py-4 border-b border-gray-200/50'
          : 'bg-transparent py-4 sm:py-5 md:py-6'
      }`}
      style={{
        background: isScrolled 
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.95) 100%)'
          : 'transparent',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="relative h-10 sm:h-12 md:h-14 lg:h-16 flex items-center">
                <Image
                  src="/images/asawer-logo-vertical.png"
                  alt="أساور للتطوير العقاري"
                  width={120}
                  height={64}
                  className="object-contain h-full w-auto"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                />
              </div>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: t('home'), isModal: false },
              { href: pathname === '/' || pathname === '/ar' || pathname === '/en' ? '#' : '/about', label: t('about'), isModal: pathname === '/' || pathname === '/ar' || pathname === '/en' },
              { href: '/projects', label: t('projects'), isModal: false },
              { href: '/contact', label: t('contact'), isModal: false },
            ].map((item) => {
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (item.isModal) {
                  e.preventDefault();
                  setIsAboutModalOpen(true);
                } else if (item.href.startsWith('#')) {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              };
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClick}
                className={`relative font-semibold text-sm lg:text-base transition-all duration-200 ${
                  isScrolled
                    ? 'hover:text-asawer-primary-500'
                    : 'text-white hover:text-white/90 drop-shadow-lg'
                }`}
                style={isScrolled ? { color: '#27505e' } : {}}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                  />
                </Link>
              );
            })}
            <motion.button
              onClick={toggleLocale}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2.5 rounded-lg transition-all ${
                isScrolled
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleLocale}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        <motion.nav
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="mt-4 pb-4 bg-white/98 backdrop-blur-xl rounded-xl shadow-unified-lg border border-gray-200">
            <div className="flex flex-col space-y-1 p-2">
              {[
                { href: '/', label: t('home'), isModal: false },
                { href: pathname === '/' || pathname === '/ar' || pathname === '/en' ? '#' : '/about', label: t('about'), isModal: pathname === '/' || pathname === '/ar' || pathname === '/en' },
                { href: '/projects', label: t('projects'), isModal: false },
                { href: '/contact', label: t('contact'), isModal: false },
              ].map((item, index) => {
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  setIsMobileMenuOpen(false);
                  if (item.isModal) {
                    e.preventDefault();
                    setIsAboutModalOpen(true);
                  } else if (item.href.startsWith('#')) {
                    e.preventDefault();
                    setTimeout(() => {
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }
                };
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 font-semibold text-sm hover:bg-gray-50 hover:text-asawer-primary-500 rounded-lg transition-all"
                      style={{ color: '#27505e' }}
                      onClick={handleClick}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.nav>
      </div>
      
      {/* About Modal */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        locale={locale} 
      />
    </motion.header>
  );
}
