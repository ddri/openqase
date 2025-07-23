// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "https://ff1825ae5045120180d513a95885cb17@o4509319180189696.ingest.us.sentry.io/4509319185367040",
  environment: process.env.NODE_ENV,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Profiling (helps identify slow functions)
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Error filtering
  beforeSend(event) {
    // Filter out non-actionable errors
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.type === 'ChunkLoadError' || error?.type === 'ResizeObserver loop limit exceeded') {
        return null;
      }
    }
    return event;
  },
  
  // Performance monitoring configuration
  beforeSendTransaction(event) {
    // Filter out very fast transactions to reduce noise
    if (event.start_timestamp && event.timestamp) {
      const duration = event.timestamp - event.start_timestamp;
      if (duration < 0.05) return null; // Less than 50ms
    }
    return event;
  },
  
  debug: process.env.NODE_ENV === 'development',
  
  // Integrations
  integrations: [
    Sentry.prismaIntegration(),
    Sentry.httpIntegration(),
  ],
});
