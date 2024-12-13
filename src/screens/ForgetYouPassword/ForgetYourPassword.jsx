import { View, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import OtpInputText from '../opt/OtpInputText'
import showAlert from '../../utils/showAlert'

const ForgetYourPassword = () => {
  const [loading, setLoading] = useState(false)
  const [showOtpField, setShowOtpField] = useState(false)
  const [showGeneratePassword, setShowGeneratePassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  })
  let sixStringArray = ['', '', '', '', '', '']
  const [otp, setOtp] = useState(sixStringArray)
  console.log(otp)

  console.log(formData, 'formData')

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }
  const navigation = useNavigation()

  const sendPasswordResetOtp = async () => {
    setLoading(true)
    setShowOtpField(true)
    try {
      let response = await client.post('/forget/pass-otp', {
        email: formData.email
      })
      console.log(response, 'response with reset password')
    } catch (error) {
      console.log(error, 'error')
      setShowOtpField(false)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async () => {
    setLoading(true)

    try {
      const res = await client.post('/forget/pass-reset', {
        email: formData.email,
        otp: otp.join(''),
        newPassword: formData.newPassword
      })
      console.log(res, 'reset password response')
      setShowOtpField(true)
    } catch (error) {
      console.log(error?.response?.data?.message, 'error')
      showAlert(error?.response?.data?.message,
        () => {
          setShowOtpField(false)
          setShowGeneratePassword(false)
        }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Reset Password'}
        showBackButton={true}
        navigateTo={() => navigation.goBack()}
      />
      {loading && <Loader loading={loading} />}
      <View style={{
        marginHorizontal: 20,
        marginTop: '5%'
      }}>
        <InputText
          value={formData.email}
          placeholder={'Enter Email / Phone Number'}
          onChangeText={(value) => formDataHandler('email', value)}
        />
        {showGeneratePassword ? (
          <></>
        ) : (
          <View>
            {showOtpField ? (
              <>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: '4%'
                  }}
                >
                  <OtpInputText otp={otp} setOtp={setOtp} />
                </View>
                <InputText
                  placeholder={'Enter new password'}
                  onChangeText={(value) =>
                    formDataHandler('newPassword', value)
                  }
                  value={formData.newPassword}
                />
                <InputText
                  placeholder={'Enter confirm password'}
                  onChangeText={(value) =>
                    formDataHandler('confirmPassword', value)
                  }
                  value={formData.confirmPassword}
                />
                <View style={{ marginVertical: '4%', alignItems: 'center' }}>
                  <SecondaryButton
                    title={'Reset New Password'}
                    onPress={resetPassword}
                  />
                </View>
              </>
            ) : (
              <View style={{ marginVertical: '4%', }}>
                <SecondaryButton
                  title={'Get OTP'}
                  onPress={sendPasswordResetOtp}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default ForgetYourPassword
