
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';

export async function createNotificationChannel() {
    if (Platform.OS === 'android') {
        try {
            await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH,
                sound: 'default',
                vibration: true,
            });
        } catch (error) {
            console.error('Error creating notification channel:', error);
        }
    }
}

export async function requestNotificationPermission() {
    try {
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                const permission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );
                return permission === 'granted';
            }
            return true;
        } else {
            const authStatus = await messaging().requestPermission();
            return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
}

export async function getFCMToken() {
    try {
        // First ensure the messaging module is initialized
        await messaging().registerDeviceForRemoteMessages();

        // Wait a bit to ensure registration is complete
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Now try to get the token
        const token = await messaging().getToken();
        console.log('FCM Token successfully obtained:', token);
        return token;
    } catch (error) {
        console.error('Error getting FCM token:', error);
        // Add more specific error handling
        if (error === 'messaging/registration-token-not-registered') {
            // Handle this specific error
            console.log('Device not registered, attempting to register...');
            try {
                await messaging().registerDeviceForRemoteMessages();
                const newToken = await messaging().getToken();
                return newToken;
            } catch (retryError) {
                console.error('Retry failed:', retryError);
            }
        }
        return null;
    }
}

export function setupNotificationListeners() {
    const unsubscribes: { (): void; (): void; }[] = [];

    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Background Message:', remoteMessage);
        if (remoteMessage.notification) {
            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                android: {
                    channelId: 'default',
                },
            });
        }
    });

    // Foreground message handler
    const messageUnsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Foreground Message:', remoteMessage);
        if (remoteMessage.notification) {
            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                android: {
                    channelId: 'default',
                },
            });
        }
    });
    unsubscribes.push(messageUnsubscribe);

    // Token refresh handler
    const tokenUnsubscribe = messaging().onTokenRefresh(token => {
        console.log('FCM Token refreshed:', token);
        // Send this new token to your backend
    });
    unsubscribes.push(tokenUnsubscribe);

    return () => {
        unsubscribes.forEach(unsubscribe => unsubscribe());
    };
}