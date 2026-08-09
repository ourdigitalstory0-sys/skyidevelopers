'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Check, ArrowRight, Building2 } from 'lucide-react';
import './AIMatchmakerModal.css';

interface AIMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectName: string) => void;
}

export default function AIMatchmakerModal({ isOpen, onClose, onSelectProject }: AIMatchmakerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<'plot' | 'flat' | 'luxury'>('plot');
  const [budget, setBudget] = useState<'45L-75L' | '75L-1.5Cr' | '1.5Cr+'>('75L-1.5Cr');

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

  const handleMatch = () => {
    let matchedProject = 'SKYi Manas Lake NA Bungalow Plots (Bhukum)';
    if (goal === 'flat' && budget === '45L-75L') matchedProject = 'Skyi Star City (Dhayari)';
    else if (goal === 'flat' && budget === '75L-1.5Cr') matchedProject = 'SKYi Manas Lake (Bavdhan)';
    else if (goal === 'luxury') matchedProject = 'Skyi Songbirds & SKYi Tigers Nest (Bhugaon)';
    else if (goal === 'plot') matchedProject = 'SKYi Manas Lake NA Bungalow Plots (Bhukum)';

    onSelectProject(matchedProject);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ai-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            className="ai-modal-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-matchmaker-title"
          >
            <button type="button" className="ai-close-btn" onClick={onClose} aria-label="Close AI Matchmaker">
              <X size={20} />
            </button>

            <div className="ai-modal-header">
              <div className="ai-sparkle-icon"><Sparkles size={24} /></div>
              <h2 id="ai-matchmaker-title">AI Property Matchmaker</h2>
              <p>Find your ideal SKYi development in Pune in under 30 seconds</p>
            </div>

            <div className="ai-body">
              {step === 1 && (
                <div className="ai-step">
                  <h3>Step 1: What is your primary investment goal?</h3>
                  <div className="ai-options-grid">
                    <button
                      type="button"
                      className={`ai-option-btn ${goal === 'plot' ? 'active' : ''}`}
                      onClick={() => setGoal('plot')}
                    >
                      <Building2 size={20} />
                      <div>
                        <strong className="option-title">PMRDA NA Villa Plot</strong>
                        <span className="option-sub">Construct a bespoke multi-story bungalow</span>
                      </div>
                      {goal === 'plot' && <Check size={18} className="ai-check" />}
                    </button>

                    <button
                      type="button"
                      className={`ai-option-btn ${goal === 'flat' ? 'active' : ''}`}
                      onClick={() => setGoal('flat')}
                    >
                      <Building2 size={20} />
                      <div>
                        <strong className="option-title">Modern Apartment</strong>
                        <span className="option-sub">2 &amp; 3 BHK Zero Waste Township Home</span>
                      </div>
                      {goal === 'flat' && <Check size={18} className="ai-check" />}
                    </button>

                    <button
                      type="button"
                      className={`ai-option-btn ${goal === 'luxury' ? 'active' : ''}`}
                      onClick={() => setGoal('luxury')}
                    >
                      <Building2 size={20} />
                      <div>
                        <strong className="option-title">Luxury Hillside Sanctuary</strong>
                        <span className="option-sub">3 &amp; 4 BHK Forest Deck Residences</span>
                      </div>
                      {goal === 'luxury' && <Check size={18} className="ai-check" />}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="ai-step">
                  <h3>Step 2: What is your preferred budget range?</h3>
                  <div className="ai-options-grid">
                    <button
                      type="button"
                      className={`ai-option-btn ${budget === '45L-75L' ? 'active' : ''}`}
                      onClick={() => setBudget('45L-75L')}
                    >
                      <div>
                        <strong className="option-title">₹ 45 Lakhs — ₹ 75 Lakhs</strong>
                        <span className="option-sub">Ideal for starter homes &amp; compact NA plots</span>
                      </div>
                      {budget === '45L-75L' && <Check size={18} className="ai-check" />}
                    </button>

                    <button
                      type="button"
                      className={`ai-option-btn ${budget === '75L-1.5Cr' ? 'active' : ''}`}
                      onClick={() => setBudget('75L-1.5Cr')}
                    >
                      <div>
                        <strong className="option-title">₹ 75 Lakhs — ₹ 1.5 Crores</strong>
                        <span className="option-sub">Ideal for 2,500 sq.ft NA villa plots &amp; 3 BHK</span>
                      </div>
                      {budget === '75L-1.5Cr' && <Check size={18} className="ai-check" />}
                    </button>

                    <button
                      type="button"
                      className={`ai-option-btn ${budget === '1.5Cr+' ? 'active' : ''}`}
                      onClick={() => setBudget('1.5Cr+')}
                    >
                      <div>
                        <strong className="option-title">₹ 1.5 Crores +</strong>
                        <span className="option-sub">Ultra mansion plots &amp; 4 BHK hillside decks</span>
                      </div>
                      {budget === '1.5Cr+' && <Check size={18} className="ai-check" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="ai-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              {step === 1 ? (
                <button type="button" className="btn-primary" onClick={() => setStep(2)}>
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button type="button" className="btn-primary" onClick={handleMatch}>
                  Get Best AI Match &amp; Schedule Tour
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
