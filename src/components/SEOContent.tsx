import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Award, Shield, Leaf, FileCheck, CheckCircle2, Globe, DollarSign, ShieldCheck } from 'lucide-react';
import './SEOContent.css';

/* ─── FAQ Data (also embedded as schema in index.html) ─── */
const FAQS = [
  {
    q: 'What are all the projects by Skyi Developers in Pune?',
    a: 'Skyi Developers has 4 major residential projects in Pune: (1) Skyi Songbirds — 45+ acre township with 1, 3 & 4 BHK homes at Bhugaon, 10 mins from Kothrud. (2) SKYi Manas Lake — 90+ acre IGBC Platinum lakeside township with 2 & 3 BHK apartments at Bavdhan/Bhukum, Paud Road. (3) Skyi Star City — 20-acre integrated township with 2 & 3 BHK homes at Dhayari near DSK Vishwa. (4) NA Bungalow Plots — launching 2025 at Manas Lake campus, Bhukum, Pune.',
  },
  {
    q: 'Where is Skyi Songbirds located?',
    a: 'Skyi Songbirds is located at Bhugaon, Pune — just 10 minutes from Kothrud, near Bavdhan on Paud Road. The 45+ acre township is surrounded by the Sahyadri Hills and the 7,000-acre NDA forest, offering premium 1 BHK, 3 BHK and 4 BHK residences in a truly natural setting.',
  },
  {
    q: 'Where is SKYi Manas Lake located? Is it in Bavdhan or Bhukum?',
    a: 'SKYi Manas Lake is located on Paud Road, straddling the Bavdhan and Bhukum areas of Pune. It is approximately 15 minutes from the Mumbai–Pune Expressway. The 90–100 acre township is IGBC Platinum and CRISIL certified, making it Pune\'s premier eco-friendly lakeside residential community offering 2 BHK and 3 BHK apartments.',
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
    q: 'Why invest in NA bungalow plots in Bhukum and near Chandani Chowk Pune?',
    a: 'Bhukum on Paud Road is West Pune\'s fastest growing luxury residential corridor, positioned right next to Bavdhan, Chandani Chowk flyover, and Kothrud. Owning an NA bungalow plot here provides rapid land value appreciation, freedom to construct bespoke multi-story villas, and proximity to Hinjawadi IT Park while enjoying clean air near Manas Lake and the Sahyadri Hills.',
  },
  {
    q: 'What BHK options are available across Skyi projects in Pune?',
    a: 'Skyi Developers offers a wide range across all projects: 1 BHK (Songbirds, Bhugaon), 2 BHK (Manas Lake — Bavdhan/Bhukum; Star City — Dhayari), 3 BHK (Songbirds — Bhugaon; Manas Lake — Bavdhan; Star City — Dhayari), and 4 BHK (Songbirds — Bhugaon). NA Bungalow Plots are also launching at Manas Lake, Bhukum.',
  },
  {
    q: 'Is Skyi Developers RERA registered and certified?',
    a: 'Yes, Skyi Developers is fully RERA registered in Maharashtra. All projects — Skyi Songbirds (Bhugaon), SKYi Manas Lake (Bavdhan/Bhukum) and Skyi Star City (Dhayari) — are RERA-approved, ensuring complete transparency and legal safety for home buyers in Pune. Manas Lake additionally holds IGBC Platinum and CRISIL certifications.',
  },
  {
    q: 'What are the best flats near Kothrud or NDA Pune?',
    a: 'Skyi Songbirds at Bhugaon is the best luxury residential option near Kothrud and NDA, Pune. Located just 10 minutes from Kothrud and adjacent to the 7,000-acre NDA forest on Paud Road, it offers 1 BHK, 3 BHK and 4 BHK premium residences with the Poona Western Club, Sports Academies and a Zero Waste Campus.',
  },
  {
    q: 'How many years of experience does Skyi Developers have in Pune?',
    a: 'Skyi Developers has over 20 years of experience in premium residential real estate development in Pune since 2004. We have delivered 23+ projects, 7,000+ homes, earned 150+ awards, and have 30,000+ happy residents living in our communities across West and South Pune.',
  },
  {
    q: 'What is the contact number and office address for Skyi Developers Pune?',
    a: 'Skyi Developers office: Skymark One, Balewadi, Pune — 411045, Maharashtra. Phone: +91 20 6614 3000. Email: info@skyidevelopers.com. Office hours: Monday–Saturday, 10:00 AM to 7:00 PM.',
  },
];

