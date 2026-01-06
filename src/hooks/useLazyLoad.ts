'use client';

import { useEffect, useRef, useState } from 'react';

export function useLazyLoad<T extends HTMLElement = HTMLImageElement>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isLoaded, options]);

  return [elementRef, isLoaded];
}



