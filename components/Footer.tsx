'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Share2, Globe, Play, Send, AlertCircle, Loader2, ShieldCheck, ExternalLink } from 'lucide-react';
import { sanitizeInput } from '../utils/security';
import './Footer.css';

const CONTACT_INFO = [
  { Icon: Phone,  label: 'Call Us',   value: '+91 20 6614 3000',                   href: 'tel:+912066143000' },
  { Icon: Mail,   label: 'Email',     value: 'info@skyidevelopers.com',             href: 'mailto:info@skyidevelopers.com' },
  { Icon: MapPin, label: 'Office',    value: 'Skymark One, Balewadi, Pune — 411045', href: '#' },
];

const SOCIAL = [
  { Icon: Share2, href: 'https://instagram.com/skyi_developers', label: 'Instagram' },
  { Icon: Globe,  href: 'https://facebook.com/skyidevelopers',   label: 'Facebook' },
  { Icon: Play,   href: 'https://youtube.com/@skyidevelopers',   label: 'YouTube' },
];

const PROJECTS_LIST = [
  { value: 'songbirds',  label: 'Skyi Songbirds' },
  { value: 'manaslake',  label: 'Manas Lake' },
  { value: 'starcity',   label: 'Skyi Star City' },
  { value: 'other',      label: 'Other / General Enquiry' },
];

const MAHARERA_DISCLOSURES = [
  {
    name: 'Skyi Songbirds (Bhugaon)',
    rera: 'P52100000769 (Ph A) | P52100001117 (Ph B) | P52100019348 (Ph E) | P52100047992 | P52100000764 | P52100000643 | P52100000805',
    type: 'Township / Residential Apartments',
  },
  {
    name: 'SKYi Manas Lake (Bhukum / Bavdhan)',
    rera: 'P52100000513 (Ph II) | P52100000514 (Ph III) | P52100026954 (Ph VI) | P52100052033 (Ph VIII) | P52100079680',
    type: 'Lakefront Township & NA Plots',
  },
  {
    name: 'SKYi Star City (Dhayari / Kirkatwadi)',
    rera: 'P52100026727 (Ph I) | P52100029481 (Ph II) | P52100029474 (Ph III) | P52100034274 (Ph IV) | P52100050099 (Ph V)',
    type: 'Integrated Residential Township',
  },
  {
    name: 'SKYi Iris & SKYi Park (Baner / Bavdhan)',
    rera: 'P52100019348 (SKYi Iris) | P52100000449 (SKYi Park)',
    type: 'Urban Luxury Residences',
  },
  {
    name: 'SKYi Tigers Nest & PWC Towers (Bhugaon)',
    rera: 'P52100000769 | P52100000643 | P52100000805 (Club Residences)',
    type: 'Luxury Hillside & Club Residences',
  },
  {
    name: 'SKYi PMRDA NA Bungalow Plots (Bhukum / Pirangut / Kasarsai / Sus)',
    rera: 'PMRDA Sanctioned Collector NA Layouts / 100% Clear Title 7/12 RERA Compliant',
    type: 'PMRDA Sanctioned Villa Plots',
  },
];

type Fields = { name: string; email: string; phone: string; project: string; message: string };

interface FooterProps {
  onOpenPrivacyModal?: () => void;
}

