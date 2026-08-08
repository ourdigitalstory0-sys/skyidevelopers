'use client';

import { useState, useEffect, useRef } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import VideoSection from '../components/VideoSection';
import Portfolio from '../components/Portfolio';
import InteractiveMasterPlan from '../components/InteractiveMasterPlan';
import MortgageCalculator from '../components/MortgageCalculator';
import PlotEstimator from '../components/PlotEstimator';
import VirtualTourGallery from '../components/VirtualTourGallery';
import Connectivity from '../components/Connectivity';
import Testimonials from '../components/Testimonials';
import ProgrammaticSEOSection from '../components/ProgrammaticSEOSection';
import SEOContent from '../components/SEOContent';
import Footer from '../components/Footer';
import SiteVisitModal from '../components/SiteVisitModal';
import FloorPlanModal from '../components/FloorPlanModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import AIMatchmakerModal from '../components/AIMatchmakerModal';
import FloatingActions from '../components/FloatingActions';
import OfflineBanner from '../components/OfflineBanner';

function HomeContent() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  /* Modal States */
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitDefaultProject, setVisitDefaultProject] = useState<string | undefined>();

  const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);
  const [floorProjectTitle, setFloorProjectTitle] = useState<string | undefined>();

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAiMatchmakerOpen, setIsAiMatchmakerOpen] = useState(false);

  const handleOpenVisit = (projectName?: string) => {
    setVisitDefaultProject(projectName);
    setIsVisitModalOpen(true);
  };

  const handleOpenFloorPlan = (projectTitle?: string) => {
    setFloorProjectTitle(projectTitle);
    setIsFloorModalOpen(true);
  };

  useEffect(() => {
    let dotX = 0,  dotY = 0;
    let ringX = 0, ringY = 0;
    let mouseX = -100, mouseY = -100;
    let hasMoved = false;
    let raf: number;

    const setOpacity = (val: string) => {
      if (dotRef.current) dotRef.current.style.opacity = val;
      if (ringRef.current) ringRef.current.style.opacity = val;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        dotX = mouseX;
        dotY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        setOpacity('1');
      }
    };

    const onLeave = () => setOpacity('0');
    const onEnter = () => { if (hasMoved) setOpacity('1'); };

    const tick = () => {
      dotX  += (mouseX - dotX)  * 0.85;
      dotY  += (mouseY - dotY)  * 0.85;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (dotRef.current)  dotRef.current.style.transform  = `translate3d(${dotX}px,${dotY}px,0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(tick);

    // Hover enlargement via event delegation
    const over = (e: Event) => {
      if ((e.target as Element).closest('a, button, input, select, textarea'))
        ringRef.current?.classList.add('cursor-hover');
    };
    const out = (e: Event) => {
      if ((e.target as Element).closest('a, button, input, select, textarea'))
        ringRef.current?.classList.remove('cursor-hover');
    };
    document.addEventListener('mouseover',  over);
    document.addEventListener('mouseout',   out);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover',  over);
      document.removeEventListener('mouseout',   out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Network Offline Resilience Banner */}
      <OfflineBanner />

      {/* Custom cursor */}
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      {/* Navigation */}
      <Navbar onOpenVisitModal={() => handleOpenVisit()} />

      {/* Hero Header */}
      <Hero onOpenSiteVisit={() => handleOpenVisit()} />

      {/* Metrics & Statistics */}
      <Metrics />

      {/* Townships Portfolio & Filter Tabs */}
      <Portfolio
        onOpenSiteVisit={handleOpenVisit}
        onOpenFloorPlan={handleOpenFloorPlan}
      />

      {/* 2D/3D Interactive Master Layout Visualizer */}
      <InteractiveMasterPlan />

      {/* PMRDA NA Plot Villa Construction Cost & FSI Estimator */}
      <PlotEstimator onBookSiteVisit={handleOpenVisit} />

      {/* 360° Virtual Tour & Drone Sightseeing Gallery */}
      <VirtualTourGallery onBookSiteVisit={handleOpenVisit} />

      {/* Home Loan & EMI Calculator */}
      <MortgageCalculator onBookSiteVisit={() => handleOpenVisit()} />

      {/* Connectivity & Proximity Matrix */}
      <Connectivity />

      {/* Video & Virtual Tours */}
      <VideoSection />

      {/* Customer Testimonials & Verified Reviews */}
      <Testimonials />

      {/* Programmatic SEO Search Engine Hub */}
      <ProgrammaticSEOSection onBookVisit={handleOpenVisit} />

      {/* Comprehensive SEO Content & FAQ Accordion */}
      <SEOContent />

      {/* Footer */}
      <Footer onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />

      {/* Interactive Modals */}
      <SiteVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        defaultProject={visitDefaultProject}
      />

      <FloorPlanModal
        isOpen={isFloorModalOpen}
        onClose={() => setIsFloorModalOpen(false)}
        projectTitle={floorProjectTitle}
        onBookVisit={() => handleOpenVisit(floorProjectTitle)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <AIMatchmakerModal
        isOpen={isAiMatchmakerOpen}
        onClose={() => setIsAiMatchmakerOpen(false)}
        onSelectProject={(project) => handleOpenVisit(project)}
      />

      {/* Floating Quick Action Buttons */}
      <FloatingActions onOpenVisitModal={() => handleOpenVisit()} />
    </>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}
