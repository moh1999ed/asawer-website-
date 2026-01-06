'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '' 
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const startValue = 0;
    const endValue = value;
    const startTime = performance.now();
    startTimeRef.current = startTime;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;

      const elapsed = (currentTime - startTimeRef.current) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, value, duration]);

  const formatNumber = (num: number): string => {
    if (decimals === 0) {
      return Math.floor(num).toLocaleString();
    }
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <span ref={ref}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}