export default function Footer({ onOpenPrivacyModal }: FooterProps) {
  const [form,      setForm]      = useState<Fields>({ name: '', email: '', phone: '', project: '', message: '' });
  const [focused,   setFocused]   = useState<string | null>(null);
  const [errorMsg,  setErrorMsg]  = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double-submit

    setErrorMsg(null);
    const cleanName = sanitizeInput(form.name);
    const cleanEmail = sanitizeInput(form.email);
    let cleanPhone = sanitizeInput(form.phone).replace(/[\s\-()+]/g, '');
    if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
      cleanPhone = cleanPhone.slice(1);
    }

    if (cleanName.length < 2) {
      setErrorMsg('Please enter a valid name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (cleanPhone) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    setLoading(true);

    try {
      // 1. Dispatch via Next.js backend API (FormSubmit + SMTP)
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || 'Not Provided',
          project: form.project || 'General Inquiry',
          message: form.message,
          utmSource: 'Website Footer Contact Form',
        }),
      });
      setSubmitted(true);
    } catch {
      // 2. Direct client-side FormSubmit fail-safe
      try {
        await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `🔥 FOOTER ENQUIRY [${cleanName}] — ${form.project || 'General Inquiry'}`,
            _template: 'table',
            _captcha: 'false',
            'Customer Name': cleanName,
            'Email Address': cleanEmail,
            'Phone Number': cleanPhone ? `+91 ${cleanPhone}` : 'Not Provided',
            'Interested Project': form.project || 'General Inquiry',
            'Message': form.message || 'None',
          }),
        });
      } catch (err) {
        console.error('Footer FormSubmit fail-safe error', err);
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (name: string) => !!form[name as keyof Fields] || focused === name;

  return (
    <footer id="contact">
      {/* ══ Contact Section ══ */}
      <section className="contact-section">
        {/* Background */}
        <div className="contact-bg">
          <div className="c-orb c-orb-1" />
          <div className="c-orb c-orb-2" />
          <div className="grid-overlay" />
        </div>

        <div className="contact-container">
          {/* ── Left info column ── */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-subtitle">Contact Us</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Let's Find Your<br />
              <span className="gradient-text">Dream Home</span>
            </h2>
            <div className="glow-line" style={{ marginTop: 18, marginBottom: 24 }} />

            <p className="contact-tagline">
              Our team of experts is ready to guide you through every step
              of your home-buying journey. Reach out and let's connect.
            </p>

            {/* Contact info list */}
            <div className="contact-info-list">
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="contact-info-item"
                  whileHover={{ x: 7 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                >
                  <div className="ci-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="ci-label">{label}</p>
                    <p className="ci-value">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Strategic Links Cluster */}
            <div className="strategic-links-wrap" style={{ marginTop: '30px' }}>
              <p className="social-title" style={{ marginBottom: '12px', color: 'var(--accent-gold)' }}>Strategic Links — SKYi Manas Lake &amp; NA Plots Bhukum</p>
              <div className="strategic-links-grid">
                <a href="/na-plots-bhukum" className="strategic-link-item">SKYi Manas Lake NA Bungalow Plots Bhukum</a>
                <a href="/projects" className="strategic-link-item">SKYi Manas Lake Lakeside Apartments Paud Road</a>
                <a href="/songbirds" className="strategic-link-item">Skyi Songbirds Township Bhugaon Pune</a>
                <a href="/projects" className="strategic-link-item">SKYi Tigers Nest &amp; PWC Towers Bhugaon</a>
                <a href="/plot-estimator" className="strategic-link-item">PMRDA NA Plot Valuation &amp; FSI Estimator</a>
                <a href="/virtual-tour" className="strategic-link-item">360° Drone Virtual Sightseeing Gallery</a>
              </div>
            </div>
            <div className="social-row">
              <p className="social-title">Follow Us</p>
              <div className="social-icons">
                {SOCIAL.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={label}
                    whileHover={{ scale: 1.18, y: -5 }}
                    whileTap={{ scale: 0.88 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right form column ── */}
          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="form-card glass">
              {!submitted ? (
                <>
                  <h3 className="form-title">Send an Enquiry</h3>

                  {errorMsg && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#fca5a5',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }} role="alert">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-form" noValidate>

                    {/* Name */}
                    <div className={`form-field ${isActive('name') ? 'is-active' : ''}`}>
                      <input id="f-name" name="name" type="text" autoComplete="name"
                        value={form.name} onChange={handleChange}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} required disabled={loading} />
                      <label htmlFor="f-name">Your Name</label>
                      <div className="field-line" />
                    </div>

                    {/* Email */}
                    <div className={`form-field ${isActive('email') ? 'is-active' : ''}`}>
                      <input id="f-email" name="email" type="email" autoComplete="email"
                        value={form.email} onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required disabled={loading} />
                      <label htmlFor="f-email">Email Address</label>
                      <div className="field-line" />
                    </div>

                    {/* Phone */}
                    <div className={`form-field ${isActive('phone') ? 'is-active' : ''}`}>
                      <input id="f-phone" name="phone" type="tel" autoComplete="tel"
                        value={form.phone} onChange={handleChange}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} disabled={loading} />
                      <label htmlFor="f-phone">Phone Number (Optional)</label>
                      <div className="field-line" />
                    </div>

                    {/* Project */}
                    <div className={`form-field is-select ${isActive('project') ? 'is-active' : ''}`}>
                      <select id="f-project" name="project"
                        value={form.project} onChange={handleChange}
                        onFocus={() => setFocused('project')} onBlur={() => setFocused(null)} disabled={loading}>
                        <option value="" disabled hidden />
                        {PROJECTS_LIST.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                      <label htmlFor="f-project">Interested Project</label>
                      <div className="field-line" />
                    </div>

                    {/* Message */}
                    <div className={`form-field is-textarea ${isActive('message') ? 'is-active' : ''}`}>
                      <textarea id="f-message" name="message" rows={3}
                        value={form.message} onChange={handleChange}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} disabled={loading} />
                      <label htmlFor="f-message">Your Message (Optional)</label>
                      <div className="field-line" />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      className={`form-submit-btn ${loading ? 'is-loading' : ''}`}
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                    >
                      {loading ? (
                        <span><Loader2 size={16} className="spinner" /> Sending...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="form-success-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <h3>Thank You!</h3>
                  <p>Your enquiry has been received. Our team will get back to you shortly.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="footer-maharera-container">
        <div className="footer-maharera-inner">
          <div className="footer-maharera-header">
            <div className="footer-maharera-title-wrap">
              <ShieldCheck size={22} className="text-emerald-400" />
              <div>
                <h4>MahaRERA Regulatory Compliance &amp; Official Registrations</h4>
                <p>
                  All projects by Skyi Developers are registered under the Maharashtra Real Estate Regulatory Authority (MahaRERA). Details and sanctions available at{' '}
                  <a
                    href="https://maharera.maharashtra.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maharera-official-link"
                  >
                    maharera.maharashtra.gov.in <ExternalLink size={12} />
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="footer-maharera-grid">
            {MAHARERA_DISCLOSURES.map((item) => (
              <div key={item.name} className="maharera-card">
                <div className="maharera-card-name">{item.name}</div>
                <div className="maharera-card-type">{item.type}</div>
                <div className="maharera-card-reg">
                  <span className="maharera-tag">MahaRERA:</span>
                  <code>{item.rera}</code>
                </div>
              </div>
            ))}
          </div>

          <p className="maharera-disclaimer-note">
            * Disclaimer: The artistic impressions, specifications, floor plans, and amenities shown on this website are indicative and subject to change as per competent authority approvals and MahaRERA guidelines. Clear title documentation and PMRDA sanction orders are available for verification at our site offices.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="fb-container">
          <div className="fb-left">
            <img src="/logo-white.svg" alt="Skyi Developers" style={{ height: '24px' }} />
            <p className="fb-copy">
              © {new Date().getFullYear()} Skyi Developers. Built around life. All Rights Reserved.
            </p>
          </div>
          <div className="fb-right">
            {onOpenPrivacyModal && (
              <button
                type="button"
                className="fb-privacy-btn"
                onClick={onOpenPrivacyModal}
              >
                Privacy &amp; MahaRERA Disclosures
              </button>
            )}
            <a href="#home">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
