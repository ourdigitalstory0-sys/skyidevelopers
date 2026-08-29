'use client';

import { useState, useEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, MapPin, Building2, Home, Star, Calendar, FileText, ShieldCheck } from 'lucide-react';
import { getProjectImage } from '../utils/dynamicImages';
import './Portfolio.css';

interface Project {
  title: string;
  category: 'Apartments' | 'Townships' | 'Plots' | 'Baner & Bavdhan';
  description: string;
  bgImage: string;
  scale: string;
  configuration: string;
  location: string;
  amenities: string[];
  seoContent: string;
  status: 'Ongoing' | 'Delivered' | 'Launching Soon';
  year: string;
  reraNumber: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Skyi Songbirds',
    category: 'Townships',
    description: 'A thoughtfully designed 45+ acre township surrounded by the Sahyadri Hills and the 7,000-acre NDA forest. 1, 3 & 4 BHK homes.',
    bgImage: getProjectImage('skyi-songbirds'),
    scale: '45+ Acres, 2,000+ Families',
    configuration: '1, 3, & 4 BHK Premium Residences',
    location: 'Bhugaon, Paud Road, Pune (10 mins from Kothrud & Chandani Chowk)',
    amenities: ['5-Acre Poona Western Club', 'Sports Academies (Football, Cricket, Tennis)', 'Zero Waste Campus', '20+ On-Campus Convenience Shops'],
    seoContent: 'The Skyi Songbirds project in Bhugaon, Paud Road, Pune, is a luxury residential township surrounded by the Sahyadri Hills and the expansive 7,000-acre NDA forest. Located just 10 minutes from Kothrud and Chandani Chowk near Bavdhan, this project offers 1, 3 & 4 BHK sustainable homes with zero-waste architecture and green vistas.',
    status: 'Ongoing', year: '2018',
    reraNumber: 'MahaRERA: P52100000769 (Ph A) / P52100001117 (Ph B) / P52100019348 (Ph E)',
  },
  {
    title: 'SKYi Manas Lake',
    category: 'Apartments',
    description: 'A benchmark 90-acre eco-township featuring lakeside luxury apartments, CRISIL ratings & IGBC Platinum sustainability certification.',
    bgImage: getProjectImage('skyi-manas-lake-apartment'),
    scale: '90-100 Acres, 2,000+ Families',
    configuration: '2 & 3 BHK Premium Apartments',
    location: 'Paud Road, Bhukum / Bavdhan, Pune (Near Chandani Chowk)',
    amenities: ['Lakeside Promenade & Picnic Lawns', 'CRISIL & IGBC Platinum Certified', 'Zero-Waste Architecture', 'Full-Service Clubhouse & Amphitheatre'],
    seoContent: 'SKYi Manas Lake is an iconic 90+ acre residential township situated on Paud Road at the junction of Bavdhan and Bhukum, Pune, just minutes from Chandani Chowk. Recognized with IGBC Platinum certification, this lakeside community features east-west oriented apartments for maximum natural light and cross ventilation.',
    status: 'Delivered', year: '2015',
    reraNumber: 'MahaRERA: P52100000513 / P52100000514 / P52100026954 / P52100052033',
  },
  {
    title: 'SKYi Manas Lake NA Bungalow Plots',
    category: 'Plots',
    description: 'Exclusive PMRDA sanctioned 100% Clear Title NA Bungalow Plots at the serene Manas Lake campus, Bhukum — minutes from Chandani Chowk & Kothrud.',
    bgImage: getProjectImage('skyi-manas-lake-na-plots'),
    scale: '100% PMRDA Sanctioned, Gated Community',
    configuration: 'NA Villa Plots (2,000 to 6,000+ Sq.Ft.) — Starting ₹95 Lakhs*',
    location: 'Manas Lake Campus, Bhukum, Paud Road (Near Chandani Chowk, Pune)',
    amenities: [
      'PMRDA Sanctioned 100% Clear Title NA Status',
      'Underground Electrical, Water & High-Speed Fiber Lines',
      'Lakeside Promenade & Scenic Green Boulevards',
      '24/7 Gated Security & Access to 90-Acre Township Amenities',
    ],
    seoContent: 'SKYi Manas Lake NA Bungalow Plots in Bhukum, Paud Road, Pune offer a rare opportunity to invest in PMRDA-sanctioned Non-Agricultural (NA) residential plots within a 90+ acre IGBC Platinum-certified lakeside township. Located just minutes from Chandani Chowk, Kothrud, and Bavdhan, these plots come with complete infrastructure — wide internal roads, street lighting, underground utilities, and clear legal titles — allowing you to design and construct your custom luxury villa or lakeside bungalow.',
    status: 'Launching Soon', year: '2025',
    reraNumber: 'PMRDA Sanctioned Collector NA Layout / MahaRERA Compliant',
  },
  {
    title: 'SKYi Star Town NA Villa Plots',
    category: 'Plots',
    description: 'PMRDA Sanctioned Clear Title NA Villa Plots at Bhugaon Foothills overlooking the 7,000-acre NDA forest reserve.',
    bgImage: getProjectImage('skyi-star-town-na-plots'),
    scale: 'PMRDA Sanctioned, Individual PR Card',
    configuration: 'NA Villa Plots (2,000 to 6,000 Sq.Ft.)',
    location: 'Bhugaon Foothills, Paud Road (10 Mins from Kothrud & Chandani Chowk)',
    amenities: [
      'PMRDA 1.4 FSI Approved Layout',
      'Individual Property Card (PR Card) per Plot',
      '40ft Concrete Internal Road & Demarcated Walls',
      'Access to 5-Acre Poona Western Club',
    ],
    seoContent: 'SKYi Star Town NA Villa Plots in Bhugaon, Paud Road, Pune offer luxury clear title residential plotting in West Pune. Overlooking the NDA forest reserve and 10 minutes from Kothrud, these plots are 100% bank-loan approved for immediate villa construction.',
    status: 'Ongoing', year: '2024',
    reraNumber: 'MahaRERA: P52100000769 / PMRDA Sanctioned Collector NA Layout',
  },
  {
    title: 'SKYi Lakeside Meadows NA Plots',
    category: 'Plots',
    description: 'Resort-Style Lakefront NA Bungalow Plots fronting Kasarsai Dam — just 12 mins from Hinjawadi Phase 3 IT Park.',
    bgImage: getProjectImage('skyi-lakeside-meadows-kasarsai'),
    scale: 'Kasarsai Lake Frontage, PMRDA Approved',
    configuration: 'Lakeside NA Villa Plots (2,000 to 6,000 Sq.Ft.)',
    location: 'Kasarsai Dam Lakefront, Hinjewadi Extension, Pune',
    amenities: [
      'Direct Lakefront Panorama',
      'PMRDA Approved Residential R-Zone Layout',
      'Underground Electrical & Water Connections',
      'High Capital Appreciation IT Corridor',
    ],
    seoContent: 'SKYi Lakeside Meadows NA Plots at Kasarsai Dam offer serene lakefront villa plots close to Hinjewadi Phase 3 IT Park. PMRDA approved with 100% clear title 7/12 extracts.',
    status: 'Launching Soon', year: '2025',
    reraNumber: 'PMRDA Approved Collector NA Layout / Clear 7/12 RERA Compliant',
  },
  {
    title: 'SKYi Park & SKYi Iris',
    category: 'Baner & Bavdhan',
    description: 'Premium boutique residential developments located in Baner & Bavdhan near Hinjawadi IT Hub and Pune University.',
    bgImage: getProjectImage('skyi-park-iris-baner'),
    scale: 'Prime Urban Residential',
    configuration: '2 & 3 BHK Luxury Residences',
    location: 'Baner / Bavdhan Corridor, Pune',
    amenities: ['Rooftop Infinity Lounge', 'High-Speed Elevators & EV Charging', 'Zero-Passage Efficient Floor Plans', 'Multi-Tier Security Systems'],
    seoContent: 'SKYi Park and SKYi Iris are landmark boutique residential projects developed in Baner and Bavdhan, Pune. Offering 2 and 3 BHK luxury residences situated close to Aundh, Pashan, Sus, and Hinjewadi IT Park, these homes showcase SKYi\'s signature zero-wastage design and high-end urban lifestyle amenities.',
    status: 'Delivered', year: '2016',
    reraNumber: 'MahaRERA: P52100019348 (SKYi Iris) / P52100000449 (SKYi Park)',
  },
  {
    title: 'SKYi Aura Heights & SKYi Tigers Nest',
    category: 'Townships',
    description: 'Exclusive hillside residences overlooking the Sahyadri valley and NDA forest reserve along Paud Road.',
    bgImage: getProjectImage('skyi-tigers-nest-bhugaon'),
    scale: 'Hillside Sanctuary',
    configuration: '3 & 4 BHK Luxury Hillside Homes',
    location: 'Bhugaon / Bavdhan Hillside, Pune',
    amenities: ['180-Degree Panoramic Hill Views', 'Private Deck Balconies', 'Clubhouse & Heated Pool', 'Private Gated Security Gatehouse'],
    seoContent: 'SKYi Aura Heights and SKYi Tigers Nest in Bhugaon / Bavdhan represent luxury hillside residential living along Paud Road, Pune. Positioned next to the NDA forest with breathtaking mountain and valley views, these 3 and 4 BHK luxury residences provide pristine air quality and rapid connectivity to Kothrud and Chandani Chowk.',
    status: 'Ongoing', year: '2020',
    reraNumber: 'MahaRERA: P52100000769 / P52100001117 (Songbirds Hillside Enclave)',
  },
  {
    title: 'SKYi PWC Towers & Hillside',
    category: 'Townships',
    description: 'Flagship towers integrated with the 5-acre Poona Western Club at Skyi Songbirds campus, Bhugaon.',
    bgImage: getProjectImage('skyi-pwc-towers'),
    scale: 'Integrated Club Residences',
    configuration: '3 & 4 BHK Club-View Apartments',
    location: 'Skyi Songbirds, Bhugaon, Paud Road, Pune',
    amenities: ['Direct Access to Poona Western Club', 'Olympic-Length Swimming Pool', 'Squash & Badminton Courts', 'Fine Dining & Banquet Lawns'],
    seoContent: 'SKYi PWC Towers and PWC Towers Hillside are elite club-integrated residences situated inside the Skyi Songbirds campus at Bhugaon, Paud Road, Pune. Overlooking the 5-acre Poona Western Club sports complex, these residences offer instant access to world-class sports academies, fine dining, and wellness facilities.',
    status: 'Ongoing', year: '2022',
    reraNumber: 'MahaRERA: P52100000643 / P52100000805',
  },
  {
    title: 'Skyi Star City',
    category: 'Townships',
    description: 'A well-planned community spread across 20 acres with self-sufficient infrastructure and 70% open green spaces.',
    bgImage: getProjectImage('skyi-star-city-dhayari'),
    scale: '20 Acres Integrated Township',
    configuration: '2 & 3 BHK Apartments',
    location: 'Dhayari, Pune (Near DSK Vishwa)',
    amenities: ['Zero-Wastage Home Designs', '70% Open & Green Spaces', 'Dedicated Night Garden', 'On-Campus Retail & Convenience Stores'],
    seoContent: 'SKYi Star City is an integrated 20-acre residential township located in Dhayari, Pune. Built on the core philosophy of Zero-Wastage design, these 2 and 3 BHK homes eliminate unnecessary passages to maximize usable living space.',
    status: 'Delivered', year: '2012',
    reraNumber: 'MahaRERA: P52100026727 / P52100029481 / P52100029474 / P52100034274 / P52100050099',
  },
];