/* ─── Location Data ─── */
const LOCATIONS = [
  {
    project: 'Skyi Songbirds',
    area: 'Bhugaon, Pune',
    config: '1, 3 & 4 BHK Luxury Flats',
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
    project: 'Skyi Star City',
    area: 'Dhayari, Pune',
    config: '2 & 3 BHK Homes',
    acres: '20',
    status: 'Delivered',
    nearBy: 'DSK Vishwa, Sinhagad Road, Katraj Bypass',
    color: 'var(--accent-gold)',
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
              <span className="gradient-text">Across Pune</span>
            </h2>
            <div className="glow-line" style={{ marginTop: 16, marginBottom: 28 }} />

            <p className="seo-intro">
              Skyi Developers is one of Pune's most trusted and premium residential real estate developers,
              with over <strong>20 years</strong> of experience building thoughtfully designed communities
              across West and South Pune. From luxury 3 &amp; 4 BHK flats near Kothrud at{' '}
              <strong>Skyi Songbirds, Bhugaon</strong>, to the IGBC Platinum-certified lakeside township
              of <strong>SKYi Manas Lake at Bavdhan / Bhukum</strong>, the zero-wastage integrated community
              of <strong>Skyi Star City at Dhayari</strong>, and the upcoming exclusive{' '}
              <strong>SKYi Manas Lake NA Bungalow Plots at Bhukum, Paud Road (near Chandani Chowk)</strong> — every Skyi project is built
              around life, shaped through design.
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
                    <span>{loc.acres} Acres</span>
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
              <span className="gradient-text">About Skyi</span>
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
          <p>Key legal parameters to verify before investing in Non-Agricultural bungalow plots in Bhukum, Bhugaon, Bavdhan, or Paud Road.</p>
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

      {/* ── Keyword-dense hidden-from-layout but visible SEO paragraph ── */}
      <div className="seo-keywords-block">
        <p>
          <strong>Skyi Developers</strong> (also known as <strong>SKYi Developers</strong>) is Pune, Maharashtra's
          leading premium residential real estate builder and developer, offering luxury apartments, flats, townships
          and NA plots across multiple prime locations in Pune. Key projects include:{' '}
          <strong>Skyi Songbirds Bhugaon Pune</strong> (1 BHK, 3 BHK, 4 BHK near Kothrud and NDA Forest),{' '}
          <strong>SKYi Manas Lake Bavdhan Bhukum Paud Road Pune</strong> (2 BHK, 3 BHK, IGBC Platinum Certified),{' '}
          <strong>Skyi Star City Dhayari Pune</strong> (2 BHK, 3 BHK near DSK Vishwa), and{' '}
          <strong>SKYi Manas Lake NA Bungalow Plots Bhukum Paud Road Pune 2025</strong>. All projects are{' '}
          <strong>RERA registered</strong> in Maharashtra and <strong>PMRDA sanctioned</strong>. Contact Skyi Developers at{' '}
          <strong>+91 20 6614 3000</strong> or visit the office at{' '}
          <strong>Skymark One, Balewadi, Pune 411045</strong>. Search terms:{' '}
          NRI real estate investment Pune, buy flat Pune from Dubai UAE, NRI property investment Pune USA UK, NA bungalow plots Pune, NA plots Bhukum, NA plots Bhugaon, NA plots Paud Road, NA plots near Chandani Chowk,
          NA plots near Kothrud, PMRDA approved NA plots Pune, clear title NA plots Pune, 2 BHK Bavdhan, 3 BHK Bhugaon, 4 BHK Kothrud area,
          luxury apartments near NDA Pune, best builder Pune, premium developer Pune, township Pune, gated community Pune, eco-friendly flats Pune,
          sustainable apartments Pune, NA plots Pune 2025, residential plots Bhukum, bungalow plots Bavdhan, plot rates Bhukum Pune,
          Skyi Developers review, Skyi projects price list, Skyi Songbirds review, Manas Lake review, Star City Dhayari review, new property launch Pune 2025.
        </p>
      </div>
    </section>
  );
}
