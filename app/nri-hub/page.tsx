import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'NRI Investment Hub | PMRDA NA Plots & Property Pune | Skyi Developers',
  description: 'FEMA regulatory guide, NRE/NRO banking channels, plot loan pre-approvals, and virtual 3D site visits for NRIs & OCIs investing in Skyi Pune developments.',
  alternates: {
    canonical: 'https://skyidevelopers.in/nri-hub',
  },
};

export default function NriHubPage() {
  return <Home />;
}
