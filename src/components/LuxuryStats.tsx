'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, Award, TrendingUp, Sparkles, UserCheck } from 'lucide-react';

interface Stat {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

interface LuxuryStatsProps {
  locale: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    id: 'projects',
    value: 8,
    label: 'Projects',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-asawer-primary-500 to-asawer-secondary-500',
    gradient: 'from-asawer-primary-500 via-asawer-primary-600 to-asawer-secondary-500',
  },
  {
    id: 'area',
    value: 50000,
    label: 'Area (sqm)',
    suffix: '+',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-asawer-secondary-500 to-asawer-primary-500',
    gradient: 'from-asawer-secondary-500 via-asawer-secondary-600 to-asawer-primary-500',
  },
  {
    id: 'clients',
    value: 1200,
    label: 'Clients',
    suffix: '+',
    icon: <Users className="w-8 h-8" />,
    color: 'from-asawer-primary-500 to-asawer-secondary-500',
    gradient: 'from-asawer-primary-600 via-asawer-secondary-500 to-asawer-secondary-600',
  },
  {
    id: 'customers',
    value: 5000,
    label: 'Customers',
    suffix: '+',
    icon: <UserCheck className="w-8 h-8" />,
    color: 'from-asawer-secondary-500 to-asawer-primary-500',
    gradient: 'from-asawer-secondary-600 via-asawer-primary-500 to-asawer-secondary-500',
  },
  {
    id: 'awards',
    value: 15,
    label: 'Awards',
    suffix: '+',
    icon: <Award className="w-8 h-8" />,
    color: 'from-asawer-primary-500 to-asawer-secondary-500',
    gradient: 'from-asawer-primary-600 via-asawer-secondary-500 to-asawer-secondary-600',
  },
];

