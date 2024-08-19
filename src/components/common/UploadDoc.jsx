import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import pickImage from '../../helper/pickImage'

const UploadDoc = ({ text, setUploadFile }) => {
  const pickImageFile = async () => {
    const file = await pickImage()
    setUploadFile(file)
  }

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity style={styles.buttonContainer} onPress={pickImageFile}>
        <View style={styles.content}>
          <Image source={require('../../assets/uploadLogo.png')} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderBlockColor: 'black',
    height:100,
    width:'auto',
    borderWidth:1
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    width: '99%',
    height: '97%',
    margin: 1,
    borderRadius: 20
  },
  content: {
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center'
  }
})

export default UploadDoc
