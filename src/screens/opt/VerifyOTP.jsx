import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import OtpInputText from './OtpInputText'
import SecondaryButton from '../../components/common/SecondaryButton'

const VerifyOTP = ({ setShowGeneratePassword }) => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%'
        }}
      >
        <OtpInputText />
      </View>

      <View style={{ alignItems: 'center', marginTop: '10%' }}>
        <SecondaryButton
          title={'Verify OTP'}
          onPress={() => setShowGeneratePassword(true)}
        />
      </View>

      <View style={{ alignSelf: 'center', marginTop: '5%' }}>
        <Text style={styles.otpDescription}>
          Didn’t you recieve the OTP?
          <Text style={{ color: '#085AF8' }}> Resend OTP</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  otpDescription: {
    color: '#4D4D4DC4',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter',
    fontWeight: '400'
  }
})

export default VerifyOTP