export default function LuxuryStats({ locale, stats: initialStats }: LuxuryStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [stats, setStats] = useState<Stat[]>(initialStats || defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  // Debug: Log stats length
  React.useEffect(() => {
    console.log('LuxuryStats: Current stats count:', stats.length);
    console.log('LuxuryStats: Stats IDs:', stats.map(s => s.id));
  }, [stats]);

  useEffect(() => {
    // Fetch stats from API with cache-busting
    const fetchStats = async () => {
      try {
        // Force fresh fetch with timestamp and random number
        const timestamp = Date.now();
        const random = Math.random();
        const response = await fetch(`/api/admin/stats?t=${timestamp}&r=${random}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          const statistics = data.statistics;
          
          // Update stats with API data
          const newStats = [
            {
              ...defaultStats[0],
              value: statistics.totalProjects || defaultStats[0].value,
            },
            {
              ...defaultStats[1],
              value: statistics.totalArea || defaultStats[1].value,
            },
            {
              ...defaultStats[2],
              value: statistics.totalClients || defaultStats[2].value,
            },
            {
              ...defaultStats[3],
              value: statistics.totalCustomers || defaultStats[3].value,
            },
            {
              ...defaultStats[4],
              value: statistics.totalAwards || defaultStats[4].value,
            },
          ];
          
          setStats(newStats);
          setLastFetchTime(timestamp);
          console.log('Stats updated at:', new Date(timestamp).toLocaleTimeString());
        } else {
          // If API fails, use default stats
          console.warn('API response not OK, using default stats');
          setStats(defaultStats);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Use default stats on error
        setStats(defaultStats);
      } finally {
        setIsLoading(false);
      }
    };

    // Always fetch on mount/remount (every page refresh)
    fetchStats();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);
    
    // Also fetch on window focus (when user returns to tab)
    const handleFocus = () => {
      fetchStats();
    };
    
    // Fetch on visibility change (when tab becomes visible)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Empty dependency array ensures this runs on every mount

  const AnimatedCounter = ({ value, suffix = '', maxValue, gradient }: { value: number; suffix?: string; maxValue?: number; gradient: string }) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const prevValueRef = React.useRef(value);
    const animationFrameRef = React.useRef<number | null>(null);

    useEffect(() => {
      // Reset if value changed significantly (new data fetched)
      if (Math.abs(value - prevValueRef.current) > 0) {
        // Cancel any ongoing animation
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        if (!isInView) {
          // If not in view, set directly
          setDisplayValue(value);
          prevValueRef.current = value;
          return;
        }
        
        const start = prevValueRef.current;
        const end = value;
        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Enhanced easing function (easeOutCubic)
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (end - start) * easeOutCubic);
          
          setDisplayValue(current);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            setDisplayValue(end);
            prevValueRef.current = end;
            animationFrameRef.current = null;
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      }
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isInView, value]);

    const percentage = maxValue ? (value / maxValue) * 100 : 0;

    return (
      <div className="relative text-center">
        <motion.span 
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold block leading-none"
          style={{
            color: '#46868d',
          }}
        >
          {suffix && <span style={{ color: '#46868d' }}>{suffix}</span>}
          {displayValue.toLocaleString()}
        </motion.span>
        {maxValue && (
          <motion.div
            className="mt-2 h-1 bg-asawer-primary-200 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative pt-32 md:pt-40 lg:pt-48 pb-32 md:pb-40 lg:pb-48 overflow-hidden intersection-observer-target"
    >
      {/* Enhanced Luxury Background with Patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-asawer-primary-50/40 to-asawer-secondary-50/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(70,134,141,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(46,95,110,0.1),transparent_50%)]" />
      
      {/* Enhanced Decorative Elements */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(70, 134, 141, 0.15) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(46, 95, 110, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-asawer-primary-500/10 to-asawer-secondary-500/10 border border-asawer-secondary-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-asawer-secondary-500" />
              <span className="text-sm font-semibold text-asawer-secondary-500 uppercase tracking-wider">
                {locale === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
              </span>
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              locale === 'ar' ? 'font-arabic' : 'font-elegant'
            }`}>
              <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent bg-[length:200%_auto]">
                {locale === 'ar' ? 'الإحصائيات' : 'Statistics'}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-asawer-primary-600 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'أرقام تتحدث عن التميز والإنجاز' 
                : 'Numbers that speak of excellence and achievement'}
            </p>
          </motion.div>

          {/* Luxury Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.id}-${stat.value}-${lastFetchTime}`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
                className="group relative"
              >
                {/* Enhanced Luxury Card */}
                <div 
                  className="relative h-full rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 overflow-hidden group/card flex flex-col justify-end"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderColor: 'rgba(70, 134, 141, 0.2)',
                    boxShadow: '0 10px 40px rgba(70, 134, 141, 0.15), 0 0 0 1px rgba(70, 134, 141, 0.1)',
                    minHeight: '280px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(70, 134, 141, 0.25), 0 0 0 1px rgba(70, 134, 141, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(70, 134, 141, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(70, 134, 141, 0.15), 0 0 0 1px rgba(70, 134, 141, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(70, 134, 141, 0.2)';
                  }}
                >
                  {/* Enhanced Gradient Background on Hover */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.05) 0%, rgba(46, 95, 110, 0.05) 100%)',
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Decorative Corner with Brand Colors */}
                  <div 
                    className="absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-10"
                    style={{
                      background: 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)',
                    }}
                  />
                  
                  {/* Animated Background Pattern */}
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(70, 134, 141, 0.1) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                      }} 
                    />
                  </motion.div>

                  {/* Icon Container - Top Right Corner (Independent) */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      className="inline-flex items-center justify-center p-4 rounded-2xl text-white shadow-xl group-hover:shadow-2xl transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)',
                        boxShadow: '0 8px 24px rgba(70, 134, 141, 0.4), 0 0 20px rgba(70, 134, 141, 0.2)',
                        width: '64px',
                        height: '64px',
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.icon}
                    </motion.div>
                    {/* Enhanced Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(70, 134, 141, 0.4) 0%, rgba(46, 95, 110, 0.2) 100%)',
                        filter: 'blur(20px)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Content Container - Bottom Center */}
                  <div className="flex flex-col items-center justify-end mt-auto">
                    {/* Enhanced Counter - Centered */}
                    <div className="relative mb-4 text-center">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix}
                        maxValue={stat.id === 'area' ? 100000 : stat.id === 'clients' ? 2000 : stat.id === 'customers' ? 10000 : undefined}
                        gradient="from-asawer-primary-500 to-asawer-secondary-500"
                      />
                    </div>

                    {/* Enhanced Label - Centered */}
                    <p className={`text-base md:text-lg font-semibold leading-relaxed relative z-10 text-center ${
                      locale === 'ar' ? 'font-arabic' : 'font-sans'
                    }`}
                    style={{
                      color: '#2e5f6e',
                    }}>
                      {locale === 'ar' 
                        ? (stat.label === 'Projects' ? 'إجمالي عدد المشاريع' :
                           stat.label === 'Area (sqm)' ? 'متر مربع (إجمالي المساحات المطورة)' :
                           stat.label === 'Clients' ? 'مجموع الوحدات المطورة وقيد التطوير' :
                           stat.label === 'Customers' ? 'عدد العملاء' :
                           stat.label === 'Awards' ? 'مليون ريال إجمالي قيمة المشاريع' : stat.label)
                        : stat.label}
                    </p>
                  </div>

                  {/* Enhanced Bottom Accent Line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-2 rounded-b-3xl"
                    style={{
                      background: 'linear-gradient(90deg, #46868d 0%, #2e5f6e 100%)',
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileHover={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

