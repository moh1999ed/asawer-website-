'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Download } from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'guidance' | 'brochure';
  locale: string;
}

export default function ContactFormModal({
  isOpen,
  onClose,
  type,
  locale,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
    agree: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(locale === 'ar' ? 'شكراً لك! سنتواصل معك قريباً.' : 'Thank you! We will contact you soon.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {type === 'guidance' ? (
                  <Phone className="w-6 h-6 text-asawer-secondary-500" />
                ) : (
                  <Download className="w-6 h-6 text-asawer-secondary-500" />
                )}
                <h3 className="text-2xl font-bold text-gray-900">
                  {type === 'guidance'
                    ? locale === 'ar'
                      ? 'حجز استشارة'
                      : 'Book a Guidance Call'
                    : locale === 'ar'
                    ? 'تحميل الكتيب'
                    : 'Download Brochure'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asawer-secondary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'ar' ? 'عنوان البريد الإلكتروني' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asawer-secondary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asawer-secondary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'ar' ? 'الغرض' : 'Purpose'} *
                </label>
                <select
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asawer-secondary-500 focus:border-transparent"
                >
                  <option value="">
                    {locale === 'ar' ? 'اختر الغرض' : 'Select Purpose'}
                  </option>
                  <option value="investment">
                    {locale === 'ar' ? 'استثمار' : 'Investment'}
                  </option>
                  <option value="residence">
                    {locale === 'ar' ? 'إقامة' : 'Residence'}
                  </option>
                  <option value="holiday">
                    {locale === 'ar' ? 'منزل عطلة' : 'Holiday Home'}
                  </option>
                  <option value="other">
                    {locale === 'ar' ? 'أخرى' : 'Other'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'ar' ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-asawer-secondary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1"
                />
                <label className="text-sm text-gray-600">
                  {locale === 'ar'
                    ? 'أوافق على التواصل من قبل فريق مبيعات أساور بخصوص فرص الاستثمار العقاري.'
                    : 'I agree to be contacted by Asawer\'s sales team regarding property investment opportunities.'}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-asawer-secondary-500 to-asawer-accent-500 text-white px-6 py-4 rounded-full font-semibold hover:shadow-gold transition-all"
              >
                {locale === 'ar' ? 'إرسال الاستفسار' : 'Send Enquiry'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

