import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import {
  disconnectSocket,
  initializeSocket,
  serverURL
} from './src/utils/socket'
import { useEffect, useState } from 'react'
import { getCache } from './src/helper/Storage'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { OrdersProvider } from './src/orderContext/OrderContext'
import DrawerNavigation from './src/navigation/Drawer/DrawerNavigation'
import ErrorBoundary from 'react-native-error-boundary'
import ErrorFallback from './src/components/ErrorFallback/ErrorFallback'
import logErrorToSentry from './src/components/ErrorFallback/LogErrorToSentry'
import useUserData from './src/helper/useUserData'

function App({ }): React.JSX.Element {
  const [socket, setSocket] = useState<any>(null)
  console.log(socket, "<--- socket")
  const { userData } = useUserData()
  console.log(userData, "<--- userData")

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

  // Fetch user data on component mount
  useEffect(() => {
    requestPermissions() // Request permissions on mount
  }, [])

  // Initialize socket only when userData is available
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

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logErrorToSentry}>
      <OrdersProvider>
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </OrdersProvider>
    </ErrorBoundary>
  )
}

export default App
