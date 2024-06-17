import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../../components/OverlayHeader'
import VerifyOTP from '../opt/VerifyOTP'
import DividerWithText from '../../components/common/DividerWithText'

const ForgetYourPassword = () => {
  const [showOtpField, setShowOtpField] = useState(false)
  const [showGeneratePassword, setShowGeneratePassword] = useState(false)
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Reset Password'}
        showBackButton={true}
        navigateTo={() => navigation.goBack()}
      />

      <View>
        <InputText placeholder={'Enter Phone Number'} />
        {showGeneratePassword ? (
          <View>
            <DividerWithText boldText={true} text={'Generate Password'} />
            <InputText placeholder={'Enter new password'} />
            <InputText placeholder={'Enter confirm password'} />
            <View style={{ marginVertical: '10%', alignItems: 'center' }}>
              <SecondaryButton
                title={'Submit'}
                onPress={() => setShowOtpField(true)}
              />
            </View>
          </View>
        ) : (
          <View>
            {showOtpField ? (
              <View style={{ paddingHorizontal: '1%' }}>
                <VerifyOTP setShowGeneratePassword={setShowGeneratePassword} />
              </View>
            ) : (
              <View style={{ marginVertical: '4%', alignItems: 'center' }}>
                <SecondaryButton
                  title={'Get OTP'}
                  onPress={() => setShowOtpField(true)}
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
