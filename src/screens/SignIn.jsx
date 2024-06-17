import React, { useState } from 'react'
import {
  Button,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import InputText from '../components/common/InputText'
import SecondaryButton from '../components/common/SecondaryButton'
import DividerWithText from '../components/common/DividerWithText'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../components/OverlayHeader'
import VerifyOTP from './opt/VerifyOTP'
import OtpInputText from './opt/OtpInputText'

const SignIn = () => {
  const [active, setActive] = useState('password')
  const [showOtpField, setShowOtpField] = useState(false)
  const handleLinkPress = (url) => {
    Linking.openURL(url)
  }
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Sign in'}
        showBackButton={true}
        navigateTo={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.heading}>Welcome</Text>
          <Text style={styles.content}>
            please enter your account details here
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabSection,
                active === 'password' && styles.activeState
              ]}
              onPress={() => setActive('password')}
            >
              <Text
                style={[
                  styles.tabContent,
                  active === 'password' && styles.activeContent
                ]}
              >
                Password
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity
              onPress={() => setActive('otp')}
              style={[
                styles.tabSection,
                active === 'otp' && styles.activeState
              ]}
            >
              <Text
                style={[
                  styles.tabContent,
                  active === 'otp' && styles.activeContent
                ]}
              >
                OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          {active === 'password' ? (
            <>
              <InputText placeholder={'Phone Number or email'} secure={false} />
              <InputText placeholder={'Password'} secure={true} />

              <Pressable>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate('forgetYourPassword')}
                >
                  Forgot your Password?
                </Text>
              </Pressable>
              <View style={{ alignItems: 'center' }}>
                <SecondaryButton
                  title={'Login'}
                  disable={true}
                  onPress={() => navigation.navigate('drawer')}
                />
              </View>
            </>
          ) : (
            <View>
              <InputText placeholder={'Phone Number'} secure={false} />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 25
                }}
              >
                <SecondaryButton
                  title={'Get OTP'}
                  onPress={() => setShowOtpField(true)}
                />
              </View>

              {showOtpField && <VerifyOTP />}
            </View>
          )}
          {!showOtpField && (
            <View>
              <DividerWithText />

              <Text style={{ color: '#263238', textAlign: 'center' }}>
                Dont't have an account?
              </Text>
              <View style={{ alignItems: 'center' }}>
                <SecondaryButton
                  title={'Sign Up'}
                  onPress={() => navigation.navigate('register')}
                />
              </View>
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up you accept the {'\n'}
                  <TouchableOpacity
                    onPress={() => handleLinkPress('https://example.com/terms')}
                  >
                    <Text style={styles.link}>Terms of Service</Text>
                  </TouchableOpacity>{' '}
                  <Text style={styles.termsText}>and</Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleLinkPress('https://example.com/privacy')
                    }
                  >
                    <Text style={styles.link}> Privacy policy</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '65%',
    marginTop: 20
  },
  verticalDivider: {
    height: '100%',
    width: 2,
    backgroundColor: '#CCCCCC'
  },
  text: {
    color: '#263238',
    margin: '5%',
    textAlign: 'center'
  },
  heading: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38
  },
  tabSection: {
    width: '50%'
  },
  activeState: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2
  },
  tabContent: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#A6A6A6'
  },
  activeContent: {
    color: '#000000'
  },
  content: {
    fontWeight: '400',
    fontSize: 15,
    color: '#263238',
    fontFamily: 'inter'
  },
  termsContainer: {
    marginTop: '2%',
    alignItems: 'center'
  },
  termsText: {
    color: '#263238',
    fontFamily: 'inter',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center'
  },
  link: {
    color: '#0693D9',
    textDecorationLine: 'none',
    lineHeight: 16,
    fontSize: 11
  }
})
export default SignIn
