import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { getCache } from '../helper/Storage'
import useUserData from '../helper/useUserData'

const DrawerHeader = () => {
  const userData = useUserData();

  const navigation = useNavigation()
  return (
    <>
      <LinearGradient colors={['#02546D', '#142D40']} style={styles.container}>

        <View>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image source={require('../assets/ham_menu.png')} style={{ width: 25, height: 20, }} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.userProfile}
            onPress={() => navigation.navigate('screen1')}
          >
            <Text style={{ textAlign: "center",marginLeft:15, marginBottom:-10,marginTop:-20 }}>{"17122024"}</Text>
            <Text style={styles.profileText}>{userData?.user?.name || 'User'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('logoutModal')}>
            <Image source={require('../assets/DrawerNavigation/logout.png')} style={{ width: 22, height: 22, }} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  profileText: {
    fontWeight: '600',
    fontSize: 22,
    marginLeft:15,
    lineHeight: 20,
    color: '#FFFFFF'
  }
})

export default DrawerHeader
