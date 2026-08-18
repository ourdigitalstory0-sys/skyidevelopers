'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Award, Shield, Leaf, FileCheck, CheckCircle2, Globe, DollarSign, ShieldCheck, Compass, Landmark, BookOpen } from 'lucide-react';
import './SEOContent.css';

/* ─── Ultra-Advanced FAQ Data ─── */
const FAQS = [
  {
    q: 'What are the top micro-locations for NA bungalow plots in Pune?',
    a: 'The premier micro-locations for PMRDA-approved NA bungalow plots in Pune include: (1) Bhukum & Bhugaon on Paud Road (6-10 mins from Chandani Chowk Metro), (2) Pirangut & Lavasa Road (scenic green corridor), (3) Kasarsai Lake & Marunji (12 mins from Hinjawadi Phase 3), (4) Sus & Bavdhan Annexe (5 mins from Baner), (5) Talegaon Dabhade & Kanhe (Old Pune-Mumbai Expressway), (6) Khadakwasla & Donje (lakefront & Sinhagad base), (7) Wagholi & Kesnand (East Pune Kharadi IT link), and (8) Saswad Road / Bopedev Ghat (Purandar Airport corridor).',
  },
  {
    q: 'What are the starting plot sizes and prices for SKYi NA Bungalow Plots in Pune?',
    a: 'SKYi NA Bungalow Plots start from 2,000 SQFT onwards (ranging from 2,000 to 6,000+ sq.ft.) with land prices starting from ₹95 Lakhs*. All plots feature PMRDA R-Zone sanction, 100% clear title 7/12 extracts, individual PR cards, and pre-approved bank loans.',
  },
  {
    q: 'What are all the official developments by Skyi Developers in Pune?',
    a: 'Skyi Developers has a comprehensive portfolio across Pune: (1) SKYi Manas Lake NA Bungalow Plots at Bhukum/Bavdhan. (2) SKYi Star Town NA Villa Plots at Bhugaon. (3) SKYi Valley NA Estate at Pirangut. (4) SKYi Lakeside Meadows at Kasarsai Dam. (5) SKYi Ridge NA Plots at Sus/Bavdhan. (6) SKYi Breeze NA Plots at Talegaon. (7) Skyi Songbirds, SKYi Tigers Nest, SKYi PWC Towers at Bhugaon. (8) SKYi Park & SKYi Iris at Baner. (9) Skyi Star City at Dhayari.',
  },
  {
    q: 'What is the legal process for checking a 7/12 extract and PMRDA sanction for NA plots in Pune?',
    a: 'Before purchasing an NA bungalow plot in Pune, verify: (1) PMRDA Sanctioned Layout Order & R-Zone classification. (2) 100% Clear Title 7/12 Extract with single owner name and zero bank encumbrances/litigation. (3) Individual Property Card (PR Card) issued by Land Records Dept. (4) Demarcated plot boundary with 30-50ft internal concrete roads. SKYi Developers provides 100% verified 7/12 extracts, PR Cards, and bank loan approvals (SBI, HDFC, ICICI) for all plot developments.',
  },
  {
    q: 'Can I build a multi-story villa or bungalow on PMRDA NA plots in Bhukum or Bhugaon?',
    a: 'Yes! Under Unified DCR (Development Control Regulations) of PMRDA, residential (R-Zone) NA bungalow plots in Bhukum, Bhugaon, Pirangut, and Kasarsai permit an FSI ranging from 1.1 to 1.5+. This allows owners to construct Ground + 2 or Ground + 3 floor custom luxury villas, complete with private gardens, swimming pools, and rooftop terrace decks.',
  },
  {
    q: 'Where are SKYi NA Bungalow Plots located on Paud Road?',
    a: 'SKYi Manas Lake NA Bungalow Plots are situated within the 90+ acre Manas Lake campus at Bhukum on Paud Road, Pune — just 6 minutes (4.5 km) from Chandani Chowk Metro Station and Kothrud flyover. SKYi Star Town NA Plots are located right next door in Bhugaon, offering views of the 7,000-acre NDA forest reserve.',
  },
  {
    q: 'How far are Kasarsai Lake NA plots from Hinjawadi Phase 3 IT Park?',
    a: 'Kasarsai Dam Lakefront NA Bungalow Plots (SKYi Lakeside Meadows) are located just 12 to 15 minutes from Hinjawadi Phase 3 (Rajiv Gandhi Infotech Park). This makes Kasarsai the #1 choice for IT professionals looking to build private resort-style villas near work.',
  },
  {
    q: 'Are bank loans available for buying NA plots in Pune micro-locations?',
    a: 'Yes! All SKYi NA bungalow plots across Bhukum, Bhugaon, Pirangut, Kasarsai, Talegaon, Khadakwasla, and Wagholi are pre-approved by leading financial institutions including SBI (State Bank of India), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Maharashtra, offering up to 70%–80% plot purchase loan financing.',
  },
  {
    q: 'Can NRIs (Non-Resident Indians) buy PMRDA NA bungalow plots in Pune?',
    a: 'Yes! Under FEMA and RBI general permissions, NRIs and OCIs can freely purchase residential PMRDA-approved NA plots and villas in Pune using NRE/NRO banking channels without prior RBI approval.',
  },
  {
    q: 'Why should I invest in PMRDA NA plots in West Pune over completed apartments?',
    a: 'NA bungalow plots in West Pune (Bhukum, Bhugaon, Pirangut) offer 100% land ownership (7/12 title), 12%–18% historical CAGR land appreciation, zero maintenance overheads during land holding, and full architectural freedom to construct bespoke multi-generational luxury villas.',
  },
];

