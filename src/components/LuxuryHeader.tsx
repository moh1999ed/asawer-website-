'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface LuxuryHeaderProps {
  locale: string;
}

export default function LuxuryHeader({ locale }: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Active section highlighting
      const sections = ['values', 'stats', 'news', 'contact'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hash = href.split('#')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setIsMobileMenuOpen(false);
      }
    } else {
      window.location.href = href;
    }
  };

  const navItems = [
    { href: `/${locale}`, label: locale === 'ar' ? 'الرئيسية' : 'Home', section: '' },
    { href: `/${locale}#values`, label: locale === 'ar' ? 'الرؤية والرسالة' : 'Vision & Mission', section: 'values' },
    { href: `/${locale}#stats`, label: locale === 'ar' ? 'الإحصائيات' : 'Stats', section: 'stats' },
    { href: `/${locale}#news`, label: locale === 'ar' ? 'الأخبار' : 'News', section: 'news' },
    { href: `/${locale}#contact`, label: locale === 'ar' ? 'تواصل معنا' : 'Contact', section: 'contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(15px) saturate(180%)',
        WebkitBackdropFilter: 'blur(15px) saturate(180%)',
        boxShadow: '0 8px 32px 0 rgba(70, 134, 141, 0.1)',
        borderBottom: '1px solid rgba(70, 134, 141, 0.15)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="relative h-12 sm:h-14 md:h-16 w-auto">
                <Image
                  src="/images/asawer-logo-vertical.png"
                  alt={locale === 'ar' ? 'شعار أساور' : 'Asawer Logo'}
                  width={120}
                  height={80}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.section || (item.section === '' && activeSection === '');
              return (
                <div key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="relative group px-5 xl:px-7"
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span
                      className={`text-sm xl:text-base font-medium transition-colors duration-300 inline-block ${
                        isActive
                          ? 'text-asawer-secondary-500'
                          : 'text-asawer-primary-600 group-hover:text-asawer-secondary-500'
                      }`}
                    >
                      {item.label}
                    </span>
                    {(activeDropdown === item.href || isActive) && (
                      <div className="absolute -bottom-1 left-5 xl:left-7 right-5 xl:right-7 h-0.5 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 rounded-full" />
                    )}
                  </Link>
                  {/* Clear Divider between items (except last) */}
                  {index < navItems.length - 1 && (
                    <div 
                      className="h-8 w-0.5 mx-3 xl:mx-4"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(70, 134, 141, 0.3) 20%, rgba(70, 134, 141, 0.5) 50%, rgba(70, 134, 141, 0.3) 80%, transparent 100%)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link
              href={locale === 'ar' ? (pathname?.replace('/ar', '/en') || '/en') : (pathname?.replace('/en', '/ar') || '/ar')}
              className="px-4 py-2 rounded-lg bg-asawer-primary-50 text-sm font-medium text-asawer-primary-600 hover:bg-asawer-primary-100 transition-colors border border-asawer-primary-200"
            >
              {locale === 'ar' ? 'EN' : 'AR'}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-asawer-primary-50 hover:bg-asawer-primary-100 transition-colors border border-asawer-primary-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-asawer-primary-600" />
              ) : (
                <Menu className="w-6 h-6 text-asawer-primary-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden border-t"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(15px) saturate(180%)',
              WebkitBackdropFilter: 'blur(15px) saturate(180%)',
              borderTopColor: 'rgba(70, 134, 141, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(70, 134, 141, 0.1)',
            }}
          >
            <nav className="container mx-auto px-4 py-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.section;
                return (
                  <div key={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                        className={`block py-4 px-5 rounded-lg transition-colors duration-300 ${
                          isActive
                            ? 'bg-asawer-primary-100 text-asawer-secondary-500 font-semibold'
                            : 'text-asawer-primary-600 hover:text-asawer-secondary-500 hover:bg-asawer-primary-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                    {/* Clear Divider between items (except last) */}
                    {index < navItems.length - 1 && (
                      <div 
                        className="h-px my-2 mx-4"
                        style={{
                          background: 'linear-gradient(to right, transparent 0%, rgba(70, 134, 141, 0.2) 20%, rgba(70, 134, 141, 0.4) 50%, rgba(70, 134, 141, 0.2) 80%, transparent 100%)',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

