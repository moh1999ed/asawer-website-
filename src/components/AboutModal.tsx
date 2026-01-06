'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Award, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function AboutModal({ isOpen, onClose, locale }: AboutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // السماح بالتمرير - لا نمنع overflow
    // document.body.style.overflow = 'hidden'; // تم إزالته

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // إذا كان المستخدم يمرر لأسفل أكثر من 100px، أغلق المربع
      if (currentScrollY > lastScrollY.current + 100) {
        onClose();
      }
      
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    };

    // حفظ موضع التمرير الحالي
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // document.body.style.overflow = 'unset'; // تم إزالته
    };
  }, [isOpen, onClose]);

  // إغلاق عند الضغط على Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title_ar: 'رؤيتنا',
      title_en: 'Our Vision',
      description_ar: 'أن نكون الرائدين في التطوير العقاري في سلطنة عمان من خلال مشاريع متميزة تجمع بين الجودة والابتكار.',
      description_en: 'To be the leaders in real estate development in the Sultanate of Oman through distinguished projects that combine quality and innovation.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title_ar: 'جودة البناء',
      title_en: 'Construction Quality',
      description_ar: 'نستخدم أحدث التقنيات والمواد في البناء لضمان متانة وجودة عالية في جميع مشاريعنا.',
      description_en: 'We use the latest technologies and materials in construction to ensure durability and high quality in all our projects.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title_ar: 'فريق محترف',
      title_en: 'Professional Team',
      description_ar: 'فريق من الخبراء العمانيين المتخصصين في التطوير العقاري والبناء والتشييد.',
      description_en: 'A team of Omani experts specialized in real estate development, construction and building.',
    },
  ];

  const highlights = [
    locale === 'ar' ? 'تصميم متميز وجودة بناء عالية' : 'Distinguished design and high construction quality',
    locale === 'ar' ? 'أحدث الوسائل والمواد في البناء' : 'Latest means and materials in construction',
    locale === 'ar' ? 'كفاءة عمانية متخصصة' : 'Specialized Omani expertise',
    locale === 'ar' ? 'رؤى ثاقبة لاقتناص فرص الاستثمار' : 'Insightful visions to seize investment opportunities',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - شفاف أكثر ويمكن التمرير خلفه */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] pointer-events-auto"
            style={{ 
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          />

          {/* 3D Modal Box */}
          <div 
            className="fixed inset-0 z-[101] flex items-start justify-center p-4 overflow-y-auto"
            style={{ 
              paddingTop: '5vh',
              paddingBottom: '5vh',
            }}
            onClick={(e) => {
              // إغلاق عند الضغط خارج المربع
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <motion.div
              ref={modalRef}
              initial={{ 
                opacity: 0, 
                scale: 0.5, 
                rotateX: -90,
                y: 100,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateX: 0,
                y: 0,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5, 
                rotateX: 90,
                y: -100,
              }}
              transition={{ 
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
                damping: 20
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => {
                // منع إغلاق عند الضغط داخل المربع
                e.stopPropagation();
              }}
            >
              {/* 3D Box Container */}
              <motion.div
                className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 50px 100px rgba(46, 94, 110, 0.3), 0 0 0 1px rgba(46, 94, 110, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                }}
                whileHover={{
                  rotateY: 2,
                  rotateX: 1,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.95,
                  rotateY: -5,
                  rotateX: 3,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 15,
                  }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* 3D Edge Effects */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(46, 94, 110, 0.1) 0%, rgba(69, 133, 140, 0.1) 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    transform: 'translateZ(20px)',
                  }}
                />

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-6 left-6 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Content */}
                <motion.div 
                  className="p-8 md:p-12 relative z-10"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                  >
                    <div className="inline-block mb-4">
                      <div className="w-16 h-1 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 rounded-full mx-auto" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                      {locale === 'ar' ? 'من نحن' : 'Who We Are'}
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto" style={{ color: '#45858c' }}>
                      {locale === 'ar'
                        ? 'شركة أساور للتطوير العقاري أُسست لتتربع مستوى عال في التطوير العُمراني، بتميز التصميم وجودة البناء والتشييد وإضفاء طابع الأمن والسلامة، وبكفاءة عُمانية مُتخصص بفهم عميق في القطاع العقاري، ورؤى ثاقبة لاقتناص فرص الاستثمار في المجال.'
                        : 'Asawer Real Estate Development Company was established to reach a high level in urban development, with distinguished design, quality construction and building, and adding security and safety, with Omani expertise specialized with deep understanding in the real estate sector, and insightful visions to seize investment opportunities in the field.'}
                    </p>
                  </motion.div>

                  {/* What Makes Us Unique */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-3" style={{ color: '#27505e' }}>
                      <div className="w-1 h-8 bg-gradient-to-b from-asawer-primary-500 to-asawer-secondary-500 rounded-full" />
                      {locale === 'ar' ? 'ما يميزنا' : 'What Makes Us Unique'}
                    </h3>
                    <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: '#27505e' }}>
                      {locale === 'ar'
                        ? 'تتفرد أساور بتحسينها المستمر وتطوير المشاريع العقارية بأحدث الوسائل والمواد في الواقع المعاصر، تحت أيادي أكفاء يتميزون بالرشاقة، المصداقية، والعمل بمهنية عالية.'
                        : 'Asawer is distinguished by its continuous improvement and development of real estate projects with the latest means and materials in the contemporary reality, under the hands of competent people who are distinguished by agility, credibility, and high professionalism.'}
                    </p>
                    
                    {/* Highlights Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                      {highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-start justify-center gap-3 p-4 rounded-xl bg-gradient-to-br from-asawer-primary-500/5 to-asawer-secondary-500/5 border border-asawer-primary-500/20"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 mt-2 flex-shrink-0" />
                          <span className="text-center font-medium" style={{ color: '#27505e' }}>{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Features Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                        whileHover={{ 
                          scale: 1.05, 
                          rotateY: 5,
                          rotateX: 2,
                          z: 20,
                        }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-asawer-primary-500/20 hover:border-asawer-primary-500/50 transition-all shadow-lg hover:shadow-2xl"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <motion.div
                            whileHover={{ rotateY: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 text-white mb-4 shadow-lg"
                          >
                            {feature.icon}
                          </motion.div>
                          <h4 className="text-xl font-bold mb-2" style={{ color: '#27505e' }}>
                            {locale === 'ar' ? feature.title_ar : feature.title_en}
                          </h4>
                          <p className="leading-relaxed text-sm" style={{ color: '#45858c' }}>
                            {locale === 'ar' ? feature.description_ar : feature.description_en}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

