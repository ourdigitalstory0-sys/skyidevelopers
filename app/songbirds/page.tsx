import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'Skyi Songbirds Bhugaon Pune | 45+ Acre Township | 1, 3 & 4 BHK Luxury Residences',
  description: 'Skyi Songbirds at Bhugaon, Paud Road, Pune — 45+ Acre IGBC Platinum Certified Township surrounded by Sahyadri Hills and 7,000-acre NDA forest reserve. 10 Mins from Kothrud & Chandani Chowk.',
  alternates: {
    canonical: 'https://skyidevelopers.in/songbirds',
  },
};

export default function SongbirdsPage() {
  return <Home />;
}
