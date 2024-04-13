import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {
  const navigation = useNavigation()
  return (
    <Text
      style={{ flex: 1, color: 'red' }}
      onPress={() => navigation.openDrawer()}
    >
      Dashboard
    </Text>
  )
}

export default Dashboard
