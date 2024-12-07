/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import * as Sentry from "@sentry/react-native";

Sentry.init({
    dsn: "",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
});

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
