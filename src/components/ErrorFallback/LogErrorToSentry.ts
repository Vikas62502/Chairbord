// // Placeholder for error logging
const logErrorToSentry = (error: any, stackTrace: any) => {
    console.error('Error logged:', error, stackTrace);
    // Integrate Sentry or other error tracking services here
};

export default logErrorToSentry;