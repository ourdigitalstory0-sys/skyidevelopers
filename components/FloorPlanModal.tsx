'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Compass, Maximize2, Check, Calendar } from 'lucide-react';
import './FloorPlanModal.css';

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
  onBookVisit: () => void;
}

const FLOOR_PLANS = [
  {
    type: '2 BHK Luxury Residence',
    carpetArea: '845 - 920 Sq.Ft.',
    balcony: 'Dual Scenic Decks',
    facing: 'East / West Facing (Vastu Compliant)',
    priceStarting: '₹ 68 Lakhs*',
    specs: ['Spacious Living & Dining Area', 'Master Suite with Walk-in Closet', 'Modular Kitchen with Utility Area', 'IGBC Platinum Certified Fittings'],
    blueprintSvg: (
      <svg viewBox="0 0 400 300" className="blueprint-svg">
        <rect x="10" y="10" width="380" height="280" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
        {/* Living Room */}
        <rect x="30" y="30" width="200" height="150" fill="rgba(59, 130, 246, 0.15)" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="130" y="110" fill="#93c5fd" fontSize="14" textAnchor="middle">Living & Dining Room</text>
        {/* Master Bedroom */}
        <rect x="240" y="30" width="130" height="150" fill="rgba(16, 185, 129, 0.15)" stroke="#34d399" strokeWidth="1.5" />
        <text x="305" y="110" fill="#a7f3d0" fontSize="12" textAnchor="middle">Master Bedroom</text>
        {/* Bedroom 2 */}
        <rect x="30" y="190" width="150" height="90" fill="rgba(245, 158, 11, 0.15)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="105" y="240" fill="#fde68a" fontSize="12" textAnchor="middle">Bedroom 2</text>
        {/* Kitchen */}
        <rect x="190" y="190" width="100" height="90" fill="rgba(236, 72, 153, 0.15)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="240" y="240" fill="#fbcfe8" fontSize="12" textAnchor="middle">Kitchen</text>
        {/* Deck */}
        <rect x="300" y="190" width="70" height="90" fill="rgba(168, 85, 247, 0.15)" stroke="#c084fc" strokeWidth="1.5" />
        <text x="335" y="240" fill="#e9d5ff" fontSize="11" textAnchor="middle">Deck</text>
      </svg>
    ),
  },
  {
    type: '3 BHK Premium Sanctuary',
    carpetArea: '1240 - 1380 Sq.Ft.',
    balcony: 'Wrap-around Forest View Balcony',
    facing: 'North-East Facing (Vastu Compliant)',
    priceStarting: '₹ 1.15 Crores*',
    specs: ['3 Attached Bathrooms', 'Private Foyer Entrance', 'Zero Dead Space Floor Plan', 'EV Charging Point Access'],
    blueprintSvg: (
      <svg viewBox="0 0 400 300" className="blueprint-svg">
        <rect x="10" y="10" width="380" height="280" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
        {/* Grand Foyer */}
        <rect x="30" y="30" width="80" height="120" fill="rgba(99, 102, 241, 0.15)" stroke="#818cf8" strokeWidth="1.5" />
        <text x="70" y="90" fill="#c7d2fe" fontSize="11" textAnchor="middle">Foyer</text>
        {/* Grand Living */}
        <rect x="120" y="30" width="150" height="140" fill="rgba(59, 130, 246, 0.15)" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="195" y="105" fill="#93c5fd" fontSize="13" textAnchor="middle">Grand Living</text>
        {/* Master Bedroom */}
        <rect x="280" y="30" width="90" height="140" fill="rgba(16, 185, 129, 0.15)" stroke="#34d399" strokeWidth="1.5" />
        <text x="325" y="105" fill="#a7f3d0" fontSize="11" textAnchor="middle">Master Suite</text>
        {/* Bedroom 2 */}
        <rect x="30" y="180" width="110" height="100" fill="rgba(245, 158, 11, 0.15)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="85" y="235" fill="#fde68a" fontSize="11" textAnchor="middle">Bedroom 2</text>
        {/* Bedroom 3 */}
        <rect x="150" y="180" width="110" height="100" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="205" y="235" fill="#bae6fd" fontSize="11" textAnchor="middle">Bedroom 3</text>
        {/* Kitchen + Utility */}
        <rect x="270" y="180" width="100" height="100" fill="rgba(236, 72, 153, 0.15)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="320" y="235" fill="#fbcfe8" fontSize="11" textAnchor="middle">Kitchen + Utility</text>
      </svg>
    ),
  },
  {
    type: '4 BHK Sky Mansion / Penthouse',
    carpetArea: '1850 - 2200 Sq.Ft.',
    balcony: 'Private Sky Terrace',
    facing: '360° Panoramic Lake & Forest Facing',
    priceStarting: '₹ 1.85 Crores*',
    specs: ['Double Height Ceiling Living Room', 'Staff / Servant Room & Toilet', 'Private Elevator Access', 'Smart Home Touch Automation'],
    blueprintSvg: (
      <svg viewBox="0 0 400 300" className="blueprint-svg">
        <rect x="10" y="10" width="380" height="280" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
        {/* Sky Terrace */}
        <rect x="30" y="30" width="340" height="60" fill="rgba(16, 185, 129, 0.2)" stroke="#34d399" strokeWidth="2" />
        <text x="200" y="65" fill="#a7f3d0" fontSize="13" textAnchor="middle">Panoramic Sky Terrace Deck</text>
        {/* Double Height Living */}
        <rect x="30" y="100" width="190" height="100" fill="rgba(59, 130, 246, 0.15)" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="125" y="155" fill="#93c5fd" fontSize="13" textAnchor="middle">Double Height Living</text>
        {/* Master Suite */}
        <rect x="230" y="100" width="140" height="100" fill="rgba(168, 85, 247, 0.15)" stroke="#c084fc" strokeWidth="1.5" />
        <text x="300" y="155" fill="#e9d5ff" fontSize="12" textAnchor="middle">Royal Master Suite</text>
        {/* Bedrooms 2 & 3 */}
        <rect x="30" y="210" width="160" height="70" fill="rgba(245, 158, 11, 0.15)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="110" y="250" fill="#fde68a" fontSize="11" textAnchor="middle">Guest & Kids Suites</text>
        {/* Chef Kitchen */}
        <rect x="200" y="210" width="170" height="70" fill="rgba(236, 72, 153, 0.15)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="285" y="250" fill="#fbcfe8" fontSize="11" textAnchor="middle">Chef's Kitchen & Maid Room</text>
      </svg>
    ),
  },
  {
    type: 'NA Bungalow Plot (Bhukum / Manas Lake)',
    carpetArea: '1,800 - 4,500 Sq.Ft. Plot Area',
    balcony: 'Private Garden & Promenade Boundary',
    facing: 'Lake Facing & North-East Vastu Compliant',
    priceStarting: 'Price On Request (Launching Soon)',
    specs: ['100% PMRDA Sanctioned Clear Title NA Status', 'Underground Utilities (Water, Electricity, Fiber Internet)', 'Gated Security Entry with 90-Acre Township Access', 'Custom Bungalow & Villa Architectural Freedom'],
    blueprintSvg: (
      <svg viewBox="0 0 400 300" className="blueprint-svg">
        <rect x="10" y="10" width="380" height="280" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />
        {/* Plot Boundary */}
        <rect x="30" y="30" width="340" height="240" fill="rgba(16, 185, 129, 0.1)" stroke="#34d399" strokeWidth="2" />
        <text x="200" y="55" fill="#a7f3d0" fontSize="13" textAnchor="middle">Clear Title NA Plot Boundary (40ft x 60ft)</text>
        {/* Proposed Villa Footprint */}
        <rect x="70" y="80" width="200" height="130" fill="rgba(59, 130, 246, 0.2)" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="170" y="150" fill="#93c5fd" fontSize="12" textAnchor="middle">Proposed Villa Built-up Area</text>
        {/* Landscaped Garden */}
        <rect x="280" y="80" width="70" height="180" fill="rgba(245, 158, 11, 0.15)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="315" y="175" fill="#fde68a" fontSize="11" textAnchor="middle">Lakeside Lawn</text>
        {/* Driveway */}
        <rect x="70" y="220" width="200" height="40" fill="rgba(148, 163, 184, 0.15)" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="170" y="245" fill="#cbd5e1" fontSize="11" textAnchor="middle">Private Carport Driveway</text>
      </svg>
    ),
  },
];

