import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070b1f',
};

export const metadata: Metadata = {
  title: 'Skyi Developers Pune | Luxury 2, 3 & 4 BHK Flats | Songbirds, Manas Lake, Star City, NA Plots',
  description: 'Skyi Developers — Pune\'s most trusted premium real estate developer since 2004. Luxury 2 BHK, 3 BHK & 4 BHK flats at Songbirds (Bhugaon), SKYi Manas Lake (Bavdhan/Bhukum/Paud Road), Star City (Dhayari). NA Bungalow Plots launching 2025. 23+ projects, 7000+ homes. RERA & IGBC certified. ☎ +91 20 6614 3000.',
  keywords: [
    'Skyi Developers', 'SKYi Developers', 'Skyi Developer Pune', 'Skyi real estate Pune', 'Skyi properties Pune',
    'Skyi Songbirds', 'Skyi Songbirds Bhugaon', 'Songbirds Bhugaon Pune', '3 BHK flats Bhugaon', '4 BHK flats Bhugaon',
    'Manas Lake Pune', 'SKYi Manas Lake', 'Manas Lake Bavdhan', 'Manas Lake Bhukum', 'Manas Lake Paud Road',
    'NA bungalow plots Pune', 'NA plots Bhukum', 'NA plots Bavdhan', 'NA plots Manas Lake', 'NA plots Bhugaon',
    'PMRDA approved NA plots Pune', 'clear title NA plots Pune', 'villa plots Paud Road Pune', 'NRI real estate investment Pune'
  ],
  authors: [{ name: 'Skyi Developers' }],
  publisher: 'Skyi Developers',
  metadataBase: new URL('https://skyidevelopers.com'),
  alternates: {
    canonical: 'https://skyidevelopers.com/',
    languages: {
      'en-IN': 'https://skyidevelopers.com/',
      'en': 'https://skyidevelopers.com/',
      'x-default': 'https://skyidevelopers.com/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://skyidevelopers.com/',
    title: 'Skyi Developers Pune | Premium Residences & NA Bungalow Plots',
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
      "@id": "https://skyidevelopers.com/#organization",
      "name": "Skyi Developers",
      "alternateName": ["SKYi Developers", "Skyi Developer Pune"],
      "url": "https://skyidevelopers.com/",
      "logo": "https://skyidevelopers.com/logo-white.svg",
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
      "@id": "https://skyidevelopers.com/#agent",
      "name": "Skyi Developers Pune",
      "image": "https://skyidevelopers.com/songbirds-1.webp",
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
