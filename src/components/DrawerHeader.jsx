import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import React from 'react'

const DrawerHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image source={require('../assets/DrawerTripleLine.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.userProfile}
          onPress={() => navigation.navigate('screen1')}
        >
          <Image source={require('../assets/avatar.png')} />
          <Text style={styles.profileText}>Alex</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Image source={require('../assets/notificationBell.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#263238',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '8%',
    paddingHorizontal: '3%'
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  profileText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    color: '#FFFFFF'
  }
})

export default DrawerHeader
