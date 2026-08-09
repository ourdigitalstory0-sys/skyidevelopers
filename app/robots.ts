import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://skyidevelopers.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
