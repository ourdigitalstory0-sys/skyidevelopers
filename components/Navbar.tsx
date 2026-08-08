'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import './Navbar.css';

const SECTIONS = ['home', 'about', 'portfolio', 'calculator', 'connectivity', 'testimonials', 'contact'];

const NAV_LINKS = [
  { name: 'Home',         href: '#home',         id: 'home' },
  { name: 'Portfolio',    href: '#portfolio',    id: 'portfolio' },
  { name: 'Calculator',   href: '#calculator',   id: 'calculator' },
  { name: 'Connectivity', href: '#connectivity', id: 'connectivity' },
  { name: 'Reviews',      href: '#testimonials', id: 'testimonials' },
  { name: 'Contact',      href: '#contact',      id: 'contact' },
];

interface NavbarProps {
  onOpenVisitModal: () => void;
}

export default function Navbar({ onOpenVisitModal }: NavbarProps) {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Scroll + progress */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Line */}
      <div className="nav-progress-track">
        <motion.div
          className="nav-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-container">
          {/* Logo */}
          <a href="#home" className="logo" onClick={() => scrollTo('home')}>
            <img src="/logo-white.svg" alt="Skyi Developers" style={{ height: '30px' }} />
          </a>

          {/* Desktop links */}
          <div className="nav-links">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    className="nav-active-dot"
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            className="btn-enquire"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenVisitModal}
          >
            <Calendar size={15} style={{ marginRight: '6px' }} />
            Book Site Visit
          </motion.button>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={activeSection === link.id ? 'active' : ''}
                onClick={() => scrollTo(link.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.name}
              </motion.a>
            ))}
            <button className="btn-enquire full-width" onClick={() => { setMobileOpen(false); onOpenVisitModal(); }}>
              Book Site Visit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