/* ─── Location Data ─── */
const LOCATIONS = [
  {
    project: 'SKYi Manas Lake NA Plots',
    area: 'Manas Lake Campus, Bhukum, Paud Road, Pune',
    config: 'NA Villa Plots (2,000 – 6,000+ sq.ft.) — Starting ₹95 Lakhs*',
    acres: '90-Acre Gated Township',
    status: 'Launching 2025',
    nearBy: 'Chandani Chowk (6 mins), Kothrud (12 mins), Bavdhan',
    color: '#3b82f6',
  },
  {
    project: 'SKYi Star Town NA Plots',
    area: 'Bhugaon Foothills, Paud Road, Pune',
    config: 'PMRDA NA Villa Plots (2,000 – 6,000 sq.ft.) — Starting ₹95 Lakhs*',
    acres: 'Gated Villa Estate',
    status: 'Ongoing Plotting',
    nearBy: 'Kothrud Flyover (10 mins), NDA Forest Reserve',
    color: 'var(--accent-1)',
  },
  {
    project: 'SKYi Valley NA Estate',
    area: 'Pirangut Hub, Paud Road, Pune',
    config: 'Clear Title NA Plots (2,000 – 5,000 sq.ft.) — Starting ₹95 Lakhs*',
    acres: 'PMRDA Approved',
    status: 'Ongoing Plotting',
    nearBy: 'Pirangut Market, Ghotawade Phata, Lavasa Road',
    color: '#43e97b',
  },
  {
    project: 'SKYi Lakeside Meadows',
    area: 'Kasarsai Dam Lakefront, Hinjewadi Extension',
    config: 'Lakeside NA Villa Plots (2,000 – 6,000 sq.ft.) — Starting ₹95 Lakhs*',
    acres: 'Dam Front Sanctuary',
    status: 'Pre-Launch',
    nearBy: 'Hinjawadi Phase 3 (12 mins), Marunji, Nere',
    color: '#38bdf8',
  },
  {
    project: 'Skyi Songbirds & Tigers Nest',
    area: 'Bhugaon, Paud Road, Pune',
    config: '1, 3 & 4 BHK Luxury Flats & Hillside Homes',
    acres: '45+',
    status: 'Ongoing / Under Construction',
    nearBy: 'Kothrud (10 mins), Bavdhan, Paud Road, NDA Forest',
    color: 'var(--accent-gold)',
  },
];

