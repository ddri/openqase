import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: "https://ff1825ae5045120180d513a95885cb17@o4509319180189696.ingest.us.sentry.io/4509319185367040",
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: "https://ff1825ae5045120180d513a95885cb17@o4509319180189696.ingest.us.sentry.io/4509319185367040",
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
    });
  }
}

// Add the onRequestError hook for Sentry v9.x
export const onRequestError = Sentry.captureRequestError;