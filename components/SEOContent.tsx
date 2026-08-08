'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Award, Shield, Leaf, FileCheck, CheckCircle2, Globe, DollarSign, ShieldCheck } from 'lucide-react';
import './SEOContent.css';

/* ─── FAQ Data (also embedded as schema in app/layout.tsx) ─── */
const FAQS = [
  {
    q: 'What are all the projects by Skyi Developers in Pune?',
    a: 'Skyi Developers has a wide portfolio across West Pune: (1) Skyi Songbirds — 45+ acre township with 1, 3 & 4 BHK homes at Bhugaon. (2) SKYi Manas Lake & NA Bungalow Plots — 90+ acre IGBC Platinum lakeside township with 2 & 3 BHK apartments and PMRDA NA villa plots at Bhukum/Bavdhan on Paud Road. (3) SKYi Tigers Nest & SKYi PWC Towers — hillside and club-integrated residences at Bhugaon. (4) SKYi Park & SKYi Iris — boutique luxury homes at Baner. (5) SKYi Aura Heights — luxury hillside homes at Bhugaon/Bavdhan. (6) Skyi Star City — 20-acre integrated township at Dhayari near DSK Vishwa.',
  },
  {
    q: 'What is SKYi Tigers Nest and SKYi PWC Towers in Bhugaon Pune?',
    a: 'SKYi Tigers Nest and SKYi PWC Towers are flagship residential developments within the Skyi Songbirds campus at Bhugaon, Paud Road, Pune. Tigers Nest features luxury hillside sanctuary homes overlooking the NDA forest reserve, while PWC Towers are elite residences integrated directly with the 5-acre Poona Western Club sports complex.',
  },
  {
    q: 'Where are SKYi Park and SKYi Iris located in Baner and Bavdhan?',
    a: 'SKYi Park and SKYi Iris are boutique residential developments situated in Baner and Bavdhan, Pune. Positioned close to Hinjawadi IT Park, Pashan, Sus, Aundh, and Pune University Road, they offer 2 & 3 BHK luxury residences with zero-passage efficient home designs.',
  },
  {
    q: 'Where is Skyi Songbirds located?',
    a: 'Skyi Songbirds is located at Bhugaon, Pune — just 10 minutes from Kothrud, near Bavdhan on Paud Road. The 45+ acre township is surrounded by the Sahyadri Hills and the 7,000-acre NDA forest, offering premium 1 BHK, 3 BHK and 4 BHK residences in a truly natural setting.',
  },
  {
    q: 'Where is SKYi Manas Lake located? Is it in Bavdhan or Bhukum?',
    a: 'SKYi Manas Lake is located on Paud Road, straddling the Bavdhan and Bhukum areas of Pune. It is approximately 15 minutes from the Mumbai–Pune Expressway. The 90–100 acre township is IGBC Platinum and CRISIL certified, making it Pune\'s premier eco-friendly lakeside residential community offering 2 BHK, 3 BHK apartments and NA villa plots.',
  },
  {
    q: 'How far are SKYi NA Bungalow Plots from Chandani Chowk Metro Station?',
    a: 'SKYi Manas Lake NA Bungalow Plots at Bhukum are located just 6 to 8 minutes (approx. 4.5 km) from Chandani Chowk Metro Station and Kothrud flyover, connected via wide 6-lane Paud Road. This provides seamless metro access to Deccan Gymkhana, Shivajinagar, and Hinjewadi.',
  },
  {
    q: 'Can NRIs (Non-Resident Indians) buy NA bungalow plots or flats in Pune?',
    a: 'Yes! Under FEMA (Foreign Exchange Management Act) and RBI guidelines, NRIs and OCIs (Overseas Citizens of India) holding valid Indian passports can freely purchase residential properties and PMRDA-approved NA bungalow plots in Pune using NRE/NRO bank accounts without requiring prior RBI permission.',
  },
  {
    q: 'Does Skyi Developers have NA bungalow plots for sale in Pune?',
    a: 'Yes! Skyi Developers is launching the exclusive SKYi Manas Lake Plotting Project in 2025 at the Manas Lake campus, Bhukum, Paud Road, Pune — just minutes from Chandani Chowk and Kothrud. These PMRDA-sanctioned 100% clear title Non-Agricultural (NA) bungalow plots range from 1,500 to 5,000+ sq.ft. with full serviced underground infrastructure and access to 90-acre township amenities.',
  },
  {
    q: 'What are the details of the SKYi Manas Lake Plotting Project in Bhukum Pune?',
    a: 'SKYi Manas Lake Plotting Project at Bhukum, Paud Road, Pune offers luxury NA villa plots set against a serene lake backdrop. The plots come with PMRDA sanctioning, 100% clear title legal status, underground water, electricity & fiber optic internet lines, wide internal concrete roads, street lighting, and gated security access.',
  },
  {
    q: 'Why invest in NA bungalow plots in Bhukum, Bhugaon, and near Chandani Chowk Pune?',
    a: 'Bhukum and Bhugaon on Paud Road represent West Pune\'s fastest growing luxury residential corridor, positioned right next to Bavdhan, Chandani Chowk flyover, and Kothrud. Owning an NA bungalow plot here provides rapid land value appreciation, freedom to construct bespoke multi-story villas, and proximity to Hinjawadi IT Park while enjoying clean air near Manas Lake and the Sahyadri Hills.',
  },
  {
    q: 'Is Skyi Developers RERA registered and certified?',
    a: 'Yes, Skyi Developers is fully RERA registered in Maharashtra. All projects — Skyi Songbirds (Bhugaon), SKYi Manas Lake (Bavdhan/Bhukum), SKYi Park (Baner), SKYi Aura Heights (Bhugaon) and Skyi Star City (Dhayari) — are RERA-approved, ensuring complete transparency and legal safety for home buyers in Pune.',
  },
  {
    q: 'How many years of experience does Skyi Developers have in Pune?',
    a: 'Skyi Developers has over 20 years of experience in premium residential real estate development in Pune since 2004. We have delivered 23+ projects, 7,000+ homes, earned 150+ awards, and have 30,000+ happy residents living in our communities across West and South Pune.',
  },
];

