import { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, ShieldCheck, ArrowRight } from 'lucide-react';
import './MortgageCalculator.css';

interface MortgageCalculatorProps {
  onBookSiteVisit: () => void;
}

function MortgageCalculatorComp({ onBookSiteVisit }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(12000000); // 1.2 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const calculations = useMemo(() => {
    const safePrice = Math.max(1000000, Math.min(100000000, Number(propertyPrice) || 12000000));
    const safeDownPct = Math.max(5, Math.min(90, Number(downPaymentPercent) || 20));
    const safeTenure = Math.max(1, Math.min(40, Number(loanTenureYears) || 20));
    const safeRate = Math.max(1, Math.min(25, Number(interestRate) || 8.5));

    const downPaymentAmount = (safePrice * safeDownPct) / 100;
    const loanAmount = Math.max(0, safePrice - downPaymentAmount);
    const monthlyRate = safeRate / (12 * 100);
    const totalMonths = safeTenure * 12;

    const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
    const rawEmi =
      compoundFactor > 1
        ? (loanAmount * monthlyRate * compoundFactor) / (compoundFactor - 1)
        : 0;

    const emi = isFinite(rawEmi) && !isNaN(rawEmi) ? Math.round(rawEmi) : 0;
    const totalPayment = isFinite(emi * totalMonths) ? emi * totalMonths : 0;
    const totalInterest = Math.max(0, totalPayment - loanAmount);

    return {
      downPaymentAmount,
      loanAmount,
      monthlyEMI: emi,
      totalInterest,
      totalPayment,
    };
  }, [propertyPrice, downPaymentPercent, loanTenureYears, interestRate]);

  const formatCurrency = (val: number) => {
    if (!isFinite(val) || isNaN(val)) return '₹ 0';
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="mortgage-section" id="calculator">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">Financial Freedom Planner</span>
          <h2>Interactive Home Loan & EMI Calculator</h2>
          <p>
            Estimate your monthly investment and plan your dream home at Skyi Songbirds or Skyi Manas Lake.
          </p>
        </motion.div>

        <div className="calculator-grid">
          {/* Sliders Card */}
          <motion.div
            className="calc-controls-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Property Price */}
            <div className="slider-group">
              <div className="slider-label">
                <span><IndianRupee size={16} /> Property Price</span>
                <strong className="accent-val">{formatCurrency(propertyPrice)}</strong>
              </div>
              <input
                type="range"
                min={4500000}
                max={35000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                aria-label="Property Price"
              />
              <div className="slider-ticks">
                <span>₹ 45L</span>
                <span>₹ 1.5 Cr</span>
                <span>₹ 3.5 Cr</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="slider-group">
              <div className="slider-label">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <strong>{formatCurrency(calculations.downPaymentAmount)}</strong>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                aria-label="Down Payment Percentage"
              />
              <div className="slider-ticks">
                <span>10%</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="slider-group">
              <div className="slider-label">
                <span>Loan Tenure</span>
                <strong>{loanTenureYears} Years</strong>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                aria-label="Loan Tenure in Years"
              />
              <div className="slider-ticks">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="slider-group">
              <div className="slider-label">
                <span>Interest Rate (p.a.)</span>
                <strong>{interestRate}%</strong>
              </div>
              <input
                type="range"
                min={7.5}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                aria-label="Annual Interest Rate Percentage"
              />
              <div className="slider-ticks">
                <span>7.5%</span>
                <span>9.5%</span>
                <span>12.0%</span>
              </div>
            </div>
          </motion.div>

          {/* Results Summary Card */}
          <motion.div
            className="calc-results-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="results-header">
              <span className="emi-label">Estimated Monthly EMI</span>
              <div className="emi-amount">
                ₹ {calculations.monthlyEMI.toLocaleString('en-IN')}
                <span className="emi-per-month">/ month</span>
              </div>
            </div>

            <div className="breakdown-chart-visual">
              <div
                className="chart-bar principal-bar"
                style={{
                  width: `${calculations.totalPayment > 0 ? (calculations.loanAmount / calculations.totalPayment) * 100 : 50}%`,
                }}
                title="Principal Amount"
              />
              <div
                className="chart-bar interest-bar"
                style={{
                  width: `${calculations.totalPayment > 0 ? (calculations.totalInterest / calculations.totalPayment) * 100 : 50}%`,
                }}
                title="Interest Amount"
              />
            </div>

            <div className="results-details-grid">
              <div className="detail-item">
                <span className="dot principal-dot"></span>
                <span className="label">Principal Loan</span>
                <strong className="val">{formatCurrency(calculations.loanAmount)}</strong>
              </div>
              <div className="detail-item">
                <span className="dot interest-dot"></span>
                <span className="label">Total Interest</span>
                <strong className="val">{formatCurrency(calculations.totalInterest)}</strong>
              </div>
              <div className="detail-item full-width">
                <span className="label">Total Payable</span>
                <strong className="val total-val">{formatCurrency(calculations.totalPayment)}</strong>
              </div>
            </div>

            <div className="bank-partners-note">
              <ShieldCheck size={18} />
              <span>Pre-approved home loans available from HDFC, SBI, ICICI, & Axis Bank.</span>
            </div>

            <motion.button
              className="calc-cta-btn"
              onClick={onBookSiteVisit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Schedule Site Visit & Pre-Approval</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(MortgageCalculatorComp);
