import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Skyi Developers Pune | Luxury Homes & PMRDA NA Bungalow Plots',
    short_name: 'SKYi Developers',
    description: 'Premier real estate builder in Pune since 2004. Explore Skyi Songbirds, SKYi Manas Lake & PMRDA NA Bungalow Plots in Bhukum, Bavdhan & Baner.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070b1f',
    theme_color: '#070b1f',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
