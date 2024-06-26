import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const PrimaryBtn = ({ onPress, title, disabled }) => {
  const buttonContainerStyle = disabled
    ? styles.disableAppButtonContainer
    : styles.appButtonContainer

  const gradientColors = disabled
    ? ['#AFACAC', '#AFACAC']
    : ['#02546D', '#142D40']

  return (
    <TouchableOpacity onPress={onPress} style={buttonContainerStyle}>
      <LinearGradient colors={gradientColors} style={styles.linearGradient}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={styles.appButtonText}>{title}</Text>
          <Image source={require('../../assets/rightArrow.png')} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 120,
    elevation: 8,
    borderRadius: 25,
    height: 75,
    width: 310,
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  disableAppButtonContainer: {
    marginTop: 120,
    elevation: 8,
    borderRadius: 25,
    height: 75,
    width: 310,
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  appButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'inter'
  }
})

export default PrimaryBtn
