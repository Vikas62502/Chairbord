import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SecondaryButton = ({ onPress, title, showArrow, disable }) => {
  const buttonContainerStyle = disable
    ? styles.disabledButtonContainer
    : styles.appButtonContainer

  showArrow = false
  return (
    <TouchableOpacity onPress={onPress} style={buttonContainerStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text style={styles.appButtonText}>{title}</Text>
        {showArrow && <Image source={require('../../assets/rightArrow.png')} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#263238',
    borderRadius: 25,
    height: 68,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  disabledButtonContainer: {
    elevation: 8,
    backgroundColor: '#AFACAC',
    borderRadius: 25,
    height: 68,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  appButtonText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff',
    fontWeight: '700',
    alignSelf: 'center',
    fontFamily: 'inter',
    textAlign: 'center',
    width: '100%'
  }
})

export default SecondaryButton
