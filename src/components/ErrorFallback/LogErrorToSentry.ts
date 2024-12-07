import * as Sentry from "@sentry/react-native";

// Placeholder for error logging
const logErrorToSentry = (error: any, stackTrace: any) => {
    console.error('Error logged:', error, stackTrace);
    // Integrate Sentry or other error tracking services here
};

Sentry.init({
    dsn: "",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
});

export default logErrorToSentry;