const NA_MICRO_LOCATION_GUIDE = [
  {
    name: 'Bhukum & Bhugaon (Paud Road Corridor)',
    tagline: 'West Pune’s #1 High-Appreciation Luxury Villa Belt',
    desc: 'Located just 6–10 minutes from Chandani Chowk and Kothrud flyover, Bhukum and Bhugaon feature 6-lane Paud Road connectivity, proximity to Manas Lake, and panoramic views of the 7,000-acre NDA forest reserve.',
    fsi: '1.4 - 1.5 FSI',
    priceTrend: '₹4,750 - ₹7,500 / sq.ft.',
  },
  {
    name: 'Pirangut & Lavasa Road (Mulshi Valley)',
    tagline: 'Scenic Hillside & Green Sanctuary Plotting',
    desc: 'Surrounded by lush Sahyadri hills, Pirangut and Lavasa Road offer tranquil living with excellent PMRDA layout approvals, clean air index, and direct link to Hinjawadi Phase 3 via Ghotawade Phata.',
    fsi: '1.25 - 1.4 FSI',
    priceTrend: '₹4,750 - ₹5,500 / sq.ft.',
  },
  {
    name: 'Kasarsai Dam & Marunji (Hinjawadi IT Belt)',
    tagline: 'Resort-Style Lakefront Villa Plots for IT Professionals',
    desc: 'Fronting the serene Kasarsai Dam reservoir and just 12 mins from Rajiv Gandhi Infotech Park Phase 3, this micro-location offers rapid capital appreciation driven by tech workforce demand.',
    fsi: '1.4 FSI',
    priceTrend: '₹4,750 - ₹6,500 / sq.ft.',
  },
  {
    name: 'Sus & Bavdhan Annexe (Urban Extension)',
    tagline: 'Prime Urban Gated NA Bungalow Estates',
    desc: 'Minutes away from Baner High Street, Pashan Lake, and Pune University, Sus and Bavdhan Annexe represent premium city-fringe plotting with full underground municipal utilities.',
    fsi: '1.5 FSI',
    priceTrend: '₹5,200 - ₹9,500 / sq.ft.',
  },
  {
    name: 'Talegaon Dabhade & Kanhe Phata (PCMC Corridor)',
    tagline: 'Mumbai-Pune Expressway Connectivity & Breezy Climate',
    desc: 'Situated along the Old Pune-Mumbai Highway and Expressway, Talegaon offers cooler temperatures, industrial/IT hub proximity, and clear title PMRDA bungalow plots.',
    fsi: '1.4 FSI',
    priceTrend: '₹4,750 - ₹5,200 / sq.ft.',
  },
  {
    name: 'Khadakwasla & Donje (Sinhagad Base)',
    tagline: 'Lake View Holiday & Weekend Bungalow Land',
    desc: 'Overlooking Khadakwasla Dam and the iconic Sinhagad Fort, this South-West Pune corridor is ideal for build-your-own holiday homes and weekend retreats within 25 mins of Deccan.',
    fsi: '1.2 FSI',
    priceTrend: '₹4,750 - ₹5,500 / sq.ft.',
  },
];

