'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, CheckCircle2, ShieldCheck, Tag, FileText, Landmark, Compass } from 'lucide-react';
import { PROGRAMMATIC_SEO_ITEMS, CORRIDORS_LIST, PROPERTY_TYPES, PUNE_MICRO_LOCATIONS } from '../utils/programmaticSeo';
import './ProgrammaticSEOSection.css';

interface ProgrammaticSEOSectionProps {
  onBookVisit?: (projectName?: string) => void;
}

export default function ProgrammaticSEOSection({ onBookVisit }: ProgrammaticSEOSectionProps) {
  const [selectedCorridor, setSelectedCorridor] = useState('All Corridors');
  const [selectedType, setSelectedType] = useState('All Property Types');
  const [selectedMicroLoc, setSelectedMicroLoc] = useState('All Micro-Locations');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = PROGRAMMATIC_SEO_ITEMS.filter((item) => {
    const matchCorridor = selectedCorridor === 'All Corridors' || item.corridor === selectedCorridor;
    const matchType = selectedType === 'All Property Types' || item.type === selectedType;
    const matchMicro = selectedMicroLoc === 'All Micro-Locations' || item.microLocation === selectedMicroLoc;
    const matchQuery =
      searchQuery === '' ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.microLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCorridor && matchType && matchMicro && matchQuery;
  });

  return (
    <section className="p-seo-section" id="programmatic-seo">
      <div className="p-seo-inner">
        {/* Header */}
        <div className="p-seo-header">
          <span className="section-subtitle">PMRDA NA Bungalow Plot Engine</span>
          <h2 className="section-title">
            Pune Micro-Location Plotting Ecosystem<br />
            <span className="gradient-text">PMRDA Approved • Clear Title 7/12 • Gated Estates</span>
          </h2>
          <p className="p-seo-subtitle">
            Search PMRDA sanctioned NA Bungalow plots &amp; luxury townships across Bhukum, Bhugaon, Pirangut, Kasarsai, Talegaon, Khadakwasla, Saswad, Lavasa Road &amp; Wagholi with 100% bank loan approval.
          </p>
        </div>

        {/* Micro-Location Quick Filters Chips */}
        <div className="p-seo-chips-wrapper">
          <span className="p-seo-chip-label"><Compass size={14} /> Quick Micro-Locations:</span>
          <div className="p-seo-chips-scroll">
            {PUNE_MICRO_LOCATIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`p-seo-chip ${selectedMicroLoc === loc ? 'active' : ''}`}
                onClick={() => setSelectedMicroLoc(loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-seo-filter-bar glass">
          <div className="p-seo-search-input">
            <Search size={18} className="p-seo-icon" />
            <input
              type="text"
              placeholder="Search by plot location, e.g. NA Plots Bhukum, Kasarsai Lake, Talegaon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="p-seo-select-group">
            <select
              value={selectedCorridor}
              onChange={(e) => setSelectedCorridor(e.target.value)}
              aria-label="Filter by Corridor"
            >
              {CORRIDORS_LIST.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by Property Type"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="p-seo-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="p-seo-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-seo-card-top">
                  <span className="p-seo-badge">{item.type}</span>
                  {item.clearTitle712 && (
                    <span className="p-seo-rera"><ShieldCheck size={14} /> 7/12 &amp; PMRDA Approved</span>
                  )}
                </div>

                <h3>{item.project}</h3>
                <p className="p-seo-location"><MapPin size={14} /> {item.location}</p>
                <p className="p-seo-price">Investment: <strong>{item.priceRange}</strong></p>

                {item.plotSize && (
                  <div className="p-seo-specs">
                    <span><FileText size={12} /> {item.plotSize}</span>
                    {item.fsiRatio && <span><Landmark size={12} /> {item.fsiRatio}</span>}
                  </div>
                )}

                <div className="p-seo-features">
                  {item.features.map((feat) => (
                    <span key={feat} className="p-seo-feat-tag">
                      <CheckCircle2 size={12} /> {feat}
                    </span>
                  ))}
                </div>

                {item.bankLoans && item.bankLoans.length > 0 && (
                  <div className="p-seo-bank-loans">
                    <span className="p-seo-bank-label">Approved Banks:</span>
                    {item.bankLoans.map((bank) => (
                      <span key={bank} className="p-seo-bank-tag">{bank}</span>
                    ))}
                  </div>
                )}

                <div className="p-seo-keywords">
                  {item.keywords.map((kw) => (
                    <span key={kw} className="p-seo-kw"><Tag size={10} /> {kw}</span>
                  ))}
                </div>

                <div className="p-seo-card-footer">
                  {onBookVisit && (
                    <button
                      type="button"
                      className="btn-secondary p-seo-btn"
                      onClick={() => onBookVisit(item.project)}
                    >
                      Check 7/12 Title &amp; Book Site Visit
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-seo-empty glass">
              <p>No matching NA plot developments found for your search criteria. Try clearing filters.</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setSelectedCorridor('All Corridors');
                  setSelectedType('All Property Types');
                  setSelectedMicroLoc('All Micro-Locations');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
