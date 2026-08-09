import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'PMRDA NA Plot Valuation Calculator Pune | Skyi Developers',
  description: 'Estimate PMRDA NA Bungalow Plot Valuation, permissible FSI footprint, and 75% bank loan funding across Pune micro-locations (Bhukum, Bhugaon, Pirangut, Kasarsai, Sus).',
  alternates: {
    canonical: 'https://skyidevelopers.in/plot-estimator',
  },
};

export default function PlotEstimatorPage() {
  return <Home />;
}
