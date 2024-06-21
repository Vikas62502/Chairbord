import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const UploadDoc = ({ text }) => {
  return (
    <LinearGradient
      colors={['#02546D', '#142D40']}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{
        height: '19%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
      }}
    >
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/uploadLogo.png')} />
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#02546D' }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    width: '99%',
    height: '97%',
    margin: 1,
    borderRadius: 20
  }
})

export default UploadDoc
