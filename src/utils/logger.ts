/**
 * Level-4 Production Logger Guard Utility
 * Ensures debug logs are stripped in production environments while keeping
 * errors and warnings tracked safely.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log(...args: unknown[]): void {
    if (isDev) {
      console.log('[Skyi Dev]', ...args);
    }
  },

  info(...args: unknown[]): void {
    if (isDev) {
      console.info('[Skyi Info]', ...args);
    }
  },

  warn(...args: unknown[]): void {
    if (isDev) {
      console.warn('[Skyi Warn]', ...args);
    }
  },

  error(...args: unknown[]): void {
    // Errors are always tracked across all environments
    console.error('[Skyi Error]', ...args);
  },
};
