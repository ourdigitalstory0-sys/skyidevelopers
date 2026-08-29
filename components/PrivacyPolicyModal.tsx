'use client';

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock, Globe, ExternalLink } from 'lucide-react';
import './PrivacyPolicyModal.css';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RERA_PROJECT_REGISTRATIONS = [
  {
    name: 'Skyi Songbirds (Ph A, B, E & Extensions)',
    location: 'Bhugaon Foothills, Paud Road, Pune',
    type: 'Eco-Township Residences',
    rera: 'P52100000769, P52100001117, P52100019348, P52100047992, P52100000764, P52100000643, P52100000805',
    status: 'Delivered & Ongoing',
  },
  {
    name: 'SKYi Manas Lake (Ph II, III, VI, VIII & Plotting)',
    location: 'Manas Lake Campus, Bhukum, Paud Road, Pune',
    type: 'Lakefront Township & PMRDA NA Plots',
    rera: 'P52100000513, P52100000514, P52100026954, P52100052033, P52100079680',
    status: 'Delivered & Launching Soon',
  },
  {
    name: 'SKYi Star City (Ph I, II, III, IV, V)',
    location: 'Dhayari Hillside, Sinhagad Road, Pune',
    type: 'Integrated Residential Township',
    rera: 'P52100026727, P52100029481, P52100029474, P52100034274, P52100050099',
    status: 'Delivered & OC Received',
  },
  {
    name: 'SKYi Iris & Iris Riverside',
    location: 'Baner / Bhugaon, Pune',
    type: 'Luxury Boutique Residences',
    rera: 'P52100019348',
    status: 'Delivered & OC Received',
  },
  {
    name: 'SKYi Park & SKYi Five Baner',
    location: 'Baner-Pashan Link Road, Baner, Pune',
    type: 'Urban Luxury Towers',
    rera: 'P52100000449 / Sanctioned Layout',
    status: 'Delivered & OC Received',
  },
  {
    name: 'SKYi Tigers Nest & PWC Towers',
    location: 'Bhugaon Hilltop / Songbirds Campus, Pune',
    type: 'Hillside Sanctuary & Club Homes',
    rera: 'P52100000769, P52100000643, P52100000805',
    status: 'Ongoing & Ready Phases',
  },
  {
    name: 'SKYi PMRDA NA Bungalow Plot Estates (Bhukum, Pirangut, Kasarsai, Sus, Talegaon, Khadakwasla, Wagholi)',
    location: 'West & East Pune Strategic Growth Corridors',
    type: 'PMRDA Sanctioned Collector NA Villa Plots',
    rera: 'PMRDA Sanctioned Collector NA Layouts / 100% Clear Title 7/12 Extracts',
    status: 'Clear Title / Immediate Registration',
  },
];

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
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
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
                <h2 id="privacy-modal-title">MahaRERA Disclosures &amp; Legal Compliance</h2>
                <p>Official Project Registrations, PMRDA Sanctions, FEMA/RBI Guidelines &amp; Privacy Policy</p>
              </div>
            </div>

            <div className="privacy-body">
              {/* 1. MahaRERA Master Table */}
              <section className="privacy-section">
                <h3><FileText size={16} /> 1. MahaRERA Official Project Registrations</h3>
                <p style={{ marginBottom: '12px' }}>
                  All projects by <strong>Skyi Developers (SKYi)</strong> are strictly registered under the Maharashtra Real Estate Regulatory Authority (MahaRERA) in compliance with the Real Estate (Regulation and Development) Act. Project details, sanctioned layout plans, quarterly progress reports, and title search reports are available on the official MahaRERA portal:
                </p>

                <div className="rera-verification-link-box">
                  <a
                    href="https://maharera.mahaonline.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rera-portal-btn"
                  >
                    <ExternalLink size={15} /> Visit MahaRERA Official Website (maharera.mahaonline.gov.in)
                  </a>
                </div>

                <div className="privacy-rera-table-wrap">
                  <table className="privacy-rera-table">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>MahaRERA Reg. Number(s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RERA_PROJECT_REGISTRATIONS.map((proj) => (
                        <tr key={proj.name}>
                          <td><strong>{proj.name}</strong></td>
                          <td>{proj.location}</td>
                          <td><span className="table-type-badge">{proj.type}</span></td>
                          <td><code>{proj.rera}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2. Clear Title & PMRDA Sanction */}
              <section className="privacy-section">
                <h3><ShieldCheck size={16} /> 2. 100% Clear Title &amp; PMRDA Collector NA Sanction</h3>
                <p>
                  Every plotted development and residential township developed by SKYi undergoes a rigorous 30-year title search by senior legal advocates. NA Bungalow plots feature individual 7/12 extract demarcation, registered Property Cards (PR Card), sanctioned FSI up to 1.5+, and pre-approved home and plot purchase loans from State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Maharashtra.
                </p>
              </section>

              {/* 3. FEMA & NRI Regulations */}
              <section className="privacy-section">
                <h3><Globe size={16} /> 3. FEMA &amp; RBI Guidelines for NRI / OCI Buyers</h3>
                <p>
                  Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) holding valid Indian passports can purchase residential properties and PMRDA-approved NA bungalow plots under FEMA (Foreign Exchange Management Act) and RBI general permission. Repatriation of sale proceeds is permitted up to USD 1 Million per financial year via NRE/NRO banking channels.
                </p>
              </section>

              {/* 4. Privacy & Data Protection */}
              <section className="privacy-section">
                <h3><Lock size={16} /> 4. Data Protection &amp; Confidentiality</h3>
                <p>
                  We respect your privacy. Personal information collected through inquiry forms, site visit bookings, or financial calculators (Name, Phone Number, Email) is used exclusively by authorized SKYi property advisors for consultation. We never sell, rent, or trade customer information to unauthorized third-party marketing agencies.
                </p>
              </section>
            </div>

            <div className="privacy-footer" style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button type="button" className="btn-primary" onClick={onClose}>
                I Acknowledge &amp; Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
