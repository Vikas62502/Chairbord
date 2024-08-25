import React, { useState, useRef } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const OtpInputText = ({ otp, setOtp }) => {
  const inputRefs = useRef([])

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Focus next input field if available
    if (value !== '' && index < otp.length - 1) {
      inputRefs?.current[index + 1].focus()
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
      {otp?.map((value, index) => (
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    marginHorizontal:10,
  },
  input: {
    height: 50,
    width: 45,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 26,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: '400',
    fontFamily: 'inter',
    lineHeight: 30,
    color: '#263238'
  }
})

export default OtpInputText
