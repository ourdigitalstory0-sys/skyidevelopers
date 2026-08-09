'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import './Hero.css';

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TYPEWRITER_STRINGS = [
  'Shaped through design.',
  'Built for generations.',
  'Crafted with purpose.',
  'Rooted in community.',
];

interface HeroProps {
  onOpenSiteVisit: () => void;
}

export default function Hero({ onOpenSiteVisit }: HeroProps) {
  const heroRef   = useRef<HTMLElement>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  /* Typewriter state */
  const [twIndex,   setTwIndex]   = useState(0);
  const [twText,    setTwText]    = useState('');
  const [twCharIdx, setTwCharIdx] = useState(0);
  const [twDel,     setTwDel]     = useState(false);

  /* Scroll parallax */
  const { scrollY } = useScroll();
  const bgY      = useTransform(scrollY, [0, 700], [0, 220]);
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const fade     = useTransform(scrollY, [0, 520], [1, 0]);

  /* Mouse parallax */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    let raf: number;
    const tick = () => {
      setParallax(prev => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.045,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.045,
      }));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  /* Typewriter */
  useEffect(() => {
    const str = TYPEWRITER_STRINGS[twIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!twDel) {
      if (twCharIdx < str.length) {
        t = setTimeout(() => setTwCharIdx(c => c + 1), 62);
      } else {
        t = setTimeout(() => setTwDel(true), 2600);
      }
    } else {
      if (twCharIdx > 0) {
        t = setTimeout(() => setTwCharIdx(c => c - 1), 34);
      } else {
        setTwDel(false);
        setTwIndex(i => (i + 1) % TYPEWRITER_STRINGS.length);
      }
    }
    setTwText(str.substring(0, twCharIdx));
    return () => clearTimeout(t);
  }, [twCharIdx, twDel, twIndex]);

  /* Framer variants */
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 55, filter: 'blur(18px)' },
    show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
              transition: { duration: 1.1, ease: EASE_OUT } },
  };

  const scrollToPortfolio = useCallback(() =>
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), []);

  return (
    <header className="hero" id="home" ref={heroRef}>

      {/* ── Animated background ── */}
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <motion.div className="gradient-sphere g1"
          style={{ x: parallax.x * -32, y: parallax.y * -22 }} />
        <motion.div className="gradient-sphere g2"
          style={{ x: parallax.x * 26, y: parallax.y * 18 }} />
        <motion.div className="gradient-sphere g3"
          style={{ x: parallax.x * -14, y: parallax.y * 28 }} />

        {[...Array(22)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${5 + (i * 4.4) % 90}%`,
            top:  `${8 + (i * 7.1) % 82}%`,
            animationDelay:    `${(i * 0.38) % 7}s`,
            animationDuration: `${7 + (i * 1.05) % 9}s`,
          } as React.CSSProperties} />
        ))}

        <div className="grid-overlay" />
        <div className="corner-glow corner-glow--tl" />
        <div className="corner-glow corner-glow--br" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: fade }}
      >
        {/* Strategic Launch Link Banner */}
        <motion.div className="hero-badge" variants={item}>
          <a href="/na-plots-bhukum" className="hero-link-badge">
            <span className="badge-dot" />
            <span>🔥 Launching 2025: SKYi Manas Lake NA Bungalow Plots Bhukum, Paud Road — PMRDA Approved • 2,000 SQFT Onwards • Starting ₹95 Lakhs*</span>
          </a>
        </motion.div>

        {/* Title */}
        <motion.h1 className="hero-title" variants={item}>
          Built around<br />
          <span className="hero-title-accent">life.</span>{' '}
          <span className="hero-title-sub">Shaped</span><br />
          <span className="hero-typewriter">
            {twText}
            <span className="tw-cursor">|</span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p className="hero-description" variants={item}>
          For over two decades, Skyi has been crafting Pune's most thoughtfully designed
          communities — where every home is a statement of purpose.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-actions" variants={item}>
          <button className="btn-primary" onClick={scrollToPortfolio}>
            <span>Explore Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn-secondary" onClick={onOpenSiteVisit}>
            Book VIP Site Visit
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div className="hero-stats" variants={item}>
          {[
            { num: '20+', label: 'Years' },
            { num: '7000+', label: 'Families' },
            { num: '150+', label: 'Awards' },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {i > 0 && <div className="stat-divider" />}
              <div className="hero-stat">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </header>
  );
}
