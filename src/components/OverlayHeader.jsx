import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const OverlayHeader = ({ title, navigateTo }) => {
  return (
    <>
      <View style={styles.overlayContainer}>
        <View style={styles.overlay}></View>
        <View style={styles.overlayTextContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
              <Image source={require('../assets/backArrowButton.png')} />
            </TouchableOpacity>
            <Text style={styles.overlayText}>{title}</Text>
            <View></View>
          </View>
        </View>
      </View>
      <View style={styles.chairBordLogo}>
        <Image source={require('../assets/chairBordLogoWithoutName.png')} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'relative',
    height: 172
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(38, 50, 56, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  overlayText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    zIndex: 1,
    color: 'white',
    left: '109%',
    bottom: '50%',
  },
  overlayTextContainer: {
    position: 'absolute',
    zIndex: 2,
    top: '40%',
    paddingHorizontal: 10
  },
  chairBordLogo: {
    position: 'absolute',
    left: '33%',
    top: '10%'
  }
})

export default OverlayHeader
