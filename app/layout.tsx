import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070b1f',
};

export const metadata: Metadata = {
  title: 'Skyi Developers Pune | Luxury Flats, Townships & NA Bungalow Plots | Bhugaon, Bhukum, Bavdhan, Baner',
  description: 'Skyi Developers — Pune\'s premier real estate builder since 2004. Explore Skyi Songbirds (Bhugaon), SKYi Tigers Nest, SKYi PWC Towers, SKYi Manas Lake & PMRDA NA Bungalow Plots (Bhukum/Bavdhan), SKYi Park (Baner), SKYi Aura Heights. RERA & IGBC Platinum certified. ☎ +91 20 6614 3000.',
  keywords: [
    'Skyi Developers', 'SKYi Developers', 'Skyi Developer Pune', 'Skyi real estate Pune', 'Skyi properties Pune',
    'Skyi Songbirds', 'Skyi Songbirds Bhugaon', 'Songbirds Bhugaon Pune', 'SKYi Tigers Nest', 'SKYi PWC Towers',
    'Manas Lake Pune', 'SKYi Manas Lake', 'Manas Lake Bavdhan', 'Manas Lake Bhukum', 'Manas Lake Paud Road',
    'SKYi Park Baner', 'SKYi Iris Baner', 'SKYi Aura Heights', 'SKYi Five Baner', 'SKYi Star City Dhayari',
    'NA bungalow plots Pune', 'NA plots Bhukum', 'NA plots Bavdhan', 'NA plots Manas Lake', 'NA plots Bhugaon',
    'PMRDA approved NA plots Pune', 'clear title NA plots Pune', 'villa plots Paud Road Pune', 'NRI real estate investment Pune'
  ],
  authors: [{ name: 'Skyi Developers' }],
  publisher: 'Skyi Developers',
  metadataBase: new URL('https://skyidevelopers.in'),
  alternates: {
    canonical: 'https://skyidevelopers.in/',
    languages: {
      'en-IN': 'https://skyidevelopers.in/',
      'en': 'https://skyidevelopers.in/',
      'x-default': 'https://skyidevelopers.in/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://skyidevelopers.in/',
    title: 'Skyi Developers Pune | Luxury Residences & PMRDA NA Bungalow Plots',
    description: 'Explore 23+ delivered projects, 7000+ homes, IGBC Platinum certified townships in Pune.',
    siteName: 'Skyi Developers',
    images: [
      {
        url: '/songbirds-1.webp',
        width: 1200,
        height: 630,
        alt: 'Skyi Songbirds Bhugaon Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skyi Developers Pune | Luxury Flats & NA Plots',
    description: 'IGBC Platinum & RERA Certified Township Developer in Pune.',
    images: ['/songbirds-1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://skyidevelopers.in/#organization",
      "name": "Skyi Developers",
      "alternateName": ["SKYi Developers", "Skyi Developer Pune", "SKYi Properties"],
      "url": "https://skyidevelopers.in/",
      "logo": "https://skyidevelopers.in/logo-white.svg",
      "telephone": "+91-20-66143000",
      "email": "info@skyidevelopers.com",
      "foundingDate": "2004",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Skymark One, Balewadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411045",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://skyidevelopers.in/#agent",
      "name": "Skyi Developers Pune",
      "image": "https://skyidevelopers.in/songbirds-1.webp",
      "telephone": "+91-20-66143000",
      "priceRange": "₹45 Lakhs - ₹2.5 Crores",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Skymark One, Balewadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411045",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "OfferCatalog",
      "name": "SKYi Official Real Estate & NA Plot Projects",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Residence",
            "name": "Skyi Songbirds & SKYi Tigers Nest",
            "address": { "@type": "PostalAddress", "addressLocality": "Bhugaon, Paud Road", "addressRegion": "Pune", "addressCountry": "IN" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Residence",
            "name": "SKYi Manas Lake & SKYi Manas Lake NA Bungalow Plots",
            "address": { "@type": "PostalAddress", "addressLocality": "Bhukum / Bavdhan, Paud Road", "addressRegion": "Pune", "addressCountry": "IN" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Residence",
            "name": "SKYi Park & SKYi Iris",
            "address": { "@type": "PostalAddress", "addressLocality": "Baner / Bavdhan", "addressRegion": "Pune", "addressCountry": "IN" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Residence",
            "name": "SKYi PWC Towers & SKYi Aura Heights",
            "address": { "@type": "PostalAddress", "addressLocality": "Bhugaon / Bavdhan", "addressRegion": "Pune", "addressCountry": "IN" }
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