/* ─── Ultra-Advanced SEO Articles Reader Data ─── */
const SEO_ARTICLES = [
  {
    id: 'paud-road-guide',
    title: 'The Master Guide to PMRDA NA Bungalow Plots on Paud Road & Bhukum',
    readTime: '6 min read',
    category: 'West Pune Blueprint',
    content: `Paud Road in West Pune is widely recognized as the city's premier corridor for luxury residential plotting and custom villa construction. Connecting Kothrud and Chandani Chowk to Bhugaon, Bhukum, Pirangut, and Mulshi, Paud Road has transformed into a high-appreciation green residential haven.

PMRDA-sanctioned NA Bungalow Plots at Bhukum (such as SKYi Manas Lake NA Plots) offer plot sizes starting from 2,000 SQFT onwards with land pricing starting at ₹95 Lakhs*. Being situated within a 90-acre IGBC Platinum certified lakeside township guarantees 100% legal clearance, 7/12 single-owner extract titles, individual Property Cards (PR Cards), 40ft/50ft internal concrete roads, pre-laid underground utilities, and pre-approved bank loans from SBI, HDFC, ICICI, and Axis Bank.`,
  },
  {
    id: 'kasarsai-it-belt',
    title: 'Hinjawadi IT Corridor: Kasarsai Dam Lakefront NA Plots for IT Executives',
    readTime: '5 min read',
    category: 'IT Belt Analysis',
    content: `For IT leaders and tech professionals working at Rajiv Gandhi Infotech Park Hinjawadi (Phases 1, 2, and 3), owning an independent lakefront NA bungalow plot at Kasarsai Dam reservoir represents the ultimate lifestyle upgrade.

Situated just 12 minutes from Hinjawadi Phase 3, SKYi Lakeside Meadows at Kasarsai provides PMRDA R-Zone sanctioned plot layouts starting from 2,000 SQFT at ₹95 Lakhs*. Owners benefit from 1.4 FSI, enabling custom construction of Ground + 2 luxury smart villas overlooking the serene Kasarsai reservoir while retaining rapid access to Hinjawadi, Marunji, Nere, and the Pune-Mumbai Expressway.`,
  },
  {
    id: 'legal-due-diligence',
    title: '7/12 Extract, PR Card & PMRDA Sanction: Legal Checklist for Pune Plot Buyers',
    readTime: '7 min read',
    category: 'Legal & Title Safety',
    content: `Buying Non-Agricultural (NA) land in Pune requires strict legal due diligence. The 4 mandatory legal pillars to verify before paying a token amount include:

1. PMRDA Sanctioned Layout Order: Ensure the master layout is sanctioned by PMRDA with residential R-Zone status.
2. 7/12 Extract (Saat Bara): Verify Line 1 owner names, ensure the 'Ither Haq' (Other Rights) column has no undisclosed bank mortgages, and verify Ferfar (mutation entry) history.
3. Property Card (PR Card / Sampatti Patrak): Confirm government Land Records Department boundary measurements.
4. Bank Loan Pre-Approval: Pre-approval by tier-1 banks (SBI, HDFC, ICICI) guarantees title clearance. SKYi Developers provides 100% verified legal documentation for all plot projects.`,
  },
  {
    id: 'sus-bavdhan-urban-plotting',
    title: 'Sus & Bavdhan Annexe: City-Fringe Gated Plotted Communities',
    readTime: '4 min read',
    category: 'Urban Fringe Focus',
    content: `Sus and Bavdhan Annexe represent West Pune's most sought-after urban fringe plotted locations, situated just 5 minutes from Baner High Street, Pashan Lake, Aundh, and Balewadi.

With PMRDA 1.5 FSI approvals, plots in Sus and Bavdhan starting from 2,000 SQFT provide high-net-worth individuals the rare opportunity to build custom architectural mansions with private plunge pools, elevators, and rooftop decks right on the edge of Pune city.`,
  },
  {
    id: 'talegaon-expressway-belt',
    title: 'Talegaon & Kanhe Phata: Expressway Link & Breezy Mountain Plotting',
    readTime: '5 min read',
    category: 'Expressway Growth',
    content: `Positioned along the Old Pune-Mumbai Highway and the Pune-Mumbai Expressway, Talegaon Dabhade and Kanhe Phata offer a cool mountain microclimate, industrial/IT hub proximity, and clear title PMRDA bungalow plots.

With plot sizes from 2,000 SQFT onwards starting at ₹95 Lakhs*, Talegaon represents an ideal investment for buyers seeking weekend retreats or primary homes connected to both Mumbai and PCMC.`,
  },
  {
    id: 'khadakwasla-saswad-corridor',
    title: 'Resort Living: Khadakwasla Lake View & Purandar Airport Growth Belt',
    readTime: '5 min read',
    category: 'Holiday & Airport Corridor',
    content: `South and South-West Pune feature two distinct plotted growth zones: Khadakwasla/Donje (fronting Khadakwasla Dam and Sinhagad Fort) and Bopedev Ghat/Saswad (the Purandar International Airport corridor).

These PMRDA R-Zone plots provide tranquil, pollution-free valley surroundings 25 minutes from Deccan Gymkhana, offering outstanding long-term land appreciation for resort bungalow builders.`,
  },
];

