import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OverlayHeader = ({ title, navigateTo, showBackButton = true }) => {
  const navigation = useNavigation()
  return (
    <View>
      <View style={styles.overlayContainer}>
        <View style={styles.overlay}></View>
        <View style={styles.overlayTextContainer}>
          {showBackButton && (
            <View>
              <TouchableOpacity onPress={navigateTo} style={styles.backArrow}>
                <Image source={require('../assets/backArrowButton.png')} />
              </TouchableOpacity>
            </View>
          )}

          <View style={{ marginLeft: '-15%', zIndex: 10 }}>
            <Text style={styles.overlayText}>{title}</Text>
          </View>
          <View></View>
        </View>
      </View>
      <View style={styles.chairBordLogo}>
        <Image source={require('../assets/chairBordLogoWithoutName.png')} />
      </View>
    </View>
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
    backgroundColor: 'rgba(38, 50, 56, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  overlayText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    color: 'white'
  },
  overlayTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1
  },
  backArrow: {
    marginRight: 20
  },
  chairBordLogo: {
    position: 'absolute',
    left: '33%',
    top: '10%',
    zIndex: 0
  }
})

export default OverlayHeader