/* ─── Location Data ─── */
const LOCATIONS = [
  {
    project: 'Skyi Songbirds & Tigers Nest',
    area: 'Bhugaon, Paud Road, Pune',
    config: '1, 3 & 4 BHK Luxury Flats & Hillside Homes',
    acres: '45+',
    status: 'Ongoing / Under Construction',
    nearBy: 'Kothrud (10 mins), Bavdhan, Paud Road, NDA Forest',
    color: 'var(--accent-1)',
  },
  {
    project: 'SKYi Manas Lake',
    area: 'Paud Road, Bavdhan / Bhukum, Pune',
    config: '2 & 3 BHK Lakeside Apartments',
    acres: '90-100',
    status: 'Delivered / Ready Possession',
    nearBy: 'Bavdhan, Mumbai–Pune Expressway, Kothrud',
    color: '#43e97b',
  },
  {
    project: 'SKYi Manas Lake NA Plots',
    area: 'Manas Lake Campus, Bhukum, Paud Road, Pune',
    config: 'NA Villa Plots (1,500 – 5,000+ sq.ft.)',
    acres: 'Gated Township Plotting',
    status: 'Launching 2025',
    nearBy: 'Chandani Chowk (6 mins), Kothrud (12 mins), Pirangut',
    color: '#3b82f6',
  },
  {
    project: 'SKYi Park & SKYi Iris',
    area: 'Baner & Bavdhan Corridor, Pune',
    config: '2 & 3 BHK Luxury Residences',
    acres: 'Boutique Prime Urban',
    status: 'Delivered / Ongoing',
    nearBy: 'Hinjewadi IT Hub, Pashan, Sus, Aundh',
    color: 'var(--accent-4)',
  },
  {
    project: 'Skyi Star City',
    area: 'Dhayari, Pune',
    config: '2 & 3 BHK Homes',
    acres: '20',
    status: 'Delivered',
    nearBy: 'DSK Vishwa, Sinhagad Road, Katraj Bypass',
    color: 'var(--accent-gold)',
  },
];