const NA_PLOT_CHECKLIST = [
  {
    title: 'PMRDA Sanctioned Layout Order',
    desc: '100% legally approved master plan layout issued by Pune Metropolitan Region Development Authority.',
  },
  {
    title: '100% Clear Title 7/12 Extract',
    desc: 'Unencumbered land titles with single-owner clearance, zero litigation history, and zero bank mortgages.',
  },
  {
    title: 'Individual PR Card (Property Card)',
    desc: 'Government Land Records PR Card generated per plot for seamless registration and ownership transfer.',
  },
  {
    title: 'Residential Zone (R-Zone) Status',
    desc: 'Zoned strictly for residential villa and bungalow construction under Unified DCR guidelines.',
  },
  {
    title: 'Underground Infrastructure Pre-Laid',
    desc: 'Serviced plots with pre-laid water supply connections, underground electricity, storm drainage, and fiber optics.',
  },
  {
    title: '30ft - 50ft Concrete Internal Roads',
    desc: 'Wide internal asphalt/concrete avenues with street lighting, paved footpaths, and entrance security plazas.',
  },
];

const NRI_BENEFITS = [
  {
    title: 'FEMA & RBI Compliance',
    desc: '100% compliant property acquisition guidelines for NRIs & OCIs via NRE/NRO banking channels.',
    icon: <ShieldCheck size={20} />,
  },
  {
    title: 'Capital Repatriability',
    desc: 'Seamless repatriation of sale proceeds (up to USD 1 Million per financial year under RBI general permission).',
    icon: <DollarSign size={20} />,
  },
  {
    title: 'RERA & PMRDA Legal Safeguards',
    desc: 'Escrow account security, mandatory completion timelines, and transparent title documentation under MahaRERA.',
    icon: <FileCheck size={20} />,
  },
  {
    title: 'Global NRI Desk & Virtual Tours',
    desc: 'End-to-end assistance with Power of Attorney (PoA) execution, virtual 3D site tours, and tenant management.',
    icon: <Globe size={20} />,
  },
];

