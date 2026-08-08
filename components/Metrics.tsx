'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Building2, Home, Users } from 'lucide-react';
import './Metrics.css';

/* ─── Elastic-out easing for counter ─── */
const easeOutElastic = (t: number) => {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

const Counter = ({ target, duration = 2400 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let raf: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const easedProgress = easeOutElastic(progress);
      setCount(Math.round(easedProgress * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

/* ─── Metric data ─── */
const METRICS = [
  { target: 20,    suffix: '+', label: 'Locations',       icon: MapPin,    color: '#ff6b35', delay: 0    },
  { target: 23,    suffix: '+', label: 'Projects Delivered', icon: Building2, color: '#4fc3f7', delay: 0.10 },
  { target: 7000,  suffix: '+', label: 'Homes Delivered', icon: Home,      color: '#ab47bc', delay: 0.20 },
  { target: 30000, suffix: '+', label: 'Happy Residents', icon: Users,     color: '#ffd700', delay: 0.30 },
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section className="metrics" id="about" ref={sectionRef}>
      {/* Scanner sweep */}
      {isInView && <div className="metrics-scanner" />}

      {/* Section header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-subtitle">By the Numbers</span>
        <h2 className="section-title">Two Decades of Excellence</h2>
        <div className="glow-line" style={{ margin: '18px auto 0' }} />
      </motion.div>

      {/* Cards grid */}
      <div className="metrics-grid">
        {METRICS.map(({ target, suffix, label, icon: Icon, color, delay }) => (
          <motion.div
            key={label}
            className="metric-card glass"
            style={{ '--card-color': color } as React.CSSProperties}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.04, transition: { duration: 0.3 } }}
          >
            {/* Icon */}
            <div className="metric-icon">
              <Icon size={26} />
            </div>

            {/* Number */}
            <div className="metric-number">
              <Counter target={target} />
              <span className="metric-suffix">{suffix}</span>
            </div>

            {/* Label */}
            <p className="metric-label">{label}</p>

            {/* Glow overlay */}
            <div className="metric-glow" />
            {/* Border accent line */}
            <div className="metric-accent-line" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
