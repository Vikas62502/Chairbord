import React from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import OtpInputText from './OtpInputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import { useNavigation } from '@react-navigation/native'

const OTP = () => {
  const navigation = useNavigation()
  return (
    <View>
      <View style={styles.primaryImageContainer}>
        <Image source={require('../../assets/otpVerification.png')} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.OtpVerificationText}>OTP Verification</Text>
        <Text style={styles.otpDescription}>
          Enter the OTP sent to{' '}
          <Text style={{ color: '#000000' }}>+91817862320</Text>
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <OtpInputText />
        </View>

        <Text style={styles.otpDescription}>
          Didn’t you recieve the OTP?
          <Text style={{ color: '#085AF8' }}> Resend OTP</Text>
        </Text>
        <PrimaryBtn
          title={'Verify'}
          disabled={true}
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  primaryImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '10%'
  },
  OtpVerificationText: {
    color: '#000000',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    marginBottom: '4%'
  },
  otpDescription: {
    color: '#4D4D4DC4',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Inter',
    fontWeight: '400'
  }
})

export default OTP
