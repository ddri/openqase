'use client';

import { useEffect } from 'react';

interface TallyModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  title: string;
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: any) => void;
    };
  }
}

export function TallyModal({ isOpen, onClose, formId, title }: TallyModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Load Tally script if not already loaded
      if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
          // Open popup when script loads
          if (window.Tally) {
            window.Tally.openPopup(formId, {
              layout: 'modal',
              width: 700,
              onClose: () => {
                onClose();
              }
            });
          }
        };
        document.head.appendChild(script);
      } else {
        // Script already loaded, open popup immediately
        if (window.Tally) {
          window.Tally.openPopup(formId, {
            layout: 'modal',
            width: 700,
            onClose: () => {
              onClose();
            }
          });
        }
      }
    }
  }, [isOpen, formId, onClose]);

  // This component doesn't render anything - it just triggers the Tally popup
  return null;
}