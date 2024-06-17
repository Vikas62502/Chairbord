import React, { useState } from 'react'
import {
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
const Register = () => {
  const [showOtpField, setShowOtpField] = useState(false)
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Register'}
        showBackButton={true}
        navigateTo={() => navigation.goBack()}
      />
      <View>
        <InputText placeholder={'Enter full name'} />
        <InputText placeholder={'Enter email id'} />
        <InputText placeholder={'Enter mobile number'} />
        {showOtpField ? (
          <VerifyOTP />
        ) : (
          <View style={styles.getOtpButton}>
            <SecondaryButton
              title={'Get OTP'}
              onPress={() => setShowOtpField(true)}
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
