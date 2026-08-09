import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'SKYi Manas Lake NA Bungalow Plots Bhukum Paud Road Pune | 2000 SQFT Onwards | ₹95 Lakhs*',
  description: 'PMRDA Sanctioned 100% Clear Title NA Bungalow Plots at Manas Lake Campus, Bhukum, Paud Road, Pune — 6 Mins from Chandani Chowk Metro. 2,000 SQFT Onwards starting ₹95 Lakhs*. Bank Loan Approved.',
  alternates: {
    canonical: 'https://skyidevelopers.in/na-plots-bhukum',
  },
};

export default function NaPlotsBhukumPage() {
  return <Home />;
}
