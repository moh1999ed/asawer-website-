'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, Phone, User, MessageSquare, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = locale === 'ar' ? 'الاسم يجب أن يكون على الأقل حرفين' : 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = locale === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = locale === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format';
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = locale === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 8) {
        newErrors.phone = locale === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number';
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = locale === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = locale === 'ar' ? 'الرسالة يجب أن تكون على الأقل 10 أحرف' : 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          source: 'website',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (locale === 'ar' ? 'حدث خطأ أثناء الإرسال' : 'An error occurred while sending'));
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : (locale === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(46, 94, 110) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(46, 94, 110, 0.08) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(69, 133, 140, 0.08) 0%, transparent 70%)',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Split Layout: Form on Left, Content on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className={`${locale === 'ar' ? 'lg:order-2' : 'lg:order-1'}`}
            >
              {/* Premium Glassmorphism Card Container */}
              <div className="relative rounded-[2rem] overflow-hidden group">
              {/* Animated Gradient Border - Multi-layer */}
              <div className="absolute inset-0 rounded-[2rem] p-[3px]">
                <motion.div
                  className="absolute inset-0 rounded-[2rem]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(46, 94, 110, 0.4), rgba(69, 133, 140, 0.4), rgba(46, 94, 110, 0.4))',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(46, 94, 110, 0.4), rgba(69, 133, 140, 0.4), rgba(46, 94, 110, 0.4))',
                      'linear-gradient(225deg, rgba(69, 133, 140, 0.4), rgba(46, 94, 110, 0.4), rgba(69, 133, 140, 0.4))',
                      'linear-gradient(135deg, rgba(46, 94, 110, 0.4), rgba(69, 133, 140, 0.4), rgba(46, 94, 110, 0.4))',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="w-full h-full bg-white/95 backdrop-blur-2xl rounded-[2rem]" />
              </div>

              {/* Premium Shadow Layers */}
              <div className="absolute -inset-1 rounded-[2rem] opacity-75 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-asawer-primary-500/20 via-asawer-secondary-500/20 to-asawer-primary-500/20 blur-2xl" />
              </div>

              {/* Geometric Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(46, 94, 110, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(46, 94, 110, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(69, 133, 140, 0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(69, 133, 140, 0.1) 75%)
                  `,
                  backgroundSize: '60px 60px',
                  backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
                }} />
              </div>

              {/* Animated Corner Ornaments */}
              <motion.div
                className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-asawer-primary-500/15 via-asawer-primary-500/8 to-transparent rounded-br-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-asawer-secondary-500/15 via-asawer-secondary-500/8 to-transparent rounded-bl-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 1,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-asawer-primary-500/15 via-asawer-primary-500/8 to-transparent rounded-tl-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 2,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-asawer-secondary-500/15 via-asawer-secondary-500/8 to-transparent rounded-tr-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 3,
                  ease: 'easeInOut',
                }}
              />

              {/* Premium Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-asawer-primary-500/8 via-transparent to-asawer-secondary-500/8 pointer-events-none" />

              {/* Animated Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              />

              {/* Decorative Lines */}
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-asawer-primary-500/20 to-transparent opacity-50" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-asawer-secondary-500/20 to-transparent opacity-50" />

              {/* Premium Content Container */}
              <div className="relative p-10 md:p-16 lg:p-20" style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 0 rgba(46, 94, 110, 0.1)',
              }}>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 mb-8 shadow-brand-lg"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-4xl font-bold text-asawer-primary-600 mb-6">
                      {locale === 'ar' ? 'تم الإرسال بنجاح!' : 'Successfully Sent!'}
                    </h3>
                    <p className="text-xl text-asawer-primary-600">
                      {locale === 'ar' 
                        ? 'شكراً لتواصلك معنا، سنرد عليك قريباً'
                        : 'Thank you for contacting us, we will get back to you soon'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="flex items-center gap-3 text-base font-bold text-asawer-primary-700 mb-4">
                        <div 
                          className={`p-2.5 rounded-xl transition-all ${
                            focusedField === 'name' 
                              ? 'bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 shadow-lg' 
                              : 'bg-gradient-to-br from-asawer-primary-500/10 to-asawer-secondary-500/10'
                          }`}
                        >
                          <User 
                            className={`w-5 h-5 transition-colors ${
                              focusedField === 'name' ? 'text-white' : 'text-asawer-primary-500'
                            }`} 
                          />
                        </div>
                        <span>{locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}</span>
                      </label>
                      <div className="relative group">
                        {/* Animated Background Glow */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl transition-all ${
                            focusedField === 'name' 
                              ? 'bg-gradient-to-r from-asawer-primary-500/15 to-asawer-secondary-500/15' 
                              : 'bg-transparent'
                          }`}
                          animate={focusedField === 'name' ? {
                            boxShadow: [
                              '0 0 20px rgba(46, 94, 110, 0.1)',
                              '0 0 30px rgba(69, 133, 140, 0.15)',
                              '0 0 20px rgba(46, 94, 110, 0.1)',
                            ],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`relative w-full pl-6 pr-6 py-5 bg-gradient-to-br from-asawer-primary-50 to-white border-2 rounded-xl focus:border-2 focus:border-transparent focus:bg-white focus:outline-none transition-all duration-300 text-lg text-asawer-primary-700 placeholder-asawer-primary-400 font-medium shadow-sm focus:shadow-lg ${
                            errors.name ? 'border-red-500' : 'border-asawer-primary-200'
                          }`}
                          style={focusedField === 'name' ? {
                            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3))',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          } : {}}
                          placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-500"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="flex items-center gap-3 text-base font-bold text-asawer-primary-700 mb-4">
                          <div 
                            className={`p-2.5 rounded-xl transition-all ${
                              focusedField === 'email' 
                                ? 'bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 shadow-lg' 
                                : 'bg-gradient-to-br from-asawer-primary-500/10 to-asawer-secondary-500/10'
                            }`}
                          >
                            <Mail 
                              className={`w-5 h-5 transition-colors ${
                                focusedField === 'email' ? 'text-white' : 'text-asawer-primary-500'
                              }`} 
                            />
                          </div>
                          <span>{locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
                        </label>
                        <div className="relative group">
                          {/* Animated Background Glow */}
                          <motion.div
                            className={`absolute inset-0 rounded-xl transition-all ${
                              focusedField === 'email' 
                                ? 'bg-gradient-to-r from-asawer-primary-500/15 to-asawer-secondary-500/15' 
                                : 'bg-transparent'
                            }`}
                            animate={focusedField === 'email' ? {
                              boxShadow: [
                                '0 0 20px rgba(46, 94, 110, 0.1)',
                                '0 0 30px rgba(69, 133, 140, 0.15)',
                                '0 0 20px rgba(46, 94, 110, 0.1)',
                              ],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`relative w-full pl-6 pr-6 py-5 bg-gradient-to-br from-asawer-primary-50 to-white border-2 rounded-xl focus:border-2 focus:border-transparent focus:bg-white focus:outline-none transition-all duration-300 text-lg text-asawer-primary-700 placeholder-asawer-primary-400 font-medium shadow-sm focus:shadow-lg ${
                              errors.email ? 'border-red-500' : 'border-asawer-primary-200'
                            }`}
                            style={focusedField === 'email' ? {
                              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3))',
                              backgroundOrigin: 'border-box',
                              backgroundClip: 'padding-box, border-box',
                            } : {}}
                            placeholder={locale === 'ar' ? 'example@email.com' : 'example@email.com'}
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-500"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="flex items-center gap-3 text-base font-bold text-asawer-primary-700 mb-4">
                          <div 
                            className={`p-2.5 rounded-xl transition-all ${
                              focusedField === 'phone' 
                                ? 'bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 shadow-lg' 
                                : 'bg-gradient-to-br from-asawer-primary-500/10 to-asawer-secondary-500/10'
                            }`}
                          >
                            <Phone 
                              className={`w-5 h-5 transition-colors ${
                                focusedField === 'phone' ? 'text-white' : 'text-asawer-primary-500'
                              }`} 
                            />
                          </div>
                          <span>{locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</span>
                        </label>
                        <div className="relative group">
                          {/* Animated Background Glow */}
                          <motion.div
                            className={`absolute inset-0 rounded-xl transition-all ${
                              focusedField === 'phone' 
                                ? 'bg-gradient-to-r from-asawer-primary-500/15 to-asawer-secondary-500/15' 
                                : 'bg-transparent'
                            }`}
                            animate={focusedField === 'phone' ? {
                              boxShadow: [
                                '0 0 20px rgba(46, 94, 110, 0.1)',
                                '0 0 30px rgba(69, 133, 140, 0.15)',
                                '0 0 20px rgba(46, 94, 110, 0.1)',
                              ],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className={`relative w-full pl-6 pr-6 py-5 bg-gradient-to-br from-asawer-primary-50 to-white border-2 rounded-xl focus:border-2 focus:border-transparent focus:bg-white focus:outline-none transition-all duration-300 text-lg text-asawer-primary-700 placeholder-asawer-primary-400 font-medium shadow-sm focus:shadow-lg ${
                              errors.phone ? 'border-red-500' : 'border-asawer-primary-200'
                            }`}
                            style={focusedField === 'phone' ? {
                              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3))',
                              backgroundOrigin: 'border-box',
                              backgroundClip: 'padding-box, border-box',
                            } : {}}
                            placeholder={locale === 'ar' ? '+968 XXXX XXXX' : '+968 XXXX XXXX'}
                          />
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-500"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="flex items-center gap-3 text-base font-bold text-asawer-primary-700 mb-4">
                        <div 
                          className={`p-2.5 rounded-xl transition-all ${
                            focusedField === 'message' 
                              ? 'bg-gradient-to-br from-asawer-primary-500 to-asawer-secondary-500 shadow-lg' 
                              : 'bg-gradient-to-br from-asawer-primary-500/10 to-asawer-secondary-500/10'
                          }`}
                        >
                          <MessageSquare 
                            className={`w-5 h-5 transition-colors ${
                              focusedField === 'message' ? 'text-white' : 'text-asawer-primary-500'
                            }`} 
                          />
                        </div>
                        <span>{locale === 'ar' ? 'الرسالة' : 'Message'}</span>
                      </label>
                      <div className="relative group">
                        {/* Animated Background Glow */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl transition-all ${
                            focusedField === 'message' 
                              ? 'bg-gradient-to-r from-asawer-primary-500/15 to-asawer-secondary-500/15' 
                              : 'bg-transparent'
                          }`}
                          animate={focusedField === 'message' ? {
                            boxShadow: [
                              '0 0 20px rgba(46, 94, 110, 0.1)',
                              '0 0 30px rgba(69, 133, 140, 0.15)',
                              '0 0 20px rgba(46, 94, 110, 0.1)',
                            ],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleFieldChange('message', e.target.value)}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          rows={8}
                          className={`relative w-full pl-6 pr-6 pt-5 pb-5 bg-gradient-to-br from-asawer-primary-50 to-white border-2 rounded-xl focus:border-2 focus:border-transparent focus:bg-white focus:outline-none transition-all duration-300 resize-none text-lg text-asawer-primary-700 placeholder-asawer-primary-400 font-medium leading-relaxed shadow-sm focus:shadow-lg ${
                            errors.message ? 'border-red-500' : 'border-asawer-primary-200'
                          }`}
                          style={focusedField === 'message' ? {
                            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3))',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          } : {}}
                          placeholder={locale === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                        />
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-500"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Error Message */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
                      >
                        {submitError}
                      </motion.div>
                    )}

                    {/* Premium Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 }}
                      className="pt-8"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-12 py-7 bg-white border-2 border-transparent font-bold text-xl rounded-2xl transition-all flex items-center justify-center gap-4 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3))',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                          boxShadow: '0 10px 40px -10px rgba(46, 94, 110, 0.2), 0 0 0 1px rgba(46, 94, 110, 0.1)',
                        }}
                      >
                        {/* Animated Gradient Border */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3), rgba(46, 94, 110, 0.3))',
                            padding: '2px',
                          }}
                          animate={{
                            background: [
                              'linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3), rgba(46, 94, 110, 0.3))',
                              'linear-gradient(225deg, rgba(69, 133, 140, 0.3), rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3))',
                              'linear-gradient(135deg, rgba(46, 94, 110, 0.3), rgba(69, 133, 140, 0.3), rgba(46, 94, 110, 0.3))',
                            ],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        
                        {/* Subtle Background Glow */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-asawer-primary-500/5 via-asawer-secondary-500/5 to-asawer-primary-500/5 rounded-2xl"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        
                        {/* Glow Effect on Hover */}
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-asawer-primary-500/30 via-asawer-secondary-500/30 to-asawer-primary-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-7 h-7 border-3 border-asawer-primary-500 border-t-transparent rounded-full relative z-20"
                            />
                            <span 
                              className="relative z-20 font-black text-xl bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 bg-clip-text text-transparent"
                            >
                              {locale === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                            </span>
                          </>
                        ) : (
                          <>
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              className="relative z-20"
                            >
                              <Send className="w-7 h-7 group-hover:translate-x-1 transition-transform" style={{ color: '#2e5e6e' }} />
                            </motion.div>
                            <span 
                              className="relative z-20 font-black text-xl tracking-wide bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent bg-[length:200%_100%]"
                              style={{
                                backgroundImage: 'linear-gradient(135deg, #2e5e6e, #45858c, #2e5e6e)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% 100%',
                              }}
                            >
                              {locale === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                            </span>
                            <motion.div
                              className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              animate={{
                                x: [0, 5, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            >
                              <ArrowRight className="w-5 h-5" style={{ color: '#45858c' }} />
                            </motion.div>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className={`${locale === 'ar' ? 'lg:order-1' : 'lg:order-2'} space-y-8`}
            >
              {/* Content Text - Centered */}
              <div className="space-y-6 text-center">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                  locale === 'ar' ? 'font-arabic' : 'font-elegant'
                }`}>
                  <span className="bg-gradient-to-r from-asawer-primary-500 via-asawer-secondary-500 to-asawer-primary-500 bg-clip-text text-transparent">
                    {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </span>
                </h2>
                
                <p className={`text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto ${
                  locale === 'ar' ? 'font-arabic' : 'font-sans'
                }`} style={{ color: '#2e5f6e' }}>
                  {locale === 'ar' 
                    ? 'تواصل معنا، نحن هنا للإجابة عن جميع استفساراتك وتواصل معنا وعروض حصرية ومكافئات مميزة'
                    : 'Contact us, we are here to answer all your inquiries. Contact us for exclusive offers and special rewards'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
