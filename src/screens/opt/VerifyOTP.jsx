import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import OtpInputText from './OtpInputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import Loader from '../../components/ui/Loader'
import { REACT_APP_BASE_URL } from '../../utils/globalConfig'
import axios from 'axios'

const VerifyOTP = ({ setShowGeneratePassword, data }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  console.log(otp, 'otp')
  const [loading, setLoading] = useState(false)

  const verifyOtpApi = async () => {
    setLoading(true)

    let headerList = {
      Accept: '*/*',
      'Content-type': 'application/json'
    }

    let bodyContent = JSON.stringify({
      ...data,
      otp: otp.join('')
    })
    console.log(bodyContent, 'bodyContent')

    let reqOptions = {
      url: `${REACT_APP_BASE_URL}/register/agent-otp`,
      method: 'POST',
      headers: headerList,
      data: bodyContent
    }
    console.log(reqOptions, 'verify otp logs')

    try {
      let response = await axios.request(reqOptions)
      console.log(response, 'response')
      console.log(response.data, 'data')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      Alert.alert('Something went wrong')
      console.log(error, 'error')
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
