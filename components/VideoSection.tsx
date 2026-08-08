'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './VideoSection.css';

const STATS = [
  { value: '20+', label: 'Years of Trust' },
  { value: '90',  label: 'Acres at Manas Lake' },
  { value: '45+', label: 'Acres at Songbirds' },
];

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* Parallax transforms */
  const bgScale       = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);
  const textY         = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const overlayOpacity= useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 0.62, 0.62, 0.88]);
  const clipProgress  = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  return (
    <section className="video-section" id="story" ref={sectionRef}>
      {/* ── Cinematic background (Ken Burns on project images) ── */}
      <motion.div
        className="vs-bg"
        style={{ scale: bgScale, clipPath: clipProgress.get() > 0 ? undefined : undefined }}
      >
        <div className="vs-bg-img" />
        <motion.div className="vs-overlay" style={{ opacity: overlayOpacity }} />

        {/* Color grading top / bottom bars */}
        <div className="vs-vignette" />
      </motion.div>

      {/* ── Text content ── */}
      <div className="vs-content">
        <motion.div className="vs-text" style={{ y: textY }}>

          <motion.p
            className="section-subtitle vs-overline"
            initial={{ opacity: 0, letterSpacing: '10px' }}
            whileInView={{ opacity: 1, letterSpacing: '5px' }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Story
          </motion.p>

          <motion.h2
            className="vs-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Where Life<br />
            <span className="vs-title-accent">Begins</span>
          </motion.h2>

          <motion.p
            className="vs-description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.38 }}
          >
            Every Skyi community is designed not just as a residence,
            but as a lifetime of experiences — woven together with
            nature, community, and purpose.
          </motion.p>

          {/* Mini stats */}
          <motion.div
            className="vs-stats"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            {STATS.map(({ value, label }, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {i > 0 && <div className="vs-stat-divider" />}
                <div className="vs-stat">
                  <span className="vs-stat-value">{value}</span>
                  <span className="vs-stat-label">{label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.button
            className="vs-cta btn-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 }}
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>View Our Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative border lines */}
      <div className="vs-border-top" />
      <div className="vs-border-bottom" />
    </section>
  );
}