export default function SEOContent() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeArticleId, setActiveArticleId] = useState<string>('paud-road-guide');

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  const activeArticle = SEO_ARTICLES.find((a) => a.id === activeArticleId) || SEO_ARTICLES[0];

  return (
    <section className="seo-section" id="about">
      {/* ── Schema.org JSON-LD Microdata for Pune NA Plots ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Place',
            name: 'SKYi NA Bungalow Plots & Townships Pune',
            description: 'PMRDA Sanctioned Clear Title NA Bungalow Plots across Bhukum, Bhugaon, Pirangut, Kasarsai, Talegaon, Khadakwasla, Wagholi & Saswad in Pune.',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 18.5100,
              longitude: 73.7500,
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bhukum, Paud Road',
              addressRegion: 'Pune, Maharashtra',
              addressCountry: 'IN',
            },
          }),
        }}
      />

      {/* ── Trust Badges Strip ── */}
      <div className="trust-strip">
        <div className="trust-item">
          <Award size={22} />
          <div>
            <p className="trust-title">20+ Years Excellence</p>
            <p className="trust-sub">Established 2004 in Pune</p>
          </div>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <Leaf size={22} />
          <div>
            <p className="trust-title">IGBC Platinum Certified</p>
            <p className="trust-sub">Zero-Waste Sustainable Townships</p>
          </div>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <Shield size={22} />
          <div>
            <p className="trust-title">CRISIL Rated &amp; PMRDA Approved</p>
            <p className="trust-sub">100% Clear Title 7/12 Extracts</p>
          </div>
        </div>
      </div>

      <div className="seo-inner">
        {/* ── Left: Project locations table ── */}
        <div className="seo-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-subtitle">All Developments</span>
            <h2 className="section-title seo-h2">
              Skyi Developments<br />
              <span className="gradient-text">Across Pune Footprint</span>
            </h2>
            <div className="glow-line" style={{ marginTop: 16, marginBottom: 28 }} />

            <p className="seo-intro">
              Skyi Developers (also known as <strong>SKYi Developers</strong>) is one of Pune's most trusted real estate developers,
              with over <strong>20 years</strong> of design &amp; plotting excellence. SKYi's footprint spans prime Pune NA plot &amp; township corridors including{' '}
              <strong>Bhugaon, Bhukum, Bavdhan, Chandani Chowk, Kothrud, Paud Road, Pirangut, Kasarsai, Talegaon, Khadakwasla, Wagholi &amp; Dhayari</strong>. Key developments feature{' '}
              <strong>SKYi Manas Lake NA Bungalow Plots</strong> at Bhukum; <strong>SKYi Star Town NA Plots</strong> at Bhugaon;{' '}
              <strong>SKYi Valley NA Plots</strong> at Pirangut; <strong>SKYi Lakeside Meadows</strong> at Kasarsai Dam; and{' '}
              <strong>Skyi Songbirds &amp; SKYi Tigers Nest</strong> at Bhugaon.
            </p>
          </motion.div>

          <div className="location-cards">
            {LOCATIONS.map((loc, i) => (
              <motion.article
                key={loc.project}
                className="location-card glass"
                style={{ '--loc-color': loc.color } as React.CSSProperties}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ x: 6 }}
              >
                <div className="lc-accent" />
                <div className="lc-body">
                  <div className="lc-top">
                    <h3 className="lc-title">{loc.project}</h3>
                    <span className="lc-status">{loc.status}</span>
                  </div>
                  <p className="lc-area">
                    <MapPin size={12} /> {loc.area}
                  </p>
                  <div className="lc-meta">
                    <span>{loc.config}</span>
                    <span className="lc-dot" />
                    <span>{loc.acres}</span>
                  </div>
                  <p className="lc-nearby">Near: {loc.nearBy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Right: FAQ accordion ── */}
        <div className="seo-right">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title seo-h2">
              Common Questions<br />
              <span className="gradient-text">About SKYi NA Plots &amp; Homes</span>
            </h2>
            <div className="glow-line" style={{ marginTop: 16, marginBottom: 28 }} />
          </motion.div>

          <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                className={`faq-item glass ${openIdx === i ? 'open' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIdx === i}
                >
                  <span itemProp="name">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIdx === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="faq-chevron"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p itemProp="text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer Level: Pune NA Bungalow Plots Ecosystem Encyclopedia & Research Archive ── */}
      <motion.div
        className="pune-na-articles-section glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="na-guide-header">
          <div className="guide-badge"><BookOpen size={16} /> Pune NA Plots SEO Encyclopedia</div>
          <h3>Pune NA Bungalow Plots Research Archive &amp; Buying Guides</h3>
          <p>Exhaustive legal, geographical, and investment research covering every NA plot corridor across Pune and vicinity.</p>
        </div>

        <div className="na-articles-wrapper">
          {/* Article Nav Buttons */}
          <div className="na-articles-nav">
            {SEO_ARTICLES.map((art) => (
              <button
                key={art.id}
                type="button"
                className={`na-art-btn ${activeArticleId === art.id ? 'active' : ''}`}
                onClick={() => setActiveArticleId(art.id)}
              >
                <span className="na-art-cat">{art.category}</span>
                <span className="na-art-title">{art.title}</span>
              </button>
            ))}
          </div>

          {/* Active Article Viewer */}
          <div className="na-article-viewer glass">
            <div className="na-art-view-head">
              <span className="na-art-tag">{activeArticle.category}</span>
              <span className="na-art-read"><BookOpen size={14} /> {activeArticle.readTime}</span>
            </div>
            <h4>{activeArticle.title}</h4>
            <div className="na-art-body">
              {activeArticle.content.split('\n\n').map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Pune NA Bungalow Plot Micro-Location Investment Guide ── */}
      <motion.div
        className="pune-zones-section glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="na-guide-header">
          <div className="guide-badge"><Compass size={16} /> Micro-Location Blueprint</div>
          <h3>Pune NA Bungalow Plots Micro-Location Investment Guide</h3>
          <p>Detailed analysis of price trends, FSI allowances, infrastructure, and appreciation potential across Pune’s top plotted residential corridors.</p>
        </div>

        <div className="pune-zones-grid">
          {NA_MICRO_LOCATION_GUIDE.map((guide) => (
            <div key={guide.name} className="pune-zone-card">
              <div className="pz-accent" />
              <h4>{guide.name}</h4>
              <p className="pz-suburbs"><strong>Corridor Advantage:</strong> {guide.tagline}</p>
              <p className="pz-desc">{guide.desc}</p>
              <div className="pz-footer-info" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--accent-gold)' }}>
                <span><Landmark size={12} style={{ display: 'inline', marginRight: '4px' }} /> FSI: {guide.fsi}</span>
                <span>Trend: {guide.priceTrend}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Global NRI Real Estate Investment Guide & Regulatory Hub ── */}
      <motion.div
        className="nri-hub-section glass"
        id="nri-hub"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="nri-hub-header">
          <div className="nri-badge"><Globe size={16} /> Global NRI Investment Hub</div>
          <h3>NRI Property &amp; NA Plot Investment Guide for Pune Real Estate</h3>
          <p>Comprehensive regulatory, banking, and capital growth guide for Non-Resident Indians in UAE, USA, UK, Singapore, Australia &amp; Canada investing in Skyi Pune developments.</p>
        </div>

        <div className="nri-benefits-grid">
          {NRI_BENEFITS.map((item) => (
            <div key={item.title} className="nri-benefit-card">
              <div className="nri-card-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Specialized Pune NA Plots Legal Checklist & Guide ── */}
      <motion.div
        className="na-guide-section glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="na-guide-header">
          <div className="guide-badge"><FileCheck size={16} /> PMRDA &amp; 7/12 Guide</div>
          <h3>Pune NA Bungalow Plots Legal &amp; Infrastructure Checklist</h3>
          <p>Key legal parameters to verify before investing in Non-Agricultural bungalow plots in Bhukum, Bhugaon, Pirangut, Kasarsai, Talegaon, Khadakwasla, or Wagholi.</p>
        </div>

        <div className="na-checklist-grid">
          {NA_PLOT_CHECKLIST.map((item) => (
            <div key={item.title} className="na-check-card">
              <CheckCircle2 size={20} className="na-check-icon" />
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Master Keyword Injection Block (Google Search Guidelines Compliant) ── */}
      <div className="seo-keywords-block">
        <p>
          <strong>Skyi Developers</strong> (also known as <strong>SKYi Developers</strong>) is Pune, Maharashtra's premier real estate builder and developer. Official footprint includes:
          <strong>SKYi Manas Lake NA Bungalow Plots Bhukum Paud Road</strong>, <strong>SKYi Star Town NA Plots Bhugaon</strong>, <strong>SKYi Valley NA Plots Pirangut</strong>, <strong>SKYi Lakeside Meadows NA Plots Kasarsai Dam</strong>, <strong>SKYi Ridge NA Plots Sus Bavdhan</strong>, <strong>SKYi Breeze NA Plots Talegaon Expressway</strong>, <strong>SKYi Waterside NA Plots Khadakwasla</strong>, <strong>SKYi Eastgate NA Plots Wagholi</strong>, <strong>Skyi Songbirds Bhugaon</strong>, <strong>SKYi Tigers Nest Bhugaon</strong>, <strong>SKYi PWC Towers</strong>, <strong>SKYi Aura Heights</strong>, <strong>SKYi Park Baner</strong>, <strong>SKYi Iris Baner Bavdhan</strong>, and <strong>Skyi Star City Dhayari</strong>.
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Entire Pune Real Estate Market &amp; NA Bungalow Plots High-Intent Search Matrix</strong>: NA bungalow plots Pune, PMRDA NA plots Pune, clear title 7/12 extract NA plots Pune, NA plots in Bhukum, NA plots in Bhugaon, NA plots in Pirangut, NA plots in Kasarsai, NA plots in Talegaon, NA plots in Khadakwasla, NA plots in Saswad, NA plots in Wagholi, NA plots in Lavasa Road, NA plots in Lavale, NA plots in Ghotawade Phata, NA plots in Sus Bavdhan, villa plots for sale Paud Road Pune, lakeside NA plots Pune, gated township plotting Pune, PMRDA collector NA approved land Pune, plot for bungalow in Pune, NA plots 2000 sqft Pune, NA plots starting 95 lakhs Pune, buy 1 BHK flat Pune, buy 2 BHK flat Pune, buy 3 BHK flat Pune, buy 4 BHK flat Pune, buy NA plot in Pune, flat for sale in Kothrud, flats for sale in Bavdhan, flats for sale in Bhugaon, flats near Hinjewadi IT Park, ready possession flats Pune, under construction projects Paud Road, lakeside apartments Pune, top real estate developers Pune, best builders in Pune, buy plot in Bhukum, buy bungalow plot Bhugaon, buy villa plot Bavdhan, residential land for sale Pune, ghar bandhnya sathi plot pune, pune madhe NA plot sale, swatacha bungalow pune plot.
        </p>
      </div>
    </section>
  );
}
