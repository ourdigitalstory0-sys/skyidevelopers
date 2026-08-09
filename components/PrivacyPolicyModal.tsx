'use client';

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock, Globe } from 'lucide-react';
import './PrivacyPolicyModal.css';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  /* Keyboard ESC & Focus Trap Listener */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        const firstBtn = modalRef.current?.querySelector<HTMLElement>('button');
        firstBtn?.focus();
      }, 100);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="privacy-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            className="privacy-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
          >
            <button
              type="button"
              className="privacy-close-btn"
              onClick={onClose}
              aria-label="Close Privacy Policy Modal"
            >
              <X size={20} />
            </button>

            <div className="privacy-header">
              <div className="privacy-icon-wrap"><ShieldCheck size={24} /></div>
              <div>
                <h2 id="privacy-modal-title">Legal Disclosures &amp; Privacy Policy</h2>
                <p>MahaRERA Registration, FEMA/RBI Disclaimers &amp; Data Protection</p>
              </div>
            </div>

            <div className="privacy-body">
              <section className="privacy-section">
                <h3><FileText size={16} /> 1. MahaRERA Legal Compliance &amp; Disclosures</h3>
                <p>
                  All projects by <strong>Skyi Developers (SKYi)</strong> are registered under MahaRERA (Maharashtra Real Estate Regulatory Authority).
                  Project RERA registration details, approved floor plans, title certificates, and sanctioned layout documents are available on the official MahaRERA portal (maharera.mahaonline.gov.in).
                </p>
              </section>

              <section className="privacy-section">
                <h3><Globe size={16} /> 2. FEMA &amp; RBI Guidelines for NRI Investors</h3>
                <p>
                  Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) holding valid Indian passports can purchase residential properties and PMRDA-approved NA bungalow plots under FEMA (Foreign Exchange Management Act) and RBI general permission. Repatriation of sale proceeds is permitted up to USD 1 Million per financial year via NRE/NRO banking channels.
                </p>
              </section>

              <section className="privacy-section">
                <h3><Lock size={16} /> 3. Data Protection &amp; Cookie Policy</h3>
                <p>
                  We respect your personal privacy. Information collected through site visit forms, mortgage calculators, or inquiry forms (Name, Mobile, Email) is used exclusively by SKYi sales advisors for customer service and consultation. We do not sell or share customer data with unauthorized third parties.
                </p>
              </section>
            </div>

            <div className="privacy-footer" style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button type="button" className="btn-primary" onClick={onClose}>
                I Understand &amp; Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
