'use client';

import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Landmark, FileText, CheckCircle2 } from 'lucide-react';
import './PlotEstimator.css';

interface PlotEstimatorProps {
  onBookSiteVisit: (projectName?: string) => void;
}

export default function PlotEstimator({ onBookSiteVisit }: PlotEstimatorProps) {
  const [plotArea, setPlotArea] = useState<number>(2000);
  const [selectedCorridor, setSelectedCorridor] = useState<string>('bhukum');

  const corridorRates = useMemo(() => {
    return {
      bhukum: { name: 'Bhukum / Bavdhan (Manas Lake)', ratePerSqFt: 4750, fsi: 1.5 },
      bhugaon: { name: 'Bhugaon Foothills (Paud Road)', ratePerSqFt: 4850, fsi: 1.4 },
      kasarsai: { name: 'Kasarsai Dam Lakefront', ratePerSqFt: 4750, fsi: 1.4 },
      pirangut: { name: 'Pirangut Valley Estate', ratePerSqFt: 4750, fsi: 1.25 },
      sus: { name: 'Sus / Bavdhan Annexe', ratePerSqFt: 5200, fsi: 1.5 },
    };
  }, []);

  const activeCorridor = useMemo(() => {
    return corridorRates[selectedCorridor as keyof typeof corridorRates] || corridorRates.bhukum;
  }, [corridorRates, selectedCorridor]);

  const maxFsiArea = useMemo(() => {
    return Math.round(plotArea * activeCorridor.fsi);
  }, [plotArea, activeCorridor]);

  const plotPriceEstimate = useMemo(() => {
    // Base rate ₹4,750 / sq.ft ensures 2,000 sq.ft = ₹95 Lakhs*
    return Math.round(plotArea * activeCorridor.ratePerSqFt);
  }, [plotArea, activeCorridor]);

  const bankLoanEligible = useMemo(() => {
    return Math.round(plotPriceEstimate * 0.75);
  }, [plotPriceEstimate]);

  const downPaymentEst = useMemo(() => {
    return Math.round(plotPriceEstimate * 0.25);
  }, [plotPriceEstimate]);

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr*`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs*`;
  };

  return (
    <section className="estimator-section" id="plot-estimator">
      <div className="estimator-inner">
        <div className="section-header">
          <span className="section-subtitle">PMRDA NA Land Valuation Calculator</span>
          <h2 className="section-title">
            Estimate Your NA Plot Investment<br />
            <span className="gradient-text">Plot Sizes 2,000 SQFT Onwards • Starting ₹95 Lakhs*</span>
          </h2>
          <div className="glow-line" style={{ margin: '18px auto 0 auto' }} />
          <p className="estimator-subtitle">
            Calculate exact land valuation, permissible PMRDA FSI built-up footprint, and bank loan eligibility for 100% clear title PMRDA NA Bungalow Plots across Pune.
          </p>
        </div>

        <div className="estimator-grid">
          {/* Controls Form */}
          <div className="estimator-controls glass">
            {/* Corridor Selector */}
            <div className="est-control-group">
              <label className="est-label">Select Micro-Location Corridor</label>
              <div className="est-corridor-grid">
                {Object.entries(corridorRates).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={`est-corridor-btn ${selectedCorridor === key ? 'active' : ''}`}
                    onClick={() => setSelectedCorridor(key)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Plot Size Slider */}
            <div className="est-control-group">
              <div className="est-label-row">
                <label htmlFor="plot-size-range">NA Plot Size (2,000 SQFT Onwards)</label>
                <span className="est-val-highlight">{plotArea.toLocaleString('en-IN')} Sq.Ft.</span>
              </div>
              <input
                id="plot-size-range"
                type="range"
                min={2000}
                max={6000}
                step={100}
                value={plotArea}
                onChange={(e) => setPlotArea(Number(e.target.value))}
                className="est-slider"
                aria-label="NA Plot Area in Square Feet"
              />
              <div className="est-range-ticks">
                <span>2,000 sq.ft</span>
                <span>3,000 sq.ft</span>
                <span>4,500 sq.ft</span>
                <span>6,000+ sq.ft</span>
              </div>
            </div>

            {/* Plot Specifications Card */}
            <div className="est-control-group">
              <label className="est-label">Included Infrastructure &amp; Legal Guarantees</label>
              <div className="est-specs-list">
                <div className="est-spec-item">
                  <ShieldCheck size={18} className="est-icon-green" />
                  <span>100% PMRDA Collector Sanctioned Layout &amp; R-Zone</span>
                </div>
                <div className="est-spec-item">
                  <FileText size={18} className="est-icon-blue" />
                  <span>Demarcated 7/12 Extract &amp; Individual Property Card (PR Card)</span>
                </div>
                <div className="est-spec-item">
                  <Landmark size={18} className="est-icon-gold" />
                  <span>Pre-Laid Underground Water, Electricity, Concrete Roads &amp; Drainage</span>
                </div>
                <div className="est-spec-item">
                  <CheckCircle2 size={18} className="est-icon-green" />
                  <span>Pre-Approved Plot Loans by SBI, HDFC, ICICI &amp; Axis Bank</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="estimator-results glass">
            <div className="est-results-header">
              <div className="est-icon-box"><Calculator size={24} /></div>
              <h3>PMRDA NA Land Valuation Summary</h3>
            </div>

            <div className="est-result-rows">
              <div className="est-res-row">
                <span className="res-label">Selected Plot Area</span>
                <span className="res-val">{plotArea.toLocaleString('en-IN')} Sq.Ft.</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">Micro-Location Corridor</span>
                <span className="res-val">{activeCorridor.name}</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">PMRDA Max Permissible FSI Footprint</span>
                <span className="res-val highlight">{maxFsiArea.toLocaleString('en-IN')} Sq.Ft.</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">Estimated Bank Loan Funding (75%)</span>
                <span className="res-val">{formatLakhs(bankLoanEligible)}</span>
              </div>
              <div className="est-res-row">
                <span className="res-label">Estimated Self Investment / Down Payment</span>
                <span className="res-val">{formatLakhs(downPaymentEst)}</span>
              </div>
            </div>

            <div className="est-total-box">
              <span className="total-title">Total NA Plot Investment Starting At</span>
              <span className="total-amount">{formatLakhs(plotPriceEstimate)}</span>
              <p className="total-sub">*Plots starting from 2,000 SQFT at ₹95 Lakhs*. Prices subject to plot position &amp; orientation.</p>
            </div>

            <div className="est-actions">
              <button
                type="button"
                className="btn-primary est-cta-btn"
                onClick={() => onBookSiteVisit('SKYi PMRDA NA Bungalow Plots')}
              >
                <span>Check 7/12 Title &amp; Book Site Visit</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
