import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import OtpInputText from './OtpInputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import { useNavigation } from '@react-navigation/native'

const VerifyOTP = ({ setShowGeneratePassword, data, setShowOtpField }) => {
  const navigation = useNavigation()
  let sixStringArray = ['', '', '', '', '', '']

  const [otp, setOtp] = useState(sixStringArray)
  const [loading, setLoading] = useState(false)

  const verifyOtpApi = async () => {
    setLoading(true)

    let bodyContent = JSON.stringify({
      ...data,
      otp: otp.join('')
    })

    try {
      let response = await client.post('/register/agent-otp', bodyContent)
      navigation.navigate('SignIn')
      console.log(response.data, 'data')
    } catch (error) {
      Alert.alert('Something went wrong')
      console.log(error, 'error')
      setShowOtpField(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%'
        }}
      >
        {loading && <Loader />}
        <OtpInputText otp={otp} setOtp={setOtp} />
      </View>

      <View style={{ alignItems: 'center', marginTop: '10%' }}>
        <SecondaryButton
          title={'Verify OTP'}
          onPress={() => {
            verifyOtpApi()
            // setShowGeneratePassword(true)
          }}
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
