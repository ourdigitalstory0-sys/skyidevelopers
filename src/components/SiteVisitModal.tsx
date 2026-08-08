import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Phone, User, CheckCircle2, Car, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { sanitizeInput, safeSessionStorage } from '../utils/security';
import './SiteVisitModal.css';

const DRAFT_KEY = 'skyi_site_visit_draft';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

const PROJECTS = [
  'Skyi Songbirds (Bhugaon)',
  'Skyi Manas Lake (Bavdhan / Paud Rd)',
  'Skyi Star City (Dhayari)',
  'Skyi NA Plots (Paud Road)',
];

const TIME_SLOTS = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
];

export default function SiteVisitModal({ isOpen, onClose, defaultProject }: SiteVisitModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState(() => {
    const savedDraft = safeSessionStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        return {
          name: parsed.name || '',
          phone: parsed.phone || '',
          email: parsed.email || '',
          project: parsed.project || defaultProject || PROJECTS[0],
          date: parsed.date || new Date().toISOString().split('T')[0],
          timeSlot: parsed.timeSlot || TIME_SLOTS[0],
          pickupNeeded: Boolean(parsed.pickupNeeded),
        };
      } catch {
        // Fallback if parsing fails
      }
    }
    return {
      name: '',
      phone: '',
      email: '',
      project: defaultProject || PROJECTS[0],
      date: new Date().toISOString().split('T')[0],
      timeSlot: TIME_SLOTS[0],
      pickupNeeded: false,
    };
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  /* Save draft changes to sessionStorage */
  useEffect(() => {
    if (formData.name || formData.phone || formData.email) {
      safeSessionStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  /* Update default project if prop changes */
  useEffect(() => {
    if (defaultProject && PROJECTS.includes(defaultProject)) {
      setFormData((prev) => ({ ...prev, project: defaultProject }));
    }
  }, [defaultProject]);

  /* Keyboard ESC & Focus Trap Listener */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap management
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
      window.addEventListener('keydown', handleKeyDown);
      // Auto-focus first input after animation
      const timer = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector<HTMLElement>('input, select');
        firstInput?.focus();
      }, 100);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, handleKeyDown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission

    setValidationError(null);

    const cleanName = sanitizeInput(formData.name);
    const cleanPhone = sanitizeInput(formData.phone).replace(/[\s\-()+]/g, '');
    const cleanEmail = sanitizeInput(formData.email);

    /* Validation Hardening */
    if (cleanName.length < 2) {
      setValidationError('Please enter a valid full name (minimum 2 characters).');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setValidationError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    if (cleanEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        setValidationError('Please enter a valid email address.');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate safe API submission delay
    setTimeout(() => {
      const ref = 'SK-VISIT-' + Math.floor(100000 + Math.random() * 900000);
      safeSessionStorage.removeItem(DRAFT_KEY);
      setBookingRef(ref);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setValidationError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            className="site-visit-modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="visit-modal-title"
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            {!submitted ? (
              <div className="site-visit-content">
                <div className="modal-header">
                  <span className="modal-badge">VIP Guided Tour</span>
                  <h2 id="visit-modal-title">Schedule a Site Visit</h2>
                  <p>Experience Pune's finest sustainable developments in person with complimentary pickup.</p>
                </div>

                {validationError && (
                  <div className="form-error-banner" role="alert">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="visit-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="modal-project-select"><MapPin size={16} /> Select Project</label>
                    <select
                      id="modal-project-select"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      disabled={isSubmitting}
                      required
                    >
                      {PROJECTS.map((proj) => (
                        <option key={proj} value={proj}>{proj}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="modal-name"><User size={16} /> Full Name *</label>
                      <input
                        id="modal-name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        required
                        maxLength={60}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="modal-phone"><Phone size={16} /> Phone Number *</label>
                      <input
                        id="modal-phone"
                        type="tel"
                        placeholder="10-digit Mobile No."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        required
                        maxLength={13}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="modal-email"><Mail size={16} /> Email Address (Optional)</label>
                      <input
                        id="modal-email"
                        type="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        maxLength={80}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="modal-timeslot"><Clock size={16} /> Time Slot</label>
                      <select
                        id="modal-timeslot"
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        disabled={isSubmitting}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="modal-date"><Calendar size={16} /> Preferred Date</label>
                      <input
                        id="modal-date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.pickupNeeded}
                        onChange={(e) => setFormData({ ...formData, pickupNeeded: e.target.checked })}
                        disabled={isSubmitting}
                      />
                      <span className="checkbox-custom"><Car size={14} /></span>
                      <span>Request complimentary AC cab pickup & drop-off</span>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="btn-loading-text">
                        <Loader2 size={18} className="spinner" /> Processing Request...
                      </span>
                    ) : (
                      'Confirm VIP Site Visit'
                    )}
                  </motion.button>

                  <p className="form-disclaimer">
                    🔒 Your contact details are safe. Our dedicated relationship executive will contact you shortly.
                  </p>
                </form>
              </div>
            ) : (
              <div className="visit-success-state">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="success-icon"
                >
                  <CheckCircle2 size={64} />
                </motion.div>
                <h3>Site Visit Scheduled!</h3>
                <p className="success-subtitle">We look forward to hosting you at {formData.project}.</p>

                <div className="booking-details-card">
                  <div className="detail-row">
                    <span>Booking Ref:</span>
                    <strong>{bookingRef}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Visitor Name:</span>
                    <strong>{formData.name}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Date & Time:</span>
                    <strong>{formData.date} | {formData.timeSlot}</strong>
                  </div>
                  <div className="detail-row">
                    <span>AC Cab Pickup:</span>
                    <strong>{formData.pickupNeeded ? 'Yes (Requested)' : 'Self Drive'}</strong>
                  </div>
                </div>

                <motion.button
                  className="close-success-btn"
                  onClick={resetForm}
                  whileHover={{ scale: 1.03 }}
                >
                  Done
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