interface PortfolioProps {
  onOpenSiteVisit: (projectTitle?: string) => void;
  onOpenFloorPlan: (projectTitle?: string) => void;
}

/* ─── 3D Tilt Card ─── */
function TiltCard({
  project,
  onExplore,
  onOpenVisit,
  onOpenPlan,
}: {
  project: Project;
  onExplore: () => void;
  onOpenVisit: () => void;
  onOpenPlan: () => void;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const [imgError, setImgError] = useState(false);

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x =  ((e.clientX - rect.left) / rect.width  - 0.5) * 16;
    const y = -((e.clientY - rect.top)  / rect.height - 0.5) * 16;
    setTilt({ x, y });
  };

  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      className="portfolio-card glass"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${hovered ? 'scale(1.03)' : 'scale(1)'}`,
        transition: hovered
          ? 'transform 0.12s ease'
          : 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hidden image element to detect network loading errors */}
      <img
        src={project.bgImage}
        alt={project.title}
        onError={() => setImgError(true)}
        style={{ display: 'none' }}
      />

      {/* Image */}
      <div
        className="card-image"
        style={{
          backgroundImage: imgError
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : `url(${project.bgImage})`,
        }}
      >
        <div className="card-image-overlay" />
        <span className={`card-status ${
          project.status === 'Ongoing'       ? 'status-ongoing'   :
          project.status === 'Launching Soon' ? 'status-launching' :
          'status-delivered'
        }`}>
          {project.status}
        </span>
        <span className="card-year">{project.year}</span>
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="card-location">
          <MapPin size={13} />
          <span>{project.location.split('(')[0].trim()}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        
        {/* MahaRERA / PMRDA Compliance Pill */}
        <div className="card-rera-pill">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>{project.reraNumber.split('/')[0].trim()}</span>
        </div>

        <div className="card-config">
          <Home size={13} />
          <span>{project.configuration}</span>
        </div>

        <div className="card-actions-row">
          <button className="card-action-btn secondary" onClick={onOpenPlan}>
            <FileText size={13} /> Floor Plans
          </button>
          <button className="card-action-btn primary" onClick={onOpenVisit}>
            <Calendar size={13} /> Book Visit
          </button>
        </div>

        <button className="explore-btn" onClick={onExplore}>
          Explore Full Details <ArrowRight size={14} className="arrow" />
        </button>
      </div>

      {/* Hover glow */}
      <div className="card-hover-glow" />
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Portfolio({ onOpenSiteVisit, onOpenFloorPlan }: PortfolioProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | 'Apartments' | 'Townships' | 'Plots'>('All');

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section className="portfolio" id="portfolio">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
      >
        <span className="section-subtitle">Portfolio</span>
        <h2 className="section-title">Our Featured Developments</h2>
        <div className="glow-line" style={{ margin: '18px auto 0' }} />

        {/* Filter buttons */}
        <div className="portfolio-filter-tabs">
          {(['All', 'Townships', 'Apartments', 'Plots'] as const).map((cat) => (
            <button
              key={cat}
              className={`port-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div className="portfolio-grid" layout>
        {filteredProjects.map(p => (
          <TiltCard
            key={p.title}
            project={p}
            onExplore={() => setSelected(p)}
            onOpenVisit={() => onOpenSiteVisit(p.title)}
            onOpenPlan={() => onOpenFloorPlan(p.title)}
          />
        ))}
      </motion.div>

      {/* ── Fullscreen Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <div className="modal-backdrop" style={{ backgroundImage: `url(${selected.bgImage})` }} />
            <div className="modal-overlay" />

            <motion.div
              className="modal-sheet glass"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>
                <X size={22} />
              </button>

              <div className="modal-header">
                <p className="modal-location">
                  <MapPin size={14} />
                  {selected.location}
                </p>
                <h2 className="modal-title">{selected.title}</h2>
                <div className="modal-pills">
                  <span className="modal-pill"><Building2 size={13} /> {selected.scale}</span>
                  <span className="modal-pill"><Home size={13} /> {selected.configuration}</span>
                </div>
              </div>

              <div className="modal-body">
                {/* MahaRERA Legal Registration Box */}
                <div className="modal-rera-highlight">
                  <div className="modal-rera-badge">
                    <ShieldCheck size={18} />
                    <strong>MahaRERA &amp; Legal Sanction</strong>
                  </div>
                  <p className="modal-rera-text">{selected.reraNumber}</p>
                  <a
                    href="https://maharera.mahaonline.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-rera-link"
                  >
                    Verify on Official MahaRERA Portal (maharera.mahaonline.gov.in) →
                  </a>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Project Overview</h4>
                  <p className="modal-seo">{selected.seoContent}</p>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Amenities &amp; Sustainability Highlights</h4>
                  <div className="modal-amenities">
                    {selected.amenities.map(a => (
                      <div className="modal-amenity-chip" key={a}>
                        <Star size={13} />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-cta-btn secondary"
                  onClick={() => {
                    const title = selected.title;
                    setSelected(null);
                    onOpenFloorPlan(title);
                  }}
                >
                  <FileText size={16} /> View Floor Plans
                </button>
                <button
                  className="modal-cta-btn primary"
                  onClick={() => {
                    const title = selected.title;
                    setSelected(null);
                    onOpenSiteVisit(title);
                  }}
                >
                  <Calendar size={16} /> Book VIP Site Visit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