export default function FloorPlanModal({
  isOpen,
  onClose,
  projectTitle = 'Skyi Songbirds',
  onBookVisit,
}: FloorPlanModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

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
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const plan = FLOOR_PLANS[selectedPlanIdx];

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
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
            className="floor-plan-modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="floor-modal-title"
          >
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="floor-modal-header">
              <span className="modal-badge">{projectTitle} Floor Plans</span>
              <h2 id="floor-modal-title">Architectural Blueprints & Layouts</h2>
              <p>Optimum natural ventilation, zero space wastage, and Vastu compliant layouts.</p>

              {/* Tabs */}
              <div className="plan-tabs" role="tablist">
                {FLOOR_PLANS.map((item, idx) => (
                  <button
                    key={item.type}
                    role="tab"
                    aria-selected={selectedPlanIdx === idx}
                    className={`plan-tab ${selectedPlanIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedPlanIdx(idx)}
                  >
                    {item.type.split(' ')[0]} {item.type.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            <div className="floor-plan-content-grid">
              {/* Blueprint Display */}
              <div className="blueprint-container">
                <div className="blueprint-badge"><Compass size={14} /> Vastu Compliant</div>
                {plan.blueprintSvg}
                <div className="blueprint-caption">
                  <Maximize2 size={14} /> Interactive Blueprint View ({plan.type})
                </div>
              </div>

              {/* Specs & Highlights */}
              <div className="floor-specs-container">
                <h3>{plan.type}</h3>
                <div className="price-tag">{plan.priceStarting}</div>

                <div className="specs-metrics">
                  <div className="spec-box">
                    <span className="spec-lbl">Carpet Area</span>
                    <span className="spec-val">{plan.carpetArea}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-lbl">Balcony</span>
                    <span className="spec-val">{plan.balcony}</span>
                  </div>
                  <div className="spec-box full">
                    <span className="spec-lbl">Orientation</span>
                    <span className="spec-val">{plan.facing}</span>
                  </div>
                </div>

                <div className="specs-list">
                  <h4>Key Layout Features</h4>
                  <ul>
                    {plan.specs.map((spec) => (
                      <li key={spec}>
                        <Check size={14} className="check-icon" /> {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-action-buttons">
                  <motion.button
                    className="download-brochure-btn"
                    onClick={handleDownload}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={16} />
                    <span>{downloaded ? 'Brochure Downloading...' : 'Download Full PDF Brochure'}</span>
                  </motion.button>

                  <motion.button
                    className="book-modal-visit-btn"
                    onClick={() => {
                      onClose();
                      onBookVisit();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar size={16} />
                    <span>Book Sample Flat Tour</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
