import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../../components/OverlayHeader'
import VerifyOTP from '../opt/VerifyOTP'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'

const Register = () => {
  const [showOtpField, setShowOtpField] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    input_password: '',
    email_id: '',
    mobile_number: ''
  })

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const sendOtpRequest = async () => {
    setLoading(true)

    let bodyContent = JSON.stringify({
      email_id: formData.email_id,
      input_password: formData.input_password,
      mobile_number: formData.mobile_number
    })

    try {
      let response = await client.post('/register/agent', bodyContent)
      console.log(response, 'response with register')
      setShowOtpField(true)
    } catch (error) {
      Alert.alert('Something went wrong')
      console.log(error, 'error')
    } finally {
      setLoading(false)
    }
  }

  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Register'}
        showBackButton={true}
        navigateTo={() => navigation.goBack()}
      />
      {loading && <Loader />}
      <View>
        <InputText
          id={'email_id'}
          placeholder={'Enter email id'}
          onChangeText={(value) => formDataHandler('email_id', value)}
        />
        <InputText
          id={'mobile_number'}
          placeholder={'Enter mobile number'}
          onChangeText={(value) => formDataHandler('mobile_number', value)}
          maxLength={10}
        />
        <InputText
          placeholder={'Enter password'}
          onChangeText={(value) => formDataHandler('input_password', value)}
        />
        {showOtpField ? (
          <VerifyOTP data={formData} setShowOtpField={setShowOtpField} />
        ) : (
          <View style={styles.getOtpButton}>
            <SecondaryButton title={'Get OTP'} onPress={sendOtpRequest} />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  getOtpButton: {
    marginTop: '10%',
    alignItems: 'center'
  }
})

export default Register
