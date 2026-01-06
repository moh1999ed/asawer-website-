'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '93994710';
  // Add country code 968 (Oman) if not already included
  const fullNumber = whatsappNumber.startsWith('968') ? whatsappNumber : `968${whatsappNumber}`;
  const whatsappUrl = `https://wa.me/${fullNumber}`;

  const { scrollY } = useScroll();
  
  // Transform scroll position to button movement
  const y = useTransform(scrollY, [0, 1000], [0, -50], { clamp: false });

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[9999] group"
      style={{ y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
    >
      <div className="relative">
        {/* Premium Glow Effect */}
        <motion.div
          className="absolute -inset-3 bg-green-500 rounded-full blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Premium Button */}
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-premium-lg hover:shadow-gold-lg transition-all">
          <MessageCircle className="w-8 h-8 text-white" />
          
          {/* Sparkle Effect */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        </div>

        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-green-400"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </motion.a>
  );
}
