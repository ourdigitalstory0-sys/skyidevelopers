/**
 * Enterprise Google Analytics 4 & Google Ads Conversion Attribution Helper
 */

import { logger } from './logger';

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  logger.log(`[Analytics Event] ${eventName}`, params);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params || {});
  }
}

export function trackSiteVisitBooking(projectName?: string, date?: string, timeSlot?: string): void {
  trackEvent('generate_lead', {
    event_category: 'Site Visit',
    event_label: projectName || 'General',
    visit_date: date,
    visit_time: timeSlot,
    value: 1.0,
  });
}

export function trackPlotCalculatorUsage(plotArea: number, totalInvestment: number): void {
  trackEvent('use_calculator', {
    event_category: 'Plot Estimator',
    plot_area_sqft: plotArea,
    estimated_investment: totalInvestment,
  });
}

export function trackWhatsAppClick(sourceLocation: string): void {
  trackEvent('contact_whatsapp', {
    event_category: 'Floating Action',
    source_location: sourceLocation,
  });
}
