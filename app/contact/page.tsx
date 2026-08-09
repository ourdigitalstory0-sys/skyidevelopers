import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'Contact Us & VIP Site Visit Booking | Skyi Developers Pune',
  description: 'Book your VIP site visit for SKYi Manas Lake NA Bungalow Plots Bhukum or Skyi Songbirds Bhugaon. Contact Skyi Developers at +91 20 6614 3000.',
  alternates: {
    canonical: 'https://skyidevelopers.in/contact',
  },
};

export default function ContactPage() {
  return <Home />;
}
