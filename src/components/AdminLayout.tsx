'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  User,
  ImagePlus,
  BarChart,
  Shield,
  Home,
  Users,
  Eye,
  Heart,
  Newspaper,
  Sparkles,
  ChevronDown,
  LogOut,
  FileText,
} from 'lucide-react';

interface AdminUser {
  email?: string;
  name?: string;
  role?: string;
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  section: string;
  category: 'main' | 'content' | 'projects' | 'media' | 'contact';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'ar';

  // Update current section when pathname or search params change
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname?.includes('/content')) {
      const params = new URLSearchParams(window.location.search);
      setCurrentSection(params.get('section'));
    } else {
      setCurrentSection(null);
    }
  }, [pathname]);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Check authentication
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      
      // Skip auth check for login page
      if (pathname?.includes('/admin/login')) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      // Try to get user info from localStorage first
      let storedUser: string | null = null;
      try {
        storedUser = localStorage.getItem('admin-user');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            setAdminUser(user);
            setIsAuthenticated(true);
          } catch {
            // Invalid JSON, clear it
            localStorage.removeItem('admin-user');
            storedUser = null;
          }
        }
      } catch (e) {
        // localStorage not available
        console.warn('localStorage not available');
      }

      // Also try to get from API
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setAdminUser(data.user);
            setIsAuthenticated(true);
            try {
              localStorage.setItem('admin-user', JSON.stringify(data.user));
            } catch (e) {
              // localStorage not available
            }
          } else {
            setIsAuthenticated(false);
            // Only redirect if we're sure user is not authenticated
            if (!storedUser && !pathname?.includes('/admin/login')) {
              const currentLocale = pathname?.split('/')[1] || 'ar';
              router.push(`/${currentLocale}/admin/login`);
            }
          }
        } else {
          setIsAuthenticated(false);
          if (!storedUser && !pathname?.includes('/admin/login')) {
            const currentLocale = pathname?.split('/')[1] || 'ar';
            router.push(`/${currentLocale}/admin/login`);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // If API fails, check localStorage
        if (storedUser) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Only redirect if we're sure user is not authenticated
          if (!pathname?.includes('/admin/login')) {
            const currentLocale = pathname?.split('/')[1] || 'ar';
            router.push(`/${currentLocale}/admin/login`);
          }
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  // قائمة مرتبة بناءً على أقسام الموقع الرئيسي
  const menuItems: MenuItem[] = [
    // الرئيسية
    { 
      name: 'لوحة التحكم', 
      href: `/${locale}/admin/dashboard`, 
      icon: LayoutDashboard,
      section: 'dashboard',
      category: 'main',
    },
    // المحتوى - أقسام الموقع
    { 
      name: 'البطل الرئيسي', 
      href: `/${locale}/admin/content?section=hero`, 
      icon: Sparkles,
      section: 'hero',
      category: 'content',
    },
    { 
      name: 'من نحن', 
      href: `/${locale}/admin/content?section=about`, 
      icon: Home,
      section: 'about',
      category: 'content',
    },
    { 
      name: 'كلمة الرئيس التنفيذي', 
      href: `/${locale}/admin/content?section=ceo`, 
      icon: User,
      section: 'ceo',
      category: 'content',
    },
    { 
      name: 'الفريق', 
      href: `/${locale}/admin/content?section=team`, 
      icon: Users,
      section: 'team',
      category: 'content',
    },
    { 
      name: 'الرؤية', 
      href: `/${locale}/admin/content?section=vision`, 
      icon: Eye,
      section: 'vision',
      category: 'content',
    },
    { 
      name: 'القيم', 
      href: `/${locale}/admin/content?section=values`, 
      icon: Heart,
      section: 'values',
      category: 'content',
    },
    { 
      name: 'الأخبار', 
      href: `/${locale}/admin/content?section=news`, 
      icon: Newspaper,
      section: 'news',
      category: 'content',
    },
    // المشاريع والإحصائيات
    { 
      name: 'المشاريع', 
      href: `/${locale}/admin/projects`, 
      icon: Building2,
      section: 'projects',
      category: 'projects',
    },
    { 
      name: 'الإحصائيات', 
      href: `/${locale}/admin/statistics`, 
      icon: BarChart,
      section: 'stats',
      category: 'projects',
    },
    // الوسائط
    { 
      name: 'الصور', 
      href: `/${locale}/admin/images`, 
      icon: ImagePlus,
      section: 'images',
      category: 'media',
    },
    // التواصل
    { 
      name: 'التواصل', 
      href: `/${locale}/admin/contact`, 
      icon: MessageSquare,
      section: 'contact',
      category: 'contact',
    },
  ];

  const isActive = (href: string) => {
    if (pathname === href) return true;
    // Check if it's a content section match
    if (href.includes('/content?section=')) {
      const section = href.split('section=')[1];
      return pathname?.includes('/content') && currentSection === section;
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      localStorage.removeItem('admin-user');
      setIsAuthenticated(false);
      setAdminUser(null);
      router.push(`/${locale}/admin/login`);
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('admin-user');
      setIsAuthenticated(false);
      setAdminUser(null);
      router.push(`/${locale}/admin/login`);
    }
  };

  // Show loading state while checking auth
  if (isCheckingAuth && !pathname?.includes('/admin/login')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-asawer-accent-500/20 border-t-asawer-accent-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-asawer-accent-600 font-medium">جاري التحقق من المصادقة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          {/* Top Row - Logo and User */}
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${locale}/admin/dashboard`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asawer-accent-500 to-asawer-accent-600 flex items-center justify-center font-bold text-lg group-hover:from-asawer-accent-400 group-hover:to-asawer-accent-500 transition-all shadow-lg border border-asawer-accent-400/30">
                <Shield className="text-white" size={20} />
              </div>
              <span className="font-black text-xl text-asawer-accent-600">أساور</span>
            </Link>
            
            {/* User Info */}
            {isAuthenticated && adminUser && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-asawer-accent-50 to-asawer-accent-100 rounded-lg border border-asawer-accent-300/50 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-asawer-accent-500 to-asawer-accent-600 flex items-center justify-center shadow-md">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-asawer-accent-700">
                      {adminUser.name || 'مدير النظام'}
                    </p>
                    <p className="text-xs text-asawer-accent-600">
                      {adminUser.email || 'admin@asawer.om'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 hover:bg-red-50 rounded-lg transition-all border border-red-200 hover:border-red-300 text-red-600"
                  title="تسجيل الخروج"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-2 flex-wrap">
            {/* Dashboard */}
            {menuItems.filter(item => item.category === 'main').map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    active
                      ? 'bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white shadow-md'
                      : 'bg-gray-100 text-asawer-accent-700 hover:bg-asawer-accent-50 hover:text-asawer-accent-600'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Content Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'content' ? null : 'content')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  pathname?.includes('/content')
                    ? 'bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white shadow-md'
                    : 'bg-gray-100 text-asawer-accent-700 hover:bg-asawer-accent-50 hover:text-asawer-accent-600'
                }`}
              >
                <FileText size={16} />
                <span>المحتوى</span>
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'content' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'content' && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {menuItems.filter(item => item.category === 'content').map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`flex items-center gap-3 px-4 py-2.5 transition-all text-sm ${
                          active
                            ? 'bg-asawer-accent-50 text-asawer-accent-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'projects' ? null : 'projects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  pathname?.includes('/projects') || pathname?.includes('/statistics')
                    ? 'bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white shadow-md'
                    : 'bg-gray-100 text-asawer-accent-700 hover:bg-asawer-accent-50 hover:text-asawer-accent-600'
                }`}
              >
                <Building2 size={16} />
                <span>المشاريع</span>
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'projects' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {menuItems.filter(item => item.category === 'projects').map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`flex items-center gap-3 px-4 py-2.5 transition-all text-sm ${
                          active
                            ? 'bg-asawer-accent-50 text-asawer-accent-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Media */}
            {menuItems.filter(item => item.category === 'media').map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    active
                      ? 'bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white shadow-md'
                      : 'bg-gray-100 text-asawer-accent-700 hover:bg-asawer-accent-50 hover:text-asawer-accent-600'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Contact */}
            {menuItems.filter(item => item.category === 'contact').map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    active
                      ? 'bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white shadow-md'
                      : 'bg-gray-100 text-asawer-accent-700 hover:bg-asawer-accent-50 hover:text-asawer-accent-600'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}
