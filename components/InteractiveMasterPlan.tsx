'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Layers, Compass, CheckCircle2 } from 'lucide-react';
import './InteractiveMasterPlan.css';

interface Sector {
  id: string;
  name: string;
  type: string;
  acres: string;
  status: string;
  highlights: string[];
}

const SECTORS: Sector[] = [
  {
    id: 'na-plots-sector',
    name: 'Sector A: SKYi Manas Lake NA Bungalow Plots',
    type: 'PMRDA NA Villa Plots',
    acres: '25 Acres (Phase 1)',
    status: 'Launching 2025',
    highlights: ['1,500 - 5,000+ Sq.Ft Plots', '100% Clear Title 7/12', 'Direct Lake Promenade Access', 'Underground Utilities'],
  },
  {
    id: 'songbirds-township',
    name: 'Sector B: Skyi Songbirds Integrated Township',
    type: '1, 3 & 4 BHK High-Rise Towers',
    acres: '45 Acres',
    status: 'Ready Possession / Ongoing',
    highlights: ['7000-Acre NDA Forest Surroundings', 'IGBC Platinum Certified', 'Zero Waste Water Recycling', 'Central Bird Park Deck'],
  },
  {
    id: 'pwc-sports-club',
    name: 'Sector C: Poona Western Club & PWC Towers',
    type: 'Sports & Lifestyle Club Hub',
    acres: '15 Acres',
    status: 'Operational',
    highlights: ['Olympic Size Swimming Pool', 'Badminton & Tennis Courts', '5-Star Dining Lounge', 'Integrated PWC High-Rise Towers'],
  },
];

export default function InteractiveMasterPlan() {
  const [activeSector, setActiveSector] = useState<Sector>(SECTORS[0]);

  return (
    <section className="masterplan-section" id="master-plan">
      <div className="masterplan-inner">
        <div className="masterplan-header">
          <span className="section-subtitle">2D/3D Interactive Layout</span>
          <h2 className="section-title">
            Explore 90-Acre Master Township<br />
            <span className="gradient-text">SKYi Manas Lake &amp; Songbirds Layout</span>
          </h2>
          <p className="masterplan-subtitle">
            Click on layout sectors to explore PMRDA NA plot sectors, high-rise residential towers, and sports club amenities.
          </p>
        </div>

        <div className="masterplan-grid">
          {/* Left: Sector Selector */}
          <div className="mp-sector-list">
            {SECTORS.map((sector) => (
              <motion.button
                key={sector.id}
                type="button"
                className={`mp-sector-btn glass ${activeSector.id === sector.id ? 'active' : ''}`}
                onClick={() => setActiveSector(sector)}
                whileHover={{ x: 6 }}
              >
                <div className="mp-btn-top">
                  <Map size={18} />
                  <span>{sector.type}</span>
                </div>
                <h4>{sector.name}</h4>
                <p className="mp-acres"><Layers size={14} /> {sector.acres} • {sector.status}</p>
              </motion.button>
            ))}
          </div>

          {/* Right: Active Sector Detail Card */}
          <motion.div
            key={activeSector.id}
            className="mp-detail-card glass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mp-card-badge">
              <Compass size={16} /> Interactive Layout Blueprint
            </div>
            <h3>{activeSector.name}</h3>
            <p className="mp-detail-type">{activeSector.type} • {activeSector.acres}</p>

            <div className="mp-highlights-grid">
              {activeSector.highlights.map((h) => (
                <div key={h} className="mp-h-item">
                  <CheckCircle2 size={16} className="mp-check" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
