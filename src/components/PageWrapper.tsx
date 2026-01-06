'use client';

import { useState, useEffect } from 'react';
import ContactFormModal from './ContactFormModal';

interface PageWrapperProps {
  children: React.ReactNode;
  locale: string;
}

export default function PageWrapper({ children, locale }: PageWrapperProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'guidance' | 'brochure';
    projectId?: number;
  }>({
    isOpen: false,
    type: 'guidance',
  });

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setModalState({
        isOpen: true,
        type: event.detail.type,
        projectId: event.detail.projectId,
      });
    };

    window.addEventListener('openModal', handleOpenModal as EventListener);
    return () => {
      window.removeEventListener('openModal', handleOpenModal as EventListener);
    };
  }, []);

  return (
    <>
      {children}
      <ContactFormModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        type={modalState.type}
        locale={locale}
      />
    </>
  );
}

