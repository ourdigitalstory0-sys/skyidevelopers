import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'All Projects | Skyi Developers Pune | Songbirds, NA Plots Bhukum, Tigers Nest, Park Baner',
  description: 'Explore official Skyi Developers projects in Pune: PMRDA NA Bungalow Plots at Bhukum, Skyi Songbirds at Bhugaon, SKYi Park Baner, SKYi Iris Bavdhan, Skyi Star City Dhayari.',
  alternates: {
    canonical: 'https://skyidevelopers.in/projects',
  },
};

export default function ProjectsPage() {
  return <Home />;
}
