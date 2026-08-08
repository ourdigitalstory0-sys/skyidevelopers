'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { PROGRAMMATIC_SEO_ITEMS, CORRIDORS_LIST, PROPERTY_TYPES } from '../utils/programmaticSeo';
import './ProgrammaticSEOSection.css';

interface ProgrammaticSEOSectionProps {
  onBookVisit?: (projectName?: string) => void;
}

export default function ProgrammaticSEOSection({ onBookVisit }: ProgrammaticSEOSectionProps) {
  const [selectedCorridor, setSelectedCorridor] = useState('All Corridors');
  const [selectedType, setSelectedType] = useState('All Property Types');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = PROGRAMMATIC_SEO_ITEMS.filter((item) => {
    const matchCorridor = selectedCorridor === 'All Corridors' || item.corridor === selectedCorridor;
    const matchType = selectedType === 'All Property Types' || item.type === selectedType;
    const matchQuery =
      searchQuery === '' ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCorridor && matchType && matchQuery;
  });

  return (
    <section className="p-seo-section" id="programmatic-seo">
      <div className="p-seo-inner">
        {/* Header */}
        <div className="p-seo-header">
          <span className="section-subtitle">Programmatic Search Engine</span>
          <h2 className="section-title">
            Explore SKYi Ecosystem<br />
            <span className="gradient-text">By Corridor &amp; Property Type</span>
          </h2>
          <p className="p-seo-subtitle">
            Search 16 official SKYi projects across Bhugaon, Bhukum, Bavdhan, Baner, Kothrud, Paud Road &amp; Dhayari with real-time PMRDA approval status.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-seo-filter-bar glass">
          <div className="p-seo-search-input">
            <Search size={18} className="p-seo-icon" />
            <input
              type="text"
              placeholder="Search by project, location, or keyword (e.g. NA Plots Bhukum)..."
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
                  {item.reraApproved && (
                    <span className="p-seo-rera"><ShieldCheck size={14} /> RERA &amp; PMRDA Approved</span>
                  )}
                </div>

                <h3>{item.project}</h3>
                <p className="p-seo-location"><MapPin size={14} /> {item.location}</p>
                <p className="p-seo-price">Starting: <strong>{item.priceRange}</strong></p>

                <div className="p-seo-features">
                  {item.features.map((feat) => (
                    <span key={feat} className="p-seo-feat-tag">
                      <CheckCircle2 size={12} /> {feat}
                    </span>
                  ))}
                </div>

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
                      Enquire / Schedule Visit
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-seo-empty glass">
              <p>No matching projects found for your search criteria. Try clearing filters.</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setSelectedCorridor('All Corridors');
                  setSelectedType('All Property Types');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
