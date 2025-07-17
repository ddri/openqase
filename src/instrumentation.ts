import * as Sentry from "@sentry/nextjs";
Sentry.init({
  dsn: "https://ff1825ae5045120180d513a95885cb17@o4509319180189696.ingest.us.sentry.io/4509319185367040",
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;