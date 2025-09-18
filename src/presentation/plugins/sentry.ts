import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: "https://98cd375793025d29eb85a919348ce4d3@o4510031758950400.ingest.us.sentry.io/4510031772188672",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
});