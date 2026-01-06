'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LuxuryButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'liquid';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function LuxuryButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
}: LuxuryButtonProps) {
  const baseClasses = 'px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white hover:shadow-neon',
    secondary: 'bg-transparent border-2 border-asawer-primary-500 text-asawer-primary-500 hover:bg-asawer-primary-500 hover:text-white',
    liquid: 'btn-liquid text-white',
  };

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'liquid' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-asawer-secondary-500 to-asawer-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}



