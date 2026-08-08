'use client';

import { Globe } from 'lucide-react';
import { CURRENCIES, CurrencyCode } from '../utils/currency';
import './NRICurrencyToggle.css';

interface NRICurrencyToggleProps {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
}

export default function NRICurrencyToggle({ selectedCurrency, onCurrencyChange }: NRICurrencyToggleProps) {
  return (
    <div className="currency-toggle-bar glass">
      <div className="ct-label">
        <Globe size={16} />
        <span>NRI Currency View:</span>
      </div>

      <div className="ct-buttons">
        {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
          <button
            key={code}
            type="button"
            className={`ct-btn ${selectedCurrency === code ? 'active' : ''}`}
            onClick={() => onCurrencyChange(code)}
          >
            {CURRENCIES[code].symbol} {code}
          </button>
        ))}
      </div>
    </div>
  );
}
