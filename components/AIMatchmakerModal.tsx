'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Check, ArrowRight, Building2 } from 'lucide-react';
import './AIMatchmakerModal.css';

interface AIMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectName: string) => void;
}

export default function AIMatchmakerModal({ isOpen, onClose, onSelectProject }: AIMatchmakerModalProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<'plot' | 'flat' | 'luxury'>('plot');
  const [budget, setBudget] = useState<'45L-75L' | '75L-1.5Cr' | '1.5Cr+'>('75L-1.5Cr');

  if (!isOpen) return null;

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
      <div className="ai-modal-backdrop" onClick={onClose}>
        <motion.div
          className="ai-modal-card glass"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
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
                    className={`ai-opt-btn ${goal === 'plot' ? 'active' : ''}`}
                    onClick={() => setGoal('plot')}
                  >
                    <Building2 size={20} />
                    <div>
                      <strong>PMRDA NA Villa Plot</strong>
                      <span>Construct a bespoke multi-story bungalow</span>
                    </div>
                    {goal === 'plot' && <Check size={18} className="ai-check" />}
                  </button>

                  <button
                    type="button"
                    className={`ai-opt-btn ${goal === 'flat' ? 'active' : ''}`}
                    onClick={() => setGoal('flat')}
                  >
                    <Building2 size={20} />
                    <div>
                      <strong>Modern Apartment</strong>
                      <span>2 &amp; 3 BHK Zero Waste Township Home</span>
                    </div>
                    {goal === 'flat' && <Check size={18} className="ai-check" />}
                  </button>

                  <button
                    type="button"
                    className={`ai-opt-btn ${goal === 'luxury' ? 'active' : ''}`}
                    onClick={() => setGoal('luxury')}
                  >
                    <Building2 size={20} />
                    <div>
                      <strong>Luxury Hillside Sanctuary</strong>
                      <span>3 &amp; 4 BHK Forest Deck Residences</span>
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
                    className={`ai-opt-btn ${budget === '45L-75L' ? 'active' : ''}`}
                    onClick={() => setBudget('45L-75L')}
                  >
                    <div>
                      <strong>₹ 45 Lakhs — ₹ 75 Lakhs</strong>
                      <span>Ideal for starter homes &amp; compact NA plots</span>
                    </div>
                    {budget === '45L-75L' && <Check size={18} className="ai-check" />}
                  </button>

                  <button
                    type="button"
                    className={`ai-opt-btn ${budget === '75L-1.5Cr' ? 'active' : ''}`}
                    onClick={() => setBudget('75L-1.5Cr')}
                  >
                    <div>
                      <strong>₹ 75 Lakhs — ₹ 1.5 Crores</strong>
                      <span>Ideal for 2,500 sq.ft NA villa plots &amp; 3 BHK</span>
                    </div>
                    {budget === '75L-1.5Cr' && <Check size={18} className="ai-check" />}
                  </button>

                  <button
                    type="button"
                    className={`ai-opt-btn ${budget === '1.5Cr+' ? 'active' : ''}`}
                    onClick={() => setBudget('1.5Cr+')}
                  >
                    <div>
                      <strong>₹ 1.5 Crores +</strong>
                      <span>Ultra mansion plots &amp; 4 BHK hillside decks</span>
                    </div>
                    {budget === '1.5Cr+' && <Check size={18} className="ai-check" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="ai-footer">
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
      </div>
    </AnimatePresence>
  );
}
