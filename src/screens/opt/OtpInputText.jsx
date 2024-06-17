import React, { useState, useRef } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const OtpInputText = () => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef([])

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Focus next input field if available
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      // If backspace is pressed and current input is empty, focus previous input
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={value}
          maxLength={1}
          onChangeText={(text) => handleOtpChange(index, text)}
          onKeyPress={(e) => handleKeyPress(index, e)}
          keyboardType="numeric"
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'
  },
  input: {
    height: 60,
    width: 70,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'inter',
    lineHeight: 38,
    color: '#263238'
  }
})

export default OtpInputText
