'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import './Testimonials.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Vikram & Ananya Deshmukh',
    project: 'Skyi Songbirds, Bhugaon (4 BHK Owner)',
    rating: 5,
    quote:
      'Living right next to the NDA forest cover has been a dream come true for our family. The zero-waste IGBC sustainable architecture and morning bird song make every single day feel like a luxury retreat.',
    avatarInitials: 'VD',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Sameer Kulkarni',
    project: 'Skyi Manas Lake, Bavdhan (3 BHK Owner)',
    rating: 5,
    quote:
      'The construction quality and transparency of Skyi Developers surprised us. Their handover was right on schedule, and the lakeside promenade and infinity pool amenities are world class.',
    avatarInitials: 'SK',
    verified: true,
  },
  {
    id: 3,
    name: 'Priya & Rajesh Mehta',
    project: 'Skyi Star City, Dhayari (2 BHK Owner)',
    rating: 5,
    quote:
      'As first-time home buyers in Pune, the Skyi team guided us seamlessly through home loan processing and customization. Fantastic appreciation value and great community culture.',
    avatarInitials: 'PM',
    verified: true,
  },
  {
    id: 4,
    name: 'Lt. Col. Arvind Sharma (Retd.)',
    project: 'Skyi Songbirds, Bhugaon (3 BHK Owner)',
    rating: 5,
    quote:
      'Proximity to Kothrud and Chandani Chowk without any city noise. The 70% open green space ratio is something you simply cannot find elsewhere in Pune.',
    avatarInitials: 'AS',
    verified: true,
  },
];

function TestimonialsComp() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    setCurrentIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  const review = REVIEWS[currentIdx];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">Verified Resident Stories</span>
          <h2>Loved by 7,000+ Happy Families</h2>
          <p>Read what our homeowners say about their life at Skyi eco-townships in West Pune.</p>
        </motion.div>

        <div className="testimonial-card-wrapper">
          <button className="nav-arrow left" onClick={prevReview} aria-label="Previous review">
            <ChevronLeft size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              className="testimonial-card"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="quote-badge">
                <Quote size={32} />
              </div>

              <div className="star-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="testimonial-quote">"{review.quote}"</p>

              <div className="author-info">
                <div className="avatar-circle">{review.avatarInitials}</div>
                <div className="author-details">
                  <h4>{review.name}</h4>
                  <span className="project-owned">{review.project}</span>
                  {review.verified && (
                    <span className="verified-tag">
                      <ShieldCheck size={13} /> Verified Homeowner
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="nav-arrow right" onClick={nextReview} aria-label="Next review">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="testimonial-dots">
          {REVIEWS.map((r, idx) => (
            <button
              key={r.id}
              className={`dot-btn ${currentIdx === idx ? 'active' : ''}`}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialsComp);
