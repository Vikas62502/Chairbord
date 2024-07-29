import { View, Text, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import InputText from '../../components/common/InputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'


const Mobileverification = (props: any) => {
  const [VerificationFormData, setVerificationFormData] = useState({
    mobile: '',
    vehicleNo: '',
    engineNo: ''
  })
  const [loading, setLoading] = useState(false)

  const formHandler = (key: string, value: string) => {
    setVerificationFormData({ ...VerificationFormData, [key]: value })
  }

  console.log(VerificationFormData, "VerificationFormData")

  const sendOTP = async () => {
    props.navigation.navigate("OTP")
    // setLoading(true)
    // const request: CustomerOTPRequest = {
    //   mobileNo: mobile,
    //   vehicleNo: vehicleNo?.toUpperCase(),
    //   reqType: 'REG',
    //   chassisNo: '',
    //   resend: '0',
    //   udf1: '',
    //   udf2: '',
    //   udf3: '',
    //   udf4: '',
    //   udf5: '',
    // }
    // const response: ApiData<SendOtpResponse> = await sendCustomerOTP(request)
    // console.log(response, "verify otp")
    // setLoading(false)
    // if (response.success && response.data?.validateCustResp.sessionId) {
    //   await setCache('session', response.data?.validateCustResp.sessionId)
    //   props.navigation.navigate('OTP', {
    //     session: response.data?.validateCustResp.sessionId,
    //     mobile: mobile,
    //     vehicleNo: vehicleNo,
    //     to: "TagRegistration"
    //   })
    // } else {
    //   Alert.alert(response.error ?? '')
    // }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Mobile Verification'}
        showBackButton={true}
        navigateTo={() => props.navigation.goBack()}
      />
      <View style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <InputText
          placeholder={'Enter mobile number'}
          secure={false}
          value={VerificationFormData.mobile}
          onChangeText={(txt: string) => formHandler('mobile', txt)}
        />
        <InputText
          placeholder={'Enter Vehicle Number'}
          secure={false}
          value={VerificationFormData.vehicleNo}
          onChangeText={(txt: string) => formHandler('vehicleNo', txt?.toUpperCase())}
        />
        <InputText
          placeholder={'Enter last 5 digit engine number'}
          secure={false}
          value={VerificationFormData.engineNo}
          onChangeText={(txt: string) => formHandler('engineNo', txt?.toUpperCase())}
          maxLength={5}
        />
        <Text style={styles.errorText}>
          *Details not found Invalid mobile number, tag serial number or bank
          name
        </Text>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <PrimaryBtn
            title={'Sent OTP'}
            onPress={sendOTP}
            disabled={VerificationFormData?.mobile?.length < 10 || VerificationFormData?.vehicleNo?.length < 7 || VerificationFormData?.engineNo?.length < 5}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: '5%'
  },
  errorText: {
    padding: '2%',
    paddingHorizontal: '4%',
    color: '#FF0000'
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
})

export default Mobileverification
