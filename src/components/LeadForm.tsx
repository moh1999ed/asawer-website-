'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { createLeadAndAssign } from '@/lib/lead-distribution';
import { CheckCircle, Loader2 } from 'lucide-react';

interface LeadFormProps {
  projectId: string;
  locale: string;
}

export default function LeadForm({ projectId, locale }: LeadFormProps) {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          project_id: projectId,
          source: 'website',
        }),
      });

      if (!result.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(locale === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {locale === 'ar' ? 'تسجيل اهتمام' : 'Register Interest'}
      </h3>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {locale === 'ar' ? 'شكراً لك!' : 'Thank you!'}
          </p>
          <p className="text-gray-600">
            {locale === 'ar'
              ? 'سيتم التواصل معك قريباً من قبل أحد موظفينا.'
              : 'One of our agents will contact you soon.'}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={locale === 'ar' ? 'اسمك الكريم' : 'Your name'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="968XXXXXXXX"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t('message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={locale === 'ar' ? 'رسالتك (اختياري)' : 'Your message (optional)'}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-6 py-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin ml-2" />
                {locale === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
              </span>
            ) : (
              t('submit')
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            {locale === 'ar'
              ? 'بإرسال هذا النموذج، توافق على أن يتم التواصل معك من قبل أحد موظفينا.'
              : 'By submitting this form, you agree to be contacted by one of our agents.'}
          </p>
        </form>
      )}
    </motion.div>
  );
}

