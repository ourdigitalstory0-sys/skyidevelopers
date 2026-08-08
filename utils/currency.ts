/**
 * International NRI Multi-Currency Conversion Helper
 * Standard Conversion Rates (Base: INR ₹)
 */

export type CurrencyCode = 'INR' | 'USD' | 'AED' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateToInr: number; // 1 Foreign Unit = X INR
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', label: 'INR (Indian Rupee)', rateToInr: 1 },
  USD: { code: 'USD', symbol: '$', label: 'USD (US Dollar)', rateToInr: 84.5 },
  AED: { code: 'AED', symbol: 'د.إ', label: 'AED (UAE Dirham)', rateToInr: 23.0 },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (British Pound)', rateToInr: 107.0 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (Euro)', rateToInr: 92.0 },
};

export function formatPrice(amountInLakhs: number, currency: CurrencyCode = 'INR'): string {
  const inrTotal = amountInLakhs * 100000;
  const config = CURRENCIES[currency];

  if (currency === 'INR') {
    if (amountInLakhs >= 100) {
      return `₹ ${(amountInLakhs / 100).toFixed(2)} Crores*`;
    }
    return `₹ ${amountInLakhs.toFixed(2)} Lakhs*`;
  }

  const converted = inrTotal / config.rateToInr;
  return `${config.symbol} ${Math.round(converted).toLocaleString()} ${config.code}*`;
}
