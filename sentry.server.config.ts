// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "https://ff1825ae5045120180d513a95885cb17@o4509319180189696.ingest.us.sentry.io/4509319185367040",
  environment: process.env.NODE_ENV,
  
  // Performance monitoring
  tracesSampleRate: 1.0,
  
  debug: process.env.NODE_ENV === 'development',
});
