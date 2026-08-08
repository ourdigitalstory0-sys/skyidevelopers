/**
 * Security & Data Sanitization Utilities
 * Level-3 Defensive Engineering Helpers
 */

/**
 * Sanitizes user text input by stripping HTML tags, script tags, javascript: URIs,
 * and escaping dangerous control characters to prevent Cross-Site Scripting (XSS).
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script> tags
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove <style> tags
    .replace(/<[^>]+>/g, '') // Remove generic HTML tags
    .replace(/javascript:/gi, '') // Remove inline JS protocol
    .replace(/data:/gi, '') // Remove inline data protocol
    .replace(/on\w+\s*=/gi, '') // Remove inline event attributes like onload=, onclick=
    .trim();
}

/**
 * Safe wrapper for localStorage that gracefully handles blocked storage in
 * restricted browser environments (e.g. Incognito mode, Safari ITP, embedded webviews).
 */
export const safeLocalStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Safe wrapper for sessionStorage with defensive try-catch guards.
 */
export const safeSessionStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};
