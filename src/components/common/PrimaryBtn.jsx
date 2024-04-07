import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PrimaryBtn = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text style={styles.appButtonText}>{title}</Text>
        <Image source={require('../../assets/rightArrow.png')} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 120,
    elevation: 8,
    backgroundColor: '#263238',
    borderRadius: 25,
    height: 75,
    width: 310,
    alignItems: 'between',
    justifyContent: 'center',
    paddingHorizontal: 20
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
