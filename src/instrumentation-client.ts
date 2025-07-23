// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "https://ff1825ae5045120180d513a95885cb17@o4509319180189696.ingest.us.sentry.io/4509319185367040",
  environment: process.env.NODE_ENV,
  
  // Performance monitoring
  tracesSampleRate: 1.0,
  
  // Session replay configuration
  replaysSessionSampleRate: 0.1, // Record 10% of sessions
  replaysOnErrorSampleRate: 1.0, // Record 100% of sessions with errors
  
  debug: process.env.NODE_ENV === 'development',
});

// Export required for Sentry navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;