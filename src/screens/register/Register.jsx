import React, { useState } from 'react'
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../../components/OverlayHeader'
import VerifyOTP from '../opt/VerifyOTP'
import axios from 'axios'
import Loader from '../../components/ui/Loader'
import { REACT_APP_BASE_URL } from '../../utils/globalConfig'
import { registerAgent } from '../../services/AuthServices'
const Register = () => {
  const [showOtpField, setShowOtpField] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    input_password: '',
    email_id: '',
    mobile_number: ''
  })

  const sendOtpRequest = async () => {
    setLoading(true)

    let headerList = {
      Accept: '*/*',
      'Content-type': 'application/json'
    }

    let bodyContent = JSON.stringify({
      email_id: formData.email,
      input_password: formData.fullName,
      mobile_number: formData.mobile
    })

    let reqOptions = {
      url: `${REACT_APP_BASE_URL}/register/agent`,
      method: 'POST',
      headers: headerList,
      data: bodyContent
    }
    console.log(reqOptions, 'reqOptions')

    try {
      let response = await axios.request(reqOptions)
      console.log(response, 'response with register')
      setLoading(false)
      setShowOtpField(true)
    } catch (error) {
      setLoading(false)
      Alert.alert('Something went wrong')
      console.log(error, 'error')
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
          placeholder={'Enter email id'}
          onChangeText={(email) =>
            setFormData({ ...formData, email_id: email })
          }
        />
        <InputText
          placeholder={'Enter mobile number'}
          onChangeText={(mobileNo) =>
            setFormData({ ...formData, mobile_number: mobileNo })
          }
        />
        <InputText
          placeholder={'Enter password'}
          onChangeText={(text) => {
            setFormData({ ...formData, input_password: text })
          }}
        />
        {showOtpField ? (
          <VerifyOTP data={formData} />
        ) : (
          <View style={styles.getOtpButton}>
            <SecondaryButton
              title={'Get OTP'}
              onPress={() => {
                sendOtpRequest()
              }}
            />
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
