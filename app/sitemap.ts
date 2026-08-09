import type { MetadataRoute } from 'next';
import { PROGRAMMATIC_SEO_ITEMS } from '../utils/programmaticSeo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skyidevelopers.in';

  // Primary Canonical Pages
  const primaryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/na-plots-bhukum`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/songbirds`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/plot-estimator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/virtual-tour`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/connectivity`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-hub`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Programmatic SEO Micro-Location Pages
  const programmaticPages: MetadataRoute.Sitemap = PROGRAMMATIC_SEO_ITEMS.map((item) => ({
    url: `${baseUrl}/na-plots/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...primaryPages, ...programmaticPages];
}
