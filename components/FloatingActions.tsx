'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageSquare, ArrowUp } from 'lucide-react';
import './FloatingActions.css';

interface FloatingActionsProps {
  onOpenVisitModal: () => void;
}

export default function FloatingActions({ onOpenVisitModal }: FloatingActionsProps) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = 'https://wa.me/912066143000?text=' + encodeURIComponent('Hi Skyi Developers, I would like to inquire about Songbirds / Manas Lake project details.');

  return (
    <div className="floating-actions-container">
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            className="floating-btn top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat on WhatsApp"
        title="Instant WhatsApp Consultation"
      >
        <MessageSquare size={22} />
        <span className="floating-tooltip">Chat on WhatsApp</span>
      </motion.a>

      <motion.button
        className="floating-btn visit-btn"
        onClick={onOpenVisitModal}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Book VIP Site Visit"
        title="Schedule VIP Visit"
      >
        <Calendar size={22} />
        <span className="floating-badge-text">Book Visit</span>
      </motion.button>
    </div>
  );
}
