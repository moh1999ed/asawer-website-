'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Quote, Award, Briefcase, Sparkles, Star } from 'lucide-react';

interface CEOSectionProps {
  locale: string;
}

export default function CEOSection({ locale }: CEOSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ceo" className="relative pt-8 md:pt-12 lg:pt-16 pb-32 md:pb-40 lg:pb-48 overflow-hidden intersection-observer-target">
      {/* Light Color Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #46868d 0%, rgba(70, 134, 141, 0.95) 50%, #46868d 100%)',
      }} />
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="w-full max-w-7xl mx-auto"
        >
          {/* Content Layout */}
          <div className="relative">
            {/* Clean Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
                  {/* CEO Image - Beautiful Frame Design */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-2 relative"
                  >
                    {/* Outer Decorative Frame */}
                    <div className="relative p-4 md:p-5 lg:p-6" style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                      borderRadius: '1.5rem',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    }}>
                      {/* Inner Frame with Gradient Border */}
                      <div className="relative p-3 md:p-4" style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        borderRadius: '1.25rem',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0, 0, 0, 0.1)',
                      }}>
                        {/* Image Container */}
                        <div className="relative h-[320px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden bg-white shadow-2xl">
                          <Image
                            src="/images/ceo/ceo.jpg"
                            alt={locale === 'ar' ? 'أحمد الحرملي - الرئيس التنفيذي' : 'Ahmed Al-Harmali - CEO'}
                            fill
                            className="object-contain object-center"
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            style={{ objectPosition: 'center top' }}
                          />
                          
                          {/* Decorative Corner Elements */}
                          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/60 rounded-tl-xl" />
                          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white/60 rounded-tr-xl" />
                          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/60 rounded-bl-xl" />
                          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/60 rounded-br-xl" />
                          
                          {/* Glowing CEO Badge */}
                          <motion.div
                            className="absolute top-4 right-4 px-5 py-3 rounded-xl flex items-center gap-2 z-20"
                            style={{
                              background: 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)',
                              boxShadow: '0 0 20px rgba(70, 134, 141, 0.6), 0 0 40px rgba(70, 134, 141, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.4 }}
                          >
                            <Award className="w-5 h-5 text-white" style={{
                              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))',
                            }} />
                            <span className="text-sm font-black text-white uppercase tracking-wider" style={{
                              textShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
                              letterSpacing: '0.1em',
                            }}>
                              CEO
                            </span>
                          </motion.div>
                        </div>
                        
                        {/* Decorative Glow Effect */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-2xl blur-xl opacity-50" />
                      </div>
                    </div>
                  </motion.div>

                  {/* CEO Message - Clean Typography */}
                  <motion.div
                    initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="lg:col-span-3 space-y-5 relative"
                  >
                    {/* Clean Title Design */}
                    <div className={`${locale === 'ar' ? 'text-right' : 'text-left'} mb-5`}>
                      <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${
                        locale === 'ar' ? 'font-arabic' : 'font-elegant'
                      }`} style={{
                        letterSpacing: locale === 'ar' ? '0' : '-0.01em',
                        lineHeight: '1.3',
                        color: '#ffffff',
                      }}>
                        {locale === 'ar' ? 'رسالة الرئيس التنفيذي' : 'CEO Message'}
                      </h3>
                    </div>

                    {/* Clean Message Design */}
                    <div className={`${locale === 'ar' ? 'text-right' : 'text-left'} space-y-4`}>
                      {/* Clean Message - Well Arranged */}
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        {locale === 'ar' ? (
                          <>
                            {/* Opening with Quote */}
                            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${
                              locale === 'ar' ? 'font-arabic' : 'font-serif'
                            }`} style={{
                              letterSpacing: '0.015em',
                              fontWeight: '400',
                              lineHeight: '1.9',
                              color: '#ffffff',
                              textAlign: 'justify',
                              textAlignLast: 'right',
                            }}>
                              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem' }}>"</span>
                              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem' }}>في أساور،</span>
                              {' '}
                              نؤمن بأن التطوير العقاري ليس مجرد بناء، بل هو خلق إرث للأجيال القادمة. نحن ملتزمون بتقديم مشاريع استثنائية تجمع بين الابتكار والجودة والاستدامة، لنكون جزءاً من بناء مستقبل مشرق لعمان. بفضل فريقنا المتميز وخبرتنا الواسعة التي تمتد لأكثر من عقدين، نعمل على تطوير مشاريع عقارية متكاملة تراعي أعلى المعايير العالمية في التصميم والبناء، مع التركيز على الاستدامة البيئية والمساهمة الفعالة في تنمية المجتمع العماني.
                            </p>
                            
                            {/* Continuation */}
                            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${
                              locale === 'ar' ? 'font-arabic' : 'font-serif'
                            }`} style={{
                              letterSpacing: '0.015em',
                              fontWeight: '400',
                              lineHeight: '1.9',
                              color: '#ffffff',
                              textAlign: 'justify',
                              textAlignLast: 'right',
                            }}>
                              نسعى جاهدين لتحقيق رؤيتنا في أن نكون العلامة الأبرز والأسرع نمواً في قطاع التطوير العقاري في سلطنة عمان، من خلال تقديم حلول عقارية مبتكرة تلبي احتياجات عملائنا وتتجاوز توقعاتهم. نحن فخورون بشراكاتنا الاستراتيجية وعلاقاتنا المتميزة مع عملائنا، ونؤكد التزامنا المستمر بالتميز والابتكار في كل مشروع نقوم به.
                              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem' }}>"</span>
                            </p>
                          </>
                        ) : (
                          <>
                            {/* Opening with Quote */}
                            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed font-serif`} style={{
                              letterSpacing: '0.01em',
                              fontWeight: '400',
                              lineHeight: '1.9',
                              color: '#ffffff',
                              textAlign: 'justify',
                              textAlignLast: 'left',
                            }}>
                              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem' }}>"</span>
                              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem' }}>At Asawer,</span>
                              {' '}
                              we believe that real estate development is not just building, but creating a legacy for future generations. We are committed to delivering exceptional projects that combine innovation, quality, and sustainability, to be part of building a bright future for Oman. Thanks to our distinguished team and extensive experience spanning more than two decades, we work on developing integrated real estate projects that adhere to the highest international standards in design and construction, while focusing on environmental sustainability and active contribution to the development of Omani society.
                            </p>
                            
                            {/* Continuation */}
                            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed font-serif`} style={{
                              letterSpacing: '0.01em',
                              fontWeight: '400',
                              lineHeight: '1.9',
                              color: '#ffffff',
                              textAlign: 'justify',
                              textAlignLast: 'left',
                            }}>
                              We strive to achieve our vision of being the most prominent and fastest-growing brand in the real estate development sector in the Sultanate of Oman, by providing innovative real estate solutions that meet our clients' needs and exceed their expectations. We are proud of our strategic partnerships and distinguished relationships with our clients, and we affirm our continued commitment to excellence and innovation in every project we undertake.
                              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.25rem' }}>"</span>
                            </p>
                          </>
                        )}
                      </motion.div>
                    </div>

                    {/* Clean Signature Section */}
                    <motion.div
                      className={`mt-8 pt-5 border-t border-white/30 ${
                        locale === 'ar' ? 'text-right' : 'text-left'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <div className={`flex flex-col ${locale === 'ar' ? 'items-end' : 'items-start'} gap-3`}>
                        {/* Name */}
                        <div>
                          <p className="font-bold text-xl md:text-2xl lg:text-3xl mb-1" style={{ color: '#ffffff' }}>
                            {locale === 'ar' ? 'أحمد الحرملي' : 'Ahmed Al-Harmali'}
                          </p>
                          <p className="font-semibold text-base md:text-lg" style={{ color: '#ffffff' }}>
                            {locale === 'ar' ? 'الرئيس التنفيذي والمؤسس' : 'CEO & Founder'}
                          </p>
                        </div>
                        
                        {/* Clean Signature Line */}
                        <div className={`w-24 h-1 bg-white rounded-full`} />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