const NA_PLOT_CHECKLIST = [
  {
    title: 'PMRDA Sanctioned Layout',
    desc: '100% legally approved layout by Pune Metropolitan Region Development Authority.',
  },
  {
    title: '100% Clear Title 7/12 Extract',
    desc: 'Unencumbered land titles with single-owner clearance and zero litigation history.',
  },
  {
    title: 'Residential Zone (R-Zone) Status',
    desc: 'Zoned strictly for residential villa and bungalow construction.',
  },
  {
    title: 'Underground Infrastructure',
    desc: 'Pre-laid water supply lines, electrical cables, fiber optics, and storm drainage.',
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
    title: 'RERA Legal Safeguards',
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

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="seo-section" id="about">
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
            <p className="trust-title">CRISIL Rated &amp; RERA Registered</p>
            <p className="trust-sub">100% Legal Transparency</p>
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
            <span className="section-subtitle">All Projects</span>
            <h2 className="section-title seo-h2">
              Skyi Developments<br />
              <span className="gradient-text">Across Pune Footprint</span>
            </h2>
            <div className="glow-line" style={{ marginTop: 16, marginBottom: 28 }} />

            <p className="seo-intro">
              Skyi Developers (also known as <strong>SKYi Developers</strong>) is one of Pune's most trusted and premium real estate developers,
              with over <strong>20 years</strong> of design excellence. SKYi's footprint spans prime West &amp; South Pune corridors including{' '}
              <strong>Bhugaon, Bhukum, Bavdhan, Baner, Chandani Chowk, Kothrud, Paud Road, Mulshi, and Dhayari</strong>. Key official developments feature{' '}
              <strong>Skyi Songbirds, SKYi Tigers Nest, SKYi PWC Towers, SKYi Aura Heights</strong> at Bhugaon;{' '}
              <strong>SKYi Manas Lake &amp; SKYi Manas Lake NA Bungalow Plots</strong> at Bhukum / Bavdhan;{' '}
              <strong>SKYi Park &amp; SKYi Iris</strong> at Baner; and <strong>Skyi Star City</strong> at Dhayari.
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
              <span className="gradient-text">About SKYi Projects</span>
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
          <h3>NRI Property &amp; Plot Investment Guide for Pune Real Estate</h3>
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
          <div className="guide-badge"><FileCheck size={16} /> PMRDA &amp; RERA Guide</div>
          <h3>Pune NA Bungalow Plots Legal &amp; Infrastructure Checklist</h3>
          <p>Key legal parameters to verify before investing in Non-Agricultural bungalow plots in Bhukum, Bhugaon, Bavdhan, Baner, or Paud Road.</p>
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
          <strong>Skyi Songbirds Bhugaon</strong>, <strong>SKYi Tigers Nest Bhugaon</strong>, <strong>SKYi PWC Towers</strong>, <strong>SKYi PWC Towers Hillside</strong>, <strong>SKYi Aura Heights Bhugaon Bavdhan</strong>, <strong>SKYi Manas Lake Bhukum Bavdhan</strong>, <strong>SKYi Manas Lake NA Bungalow Plots Bhukum Paud Road</strong>, <strong>SKYi Park Baner</strong>, <strong>SKYi Iris Baner Bavdhan</strong>, <strong>SKYi Five Racecourse</strong>, <strong>SKYi Five Maidan</strong>, <strong>SKYi Five Baner</strong>, <strong>SKYi Nilay</strong>, <strong>SKYi Aquila</strong>, <strong>SKYi Seher Towers</strong>, and <strong>Skyi Star City Dhayari</strong>.
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Target Micro-Market Keywords</strong>: NA bungalow plots Bhugaon, NA plots Bhukum, NA plots Bavdhan, NA plots Baner, NA plots Chandani Chowk, NA plots Kothrud, NA plots Paud Road, NA plots Mulshi, NA plots Pirangut, NA plots Sus, NA plots Pashan, NA plots Hinjewadi, NA plots Balewadi, NA plots Aundh, NA plots Wakad, NA plots Warje, NA plots Karve Nagar, NA plots Deccan, NA plots Shivajinagar.
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Buyer-Intent &amp; Hinglish Search Queries</strong>: buy NA plot pune, buy bungalow plot bhugaon, buy plot in bhukum, buy villa plot bavdhan, residential land for sale pune, best NA plots pune, NA plots under 50 lakhs pune, NA plots under 75 lakhs pune, NA plots under 1 crore pune, pune madhe plot, pune plot for sale, pune NA plot sale, bhugaon plot, bhukum NA plot, bavdhan bungalow plot, ghar bandhnya sathi plot pune, bungalow bandhnya sathi plot pune, gharasathi plot pune, swatacha bungalow pune plot, investment sathi plot pune, pune madhe jamin.
        </p>
      </div>
    </section>
  );
}
