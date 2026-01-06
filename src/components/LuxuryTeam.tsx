'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Phone, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  nameAr?: string;
  role: string;
  roleAr?: string;
  image: string;
  bio?: string;
  bioAr?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
}

interface LuxuryTeamProps {
  locale: string;
  members?: TeamMember[];
}

const defaultMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Osama Al-Kindi',
    nameAr: 'أسامة الكندي',
    role: 'Operations Manager',
    roleAr: 'مدير العمليات',
    image: '/images/team/osama-al-kindi.jpg',
    bio: 'Operations Manager',
    bioAr: 'مدير العمليات',
    linkedin: '#',
    email: 'osama@asawer.com',
  },
  {
    id: '2',
    name: 'Haitham Al-Harmali',
    nameAr: 'هيثم الحرملي',
    role: 'Operations Assistant',
    roleAr: 'مساعد قسم العمليات',
    image: '/images/team/haitham-al-harmali.jpg',
    bio: 'Operations Assistant',
    bioAr: 'مساعد قسم العمليات',
    linkedin: '#',
    email: 'haitham@asawer.com',
  },
  {
    id: '3',
    name: 'Mundhir Al-Khusaibi',
    nameAr: 'منذر الخصيبي',
    role: 'Sales',
    roleAr: 'مبيعات',
    image: '/images/team/default.jpg',
    bio: 'Sales Representative',
    bioAr: 'مندوب مبيعات',
    linkedin: '#',
    email: 'mundhir@asawer.com',
  },
  {
    id: '4',
    name: 'Al-Baraa Al-Mahrooqi',
    nameAr: 'البراء المحروقي',
    role: 'Sales',
    roleAr: 'مبيعات',
    image: '/images/team/default.jpg',
    bio: 'Sales Representative',
    bioAr: 'مندوب مبيعات',
    linkedin: '#',
    email: 'albaraa@asawer.com',
  },
  {
    id: '5',
    name: 'Asma Al-Balushi',
    nameAr: 'أسماء البلوشية',
    role: 'Sales',
    roleAr: 'مبيعات',
    image: '/images/team/default.jpg',
    bio: 'Sales Representative',
    bioAr: 'مندوبة مبيعات',
    linkedin: '#',
    email: 'asma@asawer.com',
  },
  {
    id: '6',
    name: 'Safa Al-Mahrooqi',
    nameAr: 'صفاء المحروقي',
    role: 'Sales',
    roleAr: 'مبيعات',
    image: '/images/team/default.jpg',
    bio: 'Sales Representative',
    bioAr: 'مندوبة مبيعات',
    linkedin: '#',
    email: 'safa@asawer.com',
  },
  {
    id: '7',
    name: 'Fatima Al-Alawi',
    nameAr: 'فاطمة العلوي',
    role: 'Marketing Manager',
    roleAr: 'رئيسة قسم الماركتنج',
    image: '/images/team/default.jpg',
    bio: 'Marketing Manager',
    bioAr: 'رئيسة قسم الماركتنج',
    linkedin: '#',
    email: 'fatima@asawer.com',
  },
  {
    id: '8',
    name: 'Mohammed Al-Sawafi',
    nameAr: 'محمد الصوافي',
    role: 'Media & Marketing Specialist',
    roleAr: 'اخصائي اعلام وتسويق',
    image: '/images/team/mohammed-al-sawafi.jpg',
    bio: 'Media & Marketing Specialist',
    bioAr: 'اخصائي اعلام وتسويق',
    linkedin: '#',
    email: 'mohammed@asawer.com',
  },
  {
    id: '9',
    name: 'Salem Al-Rahbi',
    nameAr: 'سالم الرحبي',
    role: 'Facilities Management',
    roleAr: 'ادارة منشئات',
    image: '/images/team/default.jpg',
    bio: 'Facilities Management',
    bioAr: 'ادارة منشئات',
    linkedin: '#',
    email: 'salem@asawer.com',
  },
  {
    id: '10',
    name: 'Laith Al-Shabibi',
    nameAr: 'ليث الشبيبي',
    role: 'Facilities Management',
    roleAr: 'ادارة منشئات',
    image: '/images/team/default.jpg',
    bio: 'Facilities Management',
    bioAr: 'ادارة منشئات',
    linkedin: '#',
    email: 'laith@asawer.com',
  },
  {
    id: '11',
    name: 'Shaima Al-Wahibi',
    nameAr: 'شيماء الوهيبي',
    role: 'Facilities Management',
    roleAr: 'ادارة منشئات',
    image: '/images/team/default.jpg',
    bio: 'Facilities Management',
    bioAr: 'ادارة منشئات',
    linkedin: '#',
    email: 'shaima@asawer.com',
  },
  {
    id: '12',
    name: 'Farha Al-Eisari',
    nameAr: 'فرحة العيسري',
    role: 'Accounting Executive',
    roleAr: 'تنفيذي محاسبة',
    image: '/images/team/default.jpg',
    bio: 'Accounting Executive',
    bioAr: 'تنفيذي محاسبة',
    linkedin: '#',
    email: 'farha@asawer.com',
  },
  {
    id: '13',
    name: 'Buthaina Al-Siyabi',
    nameAr: 'بثينة السيابية',
    role: 'Accountant',
    roleAr: 'محاسبة',
    image: '/images/team/default.jpg',
    bio: 'Accountant',
    bioAr: 'محاسبة',
    linkedin: '#',
    email: 'buthaina@asawer.com',
  },
  {
    id: '14',
    name: 'Jasim Al-Aghbari',
    nameAr: 'جاسم الاغبري',
    role: 'Social Relations Manager',
    roleAr: 'مدير علاقات اجتماعية',
    image: '/images/team/default.jpg',
    bio: 'Social Relations Manager',
    bioAr: 'مدير علاقات اجتماعية',
    linkedin: '#',
    email: 'jasim@asawer.com',
  },
];

