import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import OtpInputText from './OtpInputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import { useNavigation } from '@react-navigation/native'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'

const OTP = (props) => {
  const userData = props.route.params?.VerificationFormData
  const [loading, setLoading] = useState(false)
  let sixStringArray = ['', '', '', '', '', '']
  const [otp, setOtp] = useState(sixStringArray)

  const verifyOtp = async () => {
    console.log('validate otp')
    setLoading(true)
    try {
      console.log(otp.join(''), 'otp boi')
      console.log(await getCache('session'), 'session id')
      const response = await client.post('/bajaj/validateOtp', {
        otp: otp.join(''),
        sessionId: await getCache('session')
      })

      if (response?.status === 203) {
        console.log(response?.data, 'error')
        console.log(response?.data?.errorDesc, 'error')
        Alert.alert(
          response?.data?.errorDesc || 'Something went wrong', // Title/Message
          '', // You can add a message here if you want. If not, keep it as an empty string.
          [
            {
              text: 'OK',
              onPress: () => setLoading(false) // Action for the 'OK' button
            }
          ]
        )
      } else {
        if (
          response?.data?.validateOtpResp?.custDetails?.walletStatus ===
          'Active'
        ) {
          navigation.navigate('imageGallary', {
            sessionId: await getCache('session'),
            response: response?.data?.validateOtpResp,
            customerId: response?.data?.customerId
          })
        } else {
          navigation.navigate('customerRegistration', {
            otpData: response?.data,
            sessionId: await getCache('session'),
            response: response?.data?.validateOtpResp,
            customerId: response?.data?.customerId
          })
        }
      }
    } catch (error) {
      console.log(error, "errordasdsa")
      console.log(JSON.stringify(error), 'errorasdasda')
    } finally {
      setLoading(false)
    }
  }
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View>
        <View style={styles.primaryImageContainer}>
          <Image source={require('../../assets/otpVerification.png')} />
        </View>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.OtpVerificationText}>OTP Verification</Text>
          <Text style={styles.otpDescription}>
            Enter the OTP sent to{' '}
            <Text style={{ color: '#000000' }}>{`+91${userData.mobile}`}</Text>
          </Text>

          <View style={{ flexDirection: 'row', marginVertical: '5%' }}>
            <OtpInputText otp={otp} setOtp={setOtp} />
          </View>

          <Text style={styles.otpDescription}>
            Didn’t you recieve the OTP?
            <Text style={{ color: '#085AF8' }}> Resend OTP</Text>
          </Text>
          <PrimaryBtn
            title={'Verify'}
            disabled={loading}
            onPress={() => verifyOtp()}
          />
        </View>
      </View>
    </SafeAreaView>
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
