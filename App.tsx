import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import {
  disconnectSocket,
  initializeSocket,
  serverURL
} from './src/utils/socket'
import { useEffect, useState } from 'react'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { OrdersProvider } from './src/orderContext/OrderContext'
import DrawerNavigation from './src/navigation/Drawer/DrawerNavigation'
import ErrorBoundary from 'react-native-error-boundary'
import ErrorFallback from './src/components/ErrorFallback/ErrorFallback'
import logErrorToSentry from './src/components/ErrorFallback/LogErrorToSentry'
import useUserData from './src/helper/useUserData'
import { checkForUpdate } from './src/utils/updateUtils'
import messaging from '@react-native-firebase/messaging';

import {
  createNotificationChannel,
  requestNotificationPermission,
  getFCMToken,
  setupNotificationListeners,
} from './src/utils/notificationhelper';
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { useAppSelector } from './src/store/hooks'

function App({ }): React.JSX.Element {
  const [socket, setSocket] = useState<any>(null)
  const { userData } = useUserData()

  // Request multiple permissions
  const requestPermissions = async () => {
    const permissions = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_CONTACTS
    ]

    for (const permission of permissions) {
      const result = await check(permission)
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission)
        if (requestResult === RESULTS.GRANTED) {
          console.log(`${permission} granted`)
        } else {
          console.log(`${permission} denied`)
        }
      }
    }
  }

  useEffect(() => {
    requestPermissions() // Request permissions on mount
  }, [])

  useEffect(() => {
    const initNotifications = async () => {
      try {
        // First create the notification channel
        await createNotificationChannel();

        // Then request permissions
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) {
          console.log('Notification permissions not granted');
          return;
        }

        // Get the token with a slight delay to ensure everything is initialized
        setTimeout(async () => {
          const token = await getFCMToken();
          if (token) {
            console.log('FCM Token:', token);
            // Send token to your backend here
          }
        }, 2000);
      } catch (error) {
        console.error('Notification initialization failed:', error);
      }
    };

    initNotifications();
    const unsubscribe = setupNotificationListeners();

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    if (userData?.user?.id) {
      const socket: any = initializeSocket(serverURL, userData.user.id)
      setSocket(socket)

      socket.on('connect', () => {
        console.log('Connected to the server!')
      })

      // Clean up and disconnect socket on unmount
      return () => {
        disconnectSocket()
      }
    }
  }, [userData])

  useEffect(() => {
    checkForUpdate()
  }, [])

  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logErrorToSentry}>
        <OrdersProvider>
          <NavigationContainer>
            <DrawerNavigation />
          </NavigationContainer>
        </OrdersProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
