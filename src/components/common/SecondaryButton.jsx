import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const SecondaryButton = ({ onPress, title, disabled = false }) => {
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
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 25,
    height: 75,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  disableAppButtonContainer: {
    marginTop: 120,
    elevation: 8,
    borderRadius: 25,
    height: 75,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden' // Ensure the gradient follows the button's shape
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  appButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    alignSelf: 'center',
    fontFamily: 'inter'
  }
})

export default SecondaryButton
