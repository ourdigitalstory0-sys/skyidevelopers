'use client';

import { useState, useMemo } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import './PlotEstimator.css';

interface PlotEstimatorProps {
  onBookSiteVisit: (projectName?: string) => void;
}

const SPEC_TIERS = [
  { id: 'standard', name: 'Standard Premium', ratePerSqFt: 2500, desc: 'Vitrified tiles, branded bath fittings, solar water heating, weather-shield paint.' },
  { id: 'luxury', name: 'Luxury Eco-Villa', ratePerSqFt: 3500, desc: 'Italian marble, VRV air conditioning, automated smart home controls, private garden landscaping.' },
  { id: 'ultra', name: 'Ultra Mansion', ratePerSqFt: 4800, desc: 'Bespoke architectural design, private plunge pool, double-height ceiling, imported Italian fittings & elevator.' },
];

export default function PlotEstimator({ onBookSiteVisit }: PlotEstimatorProps) {
  const [plotArea, setPlotArea] = useState<number>(2400);
  const [fsiRatio, setFsiRatio] = useState<number>(1.5);
  const [selectedSpec, setSelectedSpec] = useState<string>('luxury');
  const [floors, setFloors] = useState<number>(2);

  const specObj = useMemo(() => {
    return SPEC_TIERS.find((s) => s.id === selectedSpec) || SPEC_TIERS[1];
  }, [selectedSpec]);

  const maxBuiltUpArea = useMemo(() => {
    return Math.round(plotArea * fsiRatio);
  }, [plotArea, fsiRatio]);

  const estimatedConstructionCost = useMemo(() => {
    return Math.round(maxBuiltUpArea * specObj.ratePerSqFt);
  }, [maxBuiltUpArea, specObj]);

  const plotPriceEstimate = useMemo(() => {
    // Estimated average land rate approx ₹4,200 / sq.ft for Bhukum NA Plot campus
    return Math.round(plotArea * 4200);
  }, [plotArea]);

  const totalVillaInvestment = useMemo(() => {
    return plotPriceEstimate + estimatedConstructionCost;
  }, [plotPriceEstimate, estimatedConstructionCost]);

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section className="estimator-section" id="plot-estimator">
      <div className="estimator-inner">
        <div className="section-header">
          <span className="section-subtitle">PMRDA NA Plot Villa Calculator</span>
          <h2 className="section-title">
            Estimate Your Dream Villa<br />
            <span className="gradient-text">Construction &amp; Investment Cost</span>
          </h2>
          <div className="glow-line" style={{ margin: '18px auto 0 auto' }} />
          <p className="estimator-subtitle">
            Calculate your custom villa's permissible built-up area, construction costs, and total investment for PMRDA-sanctioned NA Bungalow Plots at SKYi Manas Lake, Bhukum Pune.
          </p>
        </div>

        <div className="estimator-grid">
          {/* Controls Form */}
          <div className="estimator-controls glass">
            {/* Plot Size Slider */}
            <div className="est-control-group">
              <div className="est-label-row">
                <label htmlFor="plot-size-range">NA Plot Area (Sq.Ft.)</label>
                <span className="est-val-highlight">{plotArea.toLocaleString('en-IN')} Sq.Ft.</span>
              </div>
              <input
                id="plot-size-range"
                type="range"
                min={1500}
                max={5000}
                step={100}
                value={plotArea}
                onChange={(e) => setPlotArea(Number(e.target.value))}
                className="est-slider"
                aria-label="NA Plot Area in Square Feet"
              />
              <div className="est-range-ticks">
                <span>1,500 sq.ft</span>
                <span>2,400 sq.ft</span>
                <span>3,500 sq.ft</span>
                <span>5,000+ sq.ft</span>
              </div>
            </div>

            {/* PMRDA FSI Ratio Selector */}
            <div className="est-control-group">
              <label className="est-label">PMRDA Sanctioned FSI Ratio</label>
              <div className="est-btn-group">
                {[1.1, 1.5, 2.0].map((fsi) => (
                  <button
                    key={fsi}
                    type="button"
                    className={`est-select-btn ${fsiRatio === fsi ? 'active' : ''}`}
                    onClick={() => setFsiRatio(fsi)}
                  >
                    FSI {fsi.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Villa Floors */}
            <div className="est-control-group">
              <label className="est-label">Villa Design Structure</label>
              <div className="est-btn-group">
                {[
                  { count: 1, label: 'Ground (1 Story)' },
                  { count: 2, label: 'G + 1 (Duplex)' },
                  { count: 3, label: 'G + 2 (Triplex)' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    className={`est-select-btn ${floors === item.count ? 'active' : ''}`}
                    onClick={() => setFloors(item.count)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Specification Tiers */}
            <div className="est-control-group">
              <label className="est-label">Construction Finish Tier</label>
              <div className="spec-tier-cards">
                {SPEC_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`spec-tier-card ${selectedSpec === tier.id ? 'active' : ''}`}
                    onClick={() => setSelectedSpec(tier.id)}
                  >
                    <div className="st-head">
                      <span className="st-name">{tier.name}</span>
                      <span className="st-rate">₹{tier.ratePerSqFt}/sq.ft</span>
                    </div>
                    <p className="st-desc">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="estimator-results glass">
            <div className="est-results-header">
              <div className="est-icon-box"><Calculator size={24} /></div>
              <h3>PMRDA Villa Investment Breakdown</h3>
            </div>

            <div className="est-result-rows">
              <div className="est-res-row">
                <span className="res-label">Selected Plot Size</span>
                <span className="res-val">{plotArea.toLocaleString('en-IN')} Sq.Ft.</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">Max Permissible Built-up Area (FSI {fsiRatio})</span>
                <span className="res-val highlight">{maxBuiltUpArea.toLocaleString('en-IN')} Sq.Ft.</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">Estimated NA Plot Land Price</span>
                <span className="res-val">{formatLakhs(plotPriceEstimate)}</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">Estimated Construction Cost</span>
                <span className="res-val">{formatLakhs(estimatedConstructionCost)}</span>
              </div>
            </div>

            <div className="est-total-box">
              <span className="total-title">Total Estimated Villa Project Value</span>
              <span className="total-amount">{formatLakhs(totalVillaInvestment)}</span>
              <p className="total-sub">*Includes 100% clear title PMRDA NA plot, underground utilities &amp; construction estimate.</p>
            </div>

            <div className="est-actions">
              <button
                type="button"
                className="btn-primary est-cta-btn"
                onClick={() => onBookSiteVisit('SKYi Manas Lake NA Bungalow Plots')}
              >
                <span>Book Plot Site Visit</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
