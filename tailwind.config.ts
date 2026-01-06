import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        asawer: {
          // Primary Color - #46868d
          primary: {
            50: '#e8f1f2',
            100: '#c5dde0',
            200: '#9fc8cd',
            300: '#79b3ba',
            400: '#5da3ab',
            500: '#46868d', // Primary Color
            600: '#3d757b',
            700: '#2e5f6e', // Dark variant
            800: '#1f4a5a',
            900: '#103546',
          },
          // Secondary Color - #2e5f6e
          secondary: {
            50: '#e8edef',
            100: '#c5d2d6',
            200: '#9fb5bd',
            300: '#7998a4',
            400: '#5d828f',
            500: '#2e5f6e', // Secondary Color
            600: '#28535f',
            700: '#1f4550',
            800: '#163741',
            900: '#0d2932',
          },
          // Glassmorphic Silver
          glass: {
            50: '#ffffff',
            100: '#f8f9fa',
            200: '#f1f3f5',
            300: '#e9ecef',
            400: '#dee2e6',
            500: '#ced4da', // Glassmorphic Silver base
            600: '#adb5bd',
            700: '#868e96',
            800: '#495057',
            900: '#343a40',
          },
          accent: {
            50: '#e6f9f8',
            100: '#b3f0ed',
            200: '#80e7e2',
            300: '#4dded7',
            400: '#1ad5cc',
            500: '#20B2AA',
            600: '#1a8e88',
            700: '#136a66',
            800: '#0d4644',
            900: '#062222',
          },
          gold: {
            50: '#fffef7',
            100: '#fffceb',
            200: '#fff7d1',
            300: '#ffefb3',
            400: '#ffe28a',
            500: '#d4af37',
            600: '#b8941f',
            700: '#9a7a1a',
            800: '#7d5f15',
            900: '#634a10',
          },
        },
      },
      fontFamily: {
        'arabic': ['var(--font-tajawal)', 'sans-serif'],
        'elegant': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-tajawal)', 'var(--font-playfair)', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-xl': ['7.5rem', { lineHeight: '0.95', letterSpacing: '-0.05em' }],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'liquid-fill': 'liquidFill 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'neon-glow': 'neonGlow 2s ease-in-out infinite',
        'zoom-in': 'zoomIn 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'page-reveal': 'pageReveal 1s cubic-bezier(0.4, 0, 0.2, 1)',
        '3d-tilt': 'tilt3D 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        liquidFill: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        neonGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(32, 178, 170, 0.5), 0 0 40px rgba(32, 178, 170, 0.3), 0 0 60px rgba(32, 178, 170, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(32, 178, 170, 0.8), 0 0 60px rgba(32, 178, 170, 0.5), 0 0 90px rgba(32, 178, 170, 0.2)' 
          },
        },
        zoomIn: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.1)', opacity: '1' },
        },
        pageReveal: {
          '0%': { clipPath: 'inset(0 0 100% 0)' },
          '100%': { clipPath: 'inset(0 0 0% 0)' },
        },
        tilt3D: {
          '0%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)' },
        },
      },
      boxShadow: {
        'elegant': '0 20px 60px -12px rgba(46, 95, 110, 0.12), 0 0 0 1px rgba(46, 95, 110, 0.05)',
        'elegant-lg': '0 30px 80px -12px rgba(46, 95, 110, 0.15), 0 0 0 1px rgba(46, 95, 110, 0.08)',
        'brand': '0 15px 40px -10px rgba(70, 134, 141, 0.3)',
        'brand-lg': '0 25px 60px -10px rgba(70, 134, 141, 0.4)',
        'luxury': '0 30px 100px -20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(70, 134, 141, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'luxury-lg': '0 50px 150px -30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(70, 134, 141, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.8)',
        'neon': '0 0 20px rgba(70, 134, 141, 0.5), 0 0 40px rgba(70, 134, 141, 0.3), 0 0 60px rgba(70, 134, 141, 0.1)',
        'neon-lg': '0 0 30px rgba(70, 134, 141, 0.8), 0 0 60px rgba(70, 134, 141, 0.5), 0 0 90px rgba(70, 134, 141, 0.2)',
        'glass': '0 8px 32px 0 rgba(70, 134, 141, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        'glass-lg': '0 12px 48px 0 rgba(70, 134, 141, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.6)',
      },
      backdropBlur: {
        'glass': '10px',
        'glass-lg': '20px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'turquoise-gradient': 'linear-gradient(135deg, #46868d 0%, #2e5f6e 100%)',
        'mint-gradient': 'linear-gradient(135deg, #46868d 0%, #5da3ab 100%)',
      },
      spacing: {
        'section': '8rem',
        'section-sm': '4rem',
        'section-lg': '12rem',
        'card': '2rem',
        'card-sm': '1rem',
        'card-lg': '3rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'glass': '1rem',
        'glass-lg': '1.5rem',
        'glass-xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
