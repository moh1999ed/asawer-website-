'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Target, 
  Award, 
  Lightbulb, 
  Heart, 
  Shield, 
  Zap,
  Building,
  Users,
  Globe,
  Star
} from 'lucide-react';

interface Strength {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  color: string;
}

interface LuxuryVisionProps {
  locale: string;
  strengths?: Strength[];
}

const defaultStrengths: Strength[] = [
  {
    id: 'vision',
    icon: <Target className="w-8 h-8" />,
    title: 'Vision',
    titleAr: 'الرؤية',
    description: 'Clear vision for exceptional projects',
    descriptionAr: 'رؤية واضحة لمشاريع استثنائية',
    color: 'from-asawer-primary-500 to-asawer-secondary-500',
  },
  {
    id: 'excellence',
    icon: <Award className="w-8 h-8" />,
    title: 'Excellence',
    titleAr: 'التميز',
    description: 'Commitment to highest standards',
    descriptionAr: 'التزام بأعلى المعايير',
    color: 'from-asawer-secondary-500 to-asawer-primary-500',
  },
  {
    id: 'innovation',
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Innovation',
    titleAr: 'الابتكار',
    description: 'Cutting-edge architectural solutions',
    descriptionAr: 'حلول معمارية متطورة',
    color: 'from-asawer-primary-500 to-asawer-secondary-500',
  },
  {
    id: 'integrity',
    icon: <Heart className="w-8 h-8" />,
    title: 'Integrity',
    titleAr: 'النزاهة',
    description: 'Transparent and honest practices',
    descriptionAr: 'ممارسات شفافة وصادقة',
    color: 'from-asawer-secondary-500 to-asawer-primary-500',
  },
  {
    id: 'reliability',
    icon: <Shield className="w-8 h-8" />,
    title: 'Reliability',
    titleAr: 'الموثوقية',
    description: 'Trusted partner in real estate',
    descriptionAr: 'شريك موثوق في العقارات',
    color: 'from-asawer-primary-500 to-asawer-secondary-500',
  },
  {
    id: 'efficiency',
    icon: <Zap className="w-8 h-8" />,
    title: 'Efficiency',
    titleAr: 'الكفاءة',
    description: 'Streamlined development process',
    descriptionAr: 'عملية تطوير مبسطة',
    color: 'from-asawer-secondary-500 to-asawer-primary-500',
  },
];

export default function LuxuryVision({ locale, strengths = defaultStrengths }: LuxuryVisionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Honeycomb layout calculation
  const getHoneycombPosition = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const offset = row % 2 === 1 ? 50 : 0; // Stagger alternate rows
    
    return {
      x: col * 200 + offset,
      y: row * 180,
    };
  };

  return (
    <section
      id="vision"
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Honeycomb Background Pattern */}
      <div className="absolute inset-0 honeycomb-bg opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-asawer-primary-900/10 via-transparent to-asawer-secondary-900/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
            locale === 'ar' ? 'font-arabic' : 'font-elegant'
          }`}>
            <span className="bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent">
              {locale === 'ar' ? 'رؤيتنا وقوتنا' : 'Our Vision & Strengths'}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {locale === 'ar' 
              ? 'القيم التي تحركنا نحو التميز' 
              : 'The values that drive us towards excellence'}
          </p>
        </motion.div>

        {/* Honeycomb Grid */}
        <div className="relative flex justify-center items-center min-h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {strengths.map((strength, index) => {
              const position = getHoneycombPosition(index);
              
              return (
                <motion.div
                  key={strength.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 5,
                    zIndex: 10,
                    y: -10,
                  }}
                  onHoverStart={() => setHoveredId(strength.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Hexagon Shape */}
                  <div className="relative">
                    {/* Enhanced Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
                      animate={{
                        scale: hoveredId === strength.id ? [1, 1.3, 1] : [1, 1.2, 1],
                        opacity: hoveredId === strength.id ? 0.3 : 0,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    
                    {/* Enhanced Card */}
                    <div className="card-glass relative h-full flex flex-col items-center text-center p-6 md:p-8 transform transition-all duration-500">
                      {/* Enhanced Icon with Tooltip */}
                      <div className="relative mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                          className={`p-4 rounded-2xl bg-gradient-to-br ${strength.color} text-white shadow-neon group-hover:shadow-neon-lg transition-all duration-300`}
                        >
                          {strength.icon}
                        </motion.div>
                        
                        {/* Tooltip */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: hoveredId === strength.id ? 1 : 0,
                            y: hoveredId === strength.id ? 0 : 10,
                          }}
                          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
                        >
                          {locale === 'ar' ? strength.titleAr : strength.title}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg md:text-xl font-bold mb-3 ${
                        locale === 'ar' ? 'font-arabic' : 'font-elegant'
                      }`}>
                        {locale === 'ar' ? strength.titleAr : strength.title}
                      </h3>

                      {/* Description */}
                      <motion.p 
                        className="text-gray-600 text-sm md:text-base"
                        animate={{
                          color: hoveredId === strength.id ? '#20B2AA' : '#6B7280',
                        }}
                      >
                        {locale === 'ar' ? strength.descriptionAr : strength.description}
                      </motion.p>

                      {/* Enhanced Animated Border */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl border-2 bg-gradient-to-br ${strength.color} transition-opacity duration-500`}
                        animate={{
                          opacity: hoveredId === strength.id ? 0.4 : 0,
                          borderColor: hoveredId === strength.id ? '#20B2AA' : 'transparent',
                        }}
                        style={{
                          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