export default function LuxuryTeam({ locale, members: initialMembers }: LuxuryTeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [members, setMembers] = useState<TeamMember[]>(initialMembers || defaultMembers);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    // Fetch team members from API if available
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/admin/agents');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Transform agents to team members format
            const transformedMembers = data.data.map((agent: any, index: number) => ({
              id: agent.id || `agent-${index}`,
              name: agent.name || `Agent ${index + 1}`,
              nameAr: agent.name || `وكيل ${index + 1}`,
              role: 'Real Estate Agent',
              roleAr: 'وكيل عقاري',
              image: '/images/team/default.jpg',
              bio: 'Professional real estate agent',
              bioAr: 'وكيل عقاري محترف',
              email: agent.email,
              phone: agent.phone,
            }));
            setMembers(transformedMembers.length > 0 ? transformedMembers : defaultMembers);
          }
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        setMembers(defaultMembers);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    // Update scroll button states
    const updateScrollButtons = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
      }
    };

    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [members]);

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative pt-32 md:pt-40 lg:pt-48 pb-32 md:pb-40 lg:pb-48 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-asawer-primary-50 to-white" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              locale === 'ar' ? 'font-arabic' : 'font-elegant'
            }`}>
              <span className="bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent font-bold">
                {locale === 'ar' ? 'فريق من الخبراء المتفانين في بناء المستقبل' : 'A Team of Dedicated Experts Building the Future'}
              </span>
            </h2>
            <div className="mt-8">
              <div className="inline-flex items-center justify-center px-6 py-3 bg-white border border-asawer-primary-500/30 rounded-md shadow-sm">
                <div className="w-1 h-8 bg-gradient-to-b from-asawer-primary-500 to-asawer-secondary-500 rounded-full" />
                <p className="px-6 text-lg md:text-xl font-semibold text-asawer-primary-600" style={{
                  letterSpacing: '0.02em',
                }}>
                  {locale === 'ar' 
                    ? 'فريق أساور' 
                    : 'Asawer Team'}
                </p>
                <div className="w-1 h-8 bg-gradient-to-b from-asawer-secondary-500 to-asawer-primary-500 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Slider Container */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-6 h-6 text-asawer-primary-500" />
            </button>
            
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all ${
                !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-6 h-6 text-asawer-primary-500" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                setScrollPosition(target.scrollLeft);
                setCanScrollLeft(target.scrollLeft > 0);
                setCanScrollRight(
                  target.scrollLeft < target.scrollWidth - target.clientWidth - 10
                );
              }}
            >
              <div className="flex gap-6 md:gap-8" style={{ width: 'max-content' }}>
                {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex-shrink-0 w-[280px] md:w-[320px]"
            >
              <div className="card-glass h-full flex flex-col overflow-hidden group/card transition-all duration-300 hover:shadow-elegant-lg">
                {/* Enhanced Image Container */}
                <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => setSelectedMember(member)}>
                  <motion.div
                    animate={{
                      scale: hoveredId === member.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 relative"
                  >
                    {member.image && member.image !== '/images/team/default.jpg' ? (
                      <Image
                        src={member.image}
                        alt={locale === 'ar' ? member.nameAr || member.name : member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-7xl font-bold relative z-10 bg-gradient-to-br from-asawer-primary-600 to-asawer-secondary-600">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-asawer-secondary-500/40 to-asawer-primary-500/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                      animate={{
                        opacity: hoveredId === member.id ? 1 : 0,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col text-center">
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
                    locale === 'ar' ? 'font-arabic' : 'font-elegant'
                  }`}>
                    {locale === 'ar' ? member.nameAr : member.name}
                  </h3>
                  <p className="text-asawer-secondary-500 font-semibold text-sm md:text-base mb-4">
                    {locale === 'ar' ? member.roleAr : member.role}
                  </p>

                  {/* Bio Text */}
                  {member.bio && (
                    <p className="text-sm text-asawer-primary-600 mb-4 line-clamp-2">
                      {locale === 'ar' ? member.bioAr : member.bio}
                    </p>
                  )}

                  {/* Social Links with Brand Colors */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredId === member.id ? 1 : 0.8,
                      y: hoveredId === member.id ? 0 : 10,
                    }}
                    className="flex gap-3 mt-auto justify-center"
                  >
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="p-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)',
                          color: '#46868d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)';
                          e.currentTarget.style.color = '#46868d';
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)',
                          color: '#46868d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)';
                          e.currentTarget.style.color = '#46868d';
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="p-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)',
                          color: '#46868d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)';
                          e.currentTarget.style.color = '#46868d';
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent"
                  animate={{
                    borderColor: hoveredId === member.id
                      ? 'rgba(32, 178, 170, 0.3)'
                      : 'transparent',
                    boxShadow: hoveredId === member.id
                      ? '0 0 30px rgba(32, 178, 170, 0.4)'
                      : '0 0 0px rgba(32, 178, 170, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-asawer-primary-900/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-glass max-w-2xl w-full p-8 relative"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500">
                  {selectedMember.image && selectedMember.image !== '/images/team/default.jpg' ? (
                    <Image
                      src={selectedMember.image}
                      alt={locale === 'ar' ? selectedMember.nameAr || selectedMember.name : selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-8xl font-bold">
                      {selectedMember.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className={`text-3xl font-bold mb-2 ${locale === 'ar' ? 'font-arabic' : 'font-elegant'}`}>
                    {locale === 'ar' ? selectedMember.nameAr : selectedMember.name}
                  </h3>
                  <p className="text-asawer-secondary-500 font-semibold mb-4">
                    {locale === 'ar' ? selectedMember.roleAr : selectedMember.role}
                  </p>
                  <p className="text-asawer-primary-700 mb-6">
                    {locale === 'ar' ? selectedMember.bioAr : selectedMember.bio}
                  </p>
                  
                  {/* Social Links with Brand Colors */}
                  <div className="flex gap-4">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        className="p-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)',
                          color: '#46868d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)';
                          e.currentTarget.style.color = '#46868d';
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {selectedMember.email && (
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="p-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)',
                          color: '#46868d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)';
                          e.currentTarget.style.color = '#46868d';
                        }}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {selectedMember.phone && (
                      <a
                        href={`tel:${selectedMember.phone}`}
                        className="p-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)',
                          color: '#46868d',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(70, 134, 141, 0.1) 0%, rgba(46, 95, 110, 0.1) 100%)';
                          e.currentTarget.style.color = '#46868d';
                        }}
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

