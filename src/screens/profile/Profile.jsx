import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import InputText from '../../components/common/InputText'

const Profile = () => {
  const [active, setActive] = useState('password')
  return (
    <View style={{ flex: 1, padding: '5%' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabSection,
              active === 'password' && styles.activeState
            ]}
            onPress={() => setActive('password')}
          >
            <Text
              style={[
                styles.tabContent,
                active === 'password' && styles.activeContent
              ]}
            >
              Step 1
            </Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity
            onPress={() => setActive('otp')}
            style={[styles.tabSection, active === 'otp' && styles.activeState]}
          >
            <Text
              style={[
                styles.tabContent,
                active === 'otp' && styles.activeContent
              ]}
            >
              Step 2
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>Personal Information</Text>

      <InputText placeholder="First Name" value="" onChangeText={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '90 %',
    marginTop: 20
  },
  tabSection: {
    width: '50%'
  },
  activeState: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2
  },
  activeContent: {
    color: '#000000'
  },
  verticalDivider: {
    height: '100%',
    width: 2,
    backgroundColor: '#CCCCCC'
  },
  text: {
    color: '#263238',
    margin: '5%',
    textAlign: 'center'
  },
  tabContent: {
    alignSelf: 'center',
    color: '#807C7C'
  }
})

export default Profile
