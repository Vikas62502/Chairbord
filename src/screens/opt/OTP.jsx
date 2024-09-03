import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
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
    setLoading(true)
    try {
      const response = await client.post('/bajaj/validateOtp', {
        otp: otp.join(''),
        sessionId: await getCache('session')
      })

      if (
        response?.data?.validateOtpResp?.custDetails?.walletStatus === 'Active'
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
    } catch (error) {
      console.log(error)
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
           <View style={{ justifyContent: 'flex-end' , alignItems:'center'  }}>
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
