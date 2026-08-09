import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'Location & Connectivity Matrix | Skyi Developers Pune',
  description: 'View distance matrix and commute times from Skyi developments at Bhugaon & Bhukum to Chandani Chowk Metro Station, Kothrud, Hinjewadi IT Park, and Pune Station.',
  alternates: {
    canonical: 'https://skyidevelopers.in/connectivity',
  },
};

export default function ConnectivityPage() {
  return <Home />;
}
