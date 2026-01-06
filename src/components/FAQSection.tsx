'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  locale: string;
}

const faqs = [
  {
    question_ar: 'من يمكنه شراء ملكية حرة في أساور؟',
    question_en: 'Who can buy freehold property in Asawer?',
    answer_ar: 'الوحدات ذات الملكية الحرة متاحة لجميع الجنسيات، بما في ذلك المشترين الأجانب، ومقيمي دول مجلس التعاون، والمقيمين. يحصل المشترون على ملكية كاملة مع الحق في إعادة البيع أو النقل.',
    answer_en: 'Freehold units are available to all nationalities, including foreign buyers, GCC residents, and expatriates. Buyers receive full ownership with the right to resell or transfer.',
  },
  {
    question_ar: 'هل أحصل على إقامة إذا اشتريت عقاراً هنا؟',
    question_en: 'Do I get residency if I buy a property here?',
    answer_ar: 'نعم — العقار ذو الملكية الحرة يؤهلك للحصول على إقامة قابلة للتجديد، طالما أنك دفعت ما لا يقل عن 30% من قيمة الوحدة.',
    answer_en: 'Yes — freehold property qualifies you for renewable residency, as long as you have paid at least 30% of the unit value.',
  },
  {
    question_ar: 'هل تشمل الإقامة أفراد العائلة؟',
    question_en: 'Does residency include family members?',
    answer_ar: 'نعم — إذا كانت قيمة العقار أكثر من 50,000 ريال عماني، يتم منح الإقامة للمشتري وأفراد العائلة من الدرجة الأولى، دون حد أقصى للعمر للأطفال الذين يعيشون معهم.',
    answer_en: 'Yes — If the property value is more than 50,000 OMR, residency is granted to the buyer and first-degree family members, with no age limit for children living with them.',
  },
  {
    question_ar: 'ما الفرق بين دفع 30% و 100% للإقامة؟',
    question_en: 'What is the difference between 30% and 100% payment for residency?',
    answer_ar: 'يتم منح الإقامة حتى قبل التسليم، بمجرد دفع 30%. لا تحتاج إلى انتظار اكتمال البناء أو الدفع الكامل لبدء معالجة الإقامة.',
    answer_en: 'Residency is granted even before handover, once 30% is paid. You do not need to wait for full construction or full payment to start residency processing.',
  },
];

export default function FAQSection({ locale }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-asawer-primary-500 via-asawer-secondary-500 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-asawer-primary-500/10 to-asawer-secondary-500/10 border-2 border-asawer-primary-500/20 rounded-full mb-8 shadow-lg"
            >
              <HelpCircle className="w-6 h-6 text-asawer-primary-500" />
              <Sparkles className="w-5 h-5 text-asawer-secondary-500" />
              <span className="text-sm font-bold text-asawer-primary-500 uppercase tracking-wider">
                {locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 mx-auto rounded-full shadow-lg mb-8" />
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              {locale === 'ar'
                ? 'إجابات على الأسئلة الأكثر شيوعاً'
                : 'Answers to the most common questions'}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card-clean hover:border-asawer-secondary-500/60 transition-all shadow-lg hover:shadow-xl">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-right gap-5 hover:bg-gray-50/50 rounded-xl p-2 -m-2 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-asawer-primary-500/15 to-asawer-secondary-500/15 text-asawer-primary-500 group-hover:from-asawer-primary-500 group-hover:to-asawer-secondary-500 group-hover:text-white transition-all flex-shrink-0">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <span className="text-lg md:text-xl font-bold text-gray-900">
                        {locale === 'ar' ? faq.question_ar : faq.question_en}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-2.5 rounded-xl bg-gray-100 group-hover:bg-asawer-primary-500/10 text-gray-600 group-hover:text-asawer-primary-500 transition-all flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-5 border-t border-gray-200 text-base md:text-lg text-gray-700 leading-relaxed">
                          {locale === 'ar' ? faq.answer_ar : faq.answer_en}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
