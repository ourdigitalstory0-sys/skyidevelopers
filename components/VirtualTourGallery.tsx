'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, X, MapPin, Calendar } from 'lucide-react';
import './VirtualTourGallery.css';

interface VirtualTourProps {
  onOpenSiteVisit: (projectName?: string) => void;
}

interface TourMedia {
  id: string;
  title: string;
  category: 'Aerial Drone' | 'NA Plots' | 'Clubhouse' | 'Townships';
  location: string;
  bgImage: string;
  badge: string;
  duration: string;
  description: string;
}

const TOUR_ITEMS: TourMedia[] = [
  {
    id: '1',
    title: 'SKYi Manas Lake 360° Drone Aerial View',
    category: 'Aerial Drone',
    location: 'Bhukum / Bavdhan, Paud Road',
    bgImage: '/songbirds-2.webp',
    badge: '360° Aerial Tour',
    duration: '4:15 Min',
    description: 'Experience the 90+ acre IGBC Platinum certified lakeside township from above. View Manas Lake, Paud Road 6-lane access, and Sahyadri mountain vistas.',
  },
  {
    id: '2',
    title: 'SKYi Manas Lake NA Bungalow Plots Campus',
    category: 'NA Plots',
    location: 'Manas Lake Campus, Bhukum',
    bgImage: '/bungalow-plots.jpg',
    badge: 'Vector Blueprint & Plot Tour',
    duration: '3:30 Min',
    description: 'Explore the PMRDA-sanctioned clear title NA plot layouts ranging from 1,500 to 5,000+ sq.ft. featuring underground utilities and wide concrete roads.',
  },
  {
    id: '3',
    title: 'Poona Western Club & Sports Academies',
    category: 'Clubhouse',
    location: 'Skyi Songbirds, Bhugaon',
    bgImage: '/songbirds-1.webp',
    badge: 'Clubhouse & Amenities',
    duration: '5:00 Min',
    description: 'Walk through the 5-acre sports club featuring Olympic-length pool, football academy, tennis courts, and fine dining banquets.',
  },
  {
    id: '4',
    title: 'SKYi Tigers Nest & PWC Towers Hillside',
    category: 'Townships',
    location: 'Bhugaon Hillside Sanctuary',
    bgImage: '/songbirds-3.webp',
    badge: 'Hillside Sanctuary',
    duration: '3:45 Min',
    description: 'Virtual walkthrough of luxury 3 & 4 BHK hillside residences overlooking the 7,000-acre NDA forest reserve.',
  },
];

export default function VirtualTourGallery({ onBookSiteVisit }: VirtualTourProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedMedia, setSelectedMedia] = useState<TourMedia | null>(null);

  const categories = ['All', 'Aerial Drone', 'NA Plots', 'Clubhouse', 'Townships'];

  const filteredMedia = activeCategory === 'All'
    ? TOUR_ITEMS
    : TOUR_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="virtual-tour-section" id="virtual-tour">
      <div className="virtual-tour-inner">
        <div className="section-header">
          <span className="section-subtitle">Virtual Tour &amp; Sightseeing</span>
          <h2 className="section-title">
            Explore SKYi Projects in<br />
            <span className="gradient-text">360° Drone &amp; 3D Media</span>
          </h2>
          <div className="glow-line" style={{ margin: '18px auto 0 auto' }} />
          <p className="vt-intro">
            Take a virtual walkthrough of SKYi's 90-acre townships, PMRDA NA Bungalow Plot layouts in Bhukum, and hillside sanctuaries in Bhugaon before visiting in person.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="vt-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`vt-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="vt-media-grid">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              className="vt-media-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="vt-img-wrap" style={{ backgroundImage: `url('${item.bgImage}')` }}>
                <div className="vt-overlay" />
                <span className="vt-badge">{item.badge}</span>
                <span className="vt-duration">{item.duration}</span>

                <button
                  type="button"
                  className="vt-play-btn"
                  onClick={() => setSelectedMedia(item)}
                  aria-label={`Play virtual tour for ${item.title}`}
                >
                  <Play size={24} fill="#ffffff" />
                </button>
              </div>

              <div className="vt-card-body">
                <div className="vt-loc">
                  <MapPin size={12} /> {item.location}
                </div>
                <h3 className="vt-title">{item.title}</h3>
                <p className="vt-desc">{item.description}</p>

                <div className="vt-card-footer">
                  <button
                    type="button"
                    className="vt-action-btn"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <Eye size={14} /> Preview Tour
                  </button>

                  <button
                    type="button"
                    className="vt-site-btn"
                    onClick={() => onBookSiteVisit(item.title)}
                  >
                    <Calendar size={14} /> VIP Site Visit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Modal Preview */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="vt-modal-backdrop" onClick={() => setSelectedMedia(null)}>
            <motion.div
              className="vt-modal-content glass"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="vt-close-btn"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="vt-modal-header">
                <span className="vt-badge">{selectedMedia.badge}</span>
                <h2>{selectedMedia.title}</h2>
                <p><MapPin size={14} /> {selectedMedia.location}</p>
              </div>

              <div className="vt-video-placeholder">
                <div className="vt-simulated-player">
                  <Play size={48} fill="var(--accent-1)" color="var(--accent-1)" />
                  <p>Interactive 360° Drone Stream Active</p>
                  <span>High Definition Stream — SKYi Media Engine</span>
                </div>
              </div>

              <div className="vt-modal-body">
                <p>{selectedMedia.description}</p>
                <div className="vt-modal-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      const title = selectedMedia.title;
                      setSelectedMedia(null);
                      onBookSiteVisit(title);
                    }}
                  >
                    <Calendar size={18} /> Schedule In-Person VIP Site Visit
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
