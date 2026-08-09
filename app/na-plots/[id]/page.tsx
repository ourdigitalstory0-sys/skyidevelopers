import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Home from '../../page';
import { PROGRAMMATIC_SEO_ITEMS } from '../../../utils/programmaticSeo';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_SEO_ITEMS.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = PROGRAMMATIC_SEO_ITEMS.find((p) => p.id === id);

  if (!item) {
    return {
      title: 'NA Bungalow Plots Pune | Skyi Developers',
      description: 'PMRDA Sanctioned Clear Title NA Bungalow Plots across Pune.',
    };
  }

  const title = `${item.project} ${item.microLocation} Pune | PMRDA NA Plots starting ${item.priceRange.split('-')[0].trim()}`;
  const description = `PMRDA Sanctioned 100% Clear Title 7/12 ${item.type} at ${item.location}. Size: ${item.plotSize || '2,000 SQFT Onwards'}. FSI: ${item.fsiRatio || '1.4 - 1.5'}. Bank Loan Approved (${item.bankLoans.join(', ')}).`;
  const canonicalUrl = `https://skyidevelopers.in/na-plots/${item.id}`;

  return {
    title,
    description,
    keywords: [...item.keywords, 'NA bungalow plots Pune', 'PMRDA NA plots Pune', 'clear title 7/12 plots Pune'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Skyi Developers Pune',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://skyidevelopers.in/bungalow-plots.jpg',
          width: 1200,
          height: 630,
          alt: `${item.project} ${item.microLocation} Pune`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://skyidevelopers.in/bungalow-plots.jpg'],
    },
  };
}

export default async function ProgrammaticNaPlotPage({ params }: PageProps) {
  const { id } = await params;
  const item = PROGRAMMATIC_SEO_ITEMS.find((p) => p.id === id);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: item.project,
    description: `PMRDA Sanctioned Clear Title NA Bungalow Plot at ${item.location}`,
    url: `https://skyidevelopers.in/na-plots/${item.id}`,
    datePosted: new Date().toISOString(),
    offers: {
      '@type': 'Offer',
      price: '9500000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    place: {
      '@type': 'Place',
      name: item.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: item.microLocation,
        addressRegion: 'Pune, Maharashtra',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: item.geocoordinates.latitude,
        longitude: item.geocoordinates.longitude,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
