import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: '360° Drone Virtual Tours & Sightseeing | Skyi Developers Pune',
  description: 'Explore 360° aerial drone virtual tours of Skyi Songbirds Bhugaon, SKYi Manas Lake NA Bungalow Plots Bhukum, Poona Western Club, and Sahyadri hillside views.',
  alternates: {
    canonical: 'https://skyidevelopers.in/virtual-tour',
  },
};

export default function VirtualTourPage() {
  return <Home />;
}
