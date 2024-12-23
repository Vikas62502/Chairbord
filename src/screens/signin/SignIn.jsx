import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import InputText from '../../components/common/InputText';
import SecondaryButton from '../../components/common/SecondaryButton';
import DividerWithText from '../../components/common/DividerWithText';
import { useNavigation } from '@react-navigation/native';
import OverlayHeader from '../../components/OverlayHeader';
import VerifyOTP from '../opt/VerifyOTP';
import Loader from '../../components/ui/Loader';
import { client } from '../../client/Axios';
import { setCache } from '../../helper/Storage';

import { styles } from './styles';
import LoginWithEmailAndPass from './LoginWithEmailAndPass';
import axios from 'axios';
import { useAppDispatch } from '../../store/hooks';
import { loginFailed, loginSucess } from '../../store/slice/login';

const SignIn = () => {
  const [active, setActive] = useState('password');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const navigation = useNavigation();

  const loginApi = async () => {
    setLoading(true);

    const bodyContent = {
      email: formData.email,
      password: formData.password,
    };

    console.log(bodyContent, '<--- bodyContent');

    try {
      // Make the login API request
      const response = await axios.post('http://192.168.0.171:3001/v1/api/login/agent', bodyContent);

      // Store user data and tokens securely in EncryptedStorage
      await EncryptedStorage.setItem('userData', JSON.stringify(response?.data));
      await EncryptedStorage.setItem('accessToken', response?.data?.accessToken);
      await EncryptedStorage.setItem('refreshToken', response?.data?.refreshToken);

      // Dispatch the login success action to Redux
      dispatch(loginSucess(response?.data));

      // Navigate to the drawer screen after successful login
      navigation.navigate('drawer');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      dispatch(loginFailed(errorMessage));

      console.log(JSON.stringify(error), '<--- error');

      Alert.alert(errorMessage || 'Login Failed !!', 'Please try again', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getOtpByPhoneNumber = async () => {
    setLoading(true);
    setShowOtpField(true);
    let bodyContent = JSON.stringify({
      phoneNumber: formData.phoneNumber
    });
    try {
      let response = await client.post('/login/agent-mobile', bodyContent);
      console.log(response);

    } catch (error) {
      Alert.alert(error?.response?.data?.message || 'Something went wrong', 'Please try again later', [
        {
          text: 'OK',
          onPress: () => navigation?.navigate('SignIn'),
          style: 'cancel'
        }
      ]);
      console.log(error, 'error');
      setShowOtpField(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Sign in'}
        showBackButton={true}
        navigateTo={'SignIn'}
      />
      {loading && <Loader loading={loading} />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={styles.content}>
              Please enter your account details here
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
              <LoginWithEmailAndPass
                formData={formData}
                setFormData={setFormData}
                loginApi={loginApi}
                isPasswordVisible={isPasswordVisible}
                setIsPasswordVisible={setIsPasswordVisible}
                navigation={navigation}
              />
            ) : (
              <View>
                <InputText
                  value={formData.phoneNumber}
                  placeholder={'Phone Number'}
                  secure={false}
                  onChangeText={(value) =>
                    setFormData({ ...formData, phoneNumber: value })
                  }
                  keyboardType="numeric"
                  isEditable={!showOtpField}
                  maxLength={10}
                />
                {!showOtpField && (
                  <View
                    style={{
                      justifyContent: 'center',
                      marginTop: 25
                    }}
                  >
                    <SecondaryButton
                      title={'Get OTP'}
                      onPress={() => getOtpByPhoneNumber()}
                    />
                  </View>
                )}

                {showOtpField && (
                  <VerifyOTP
                    data={{ phoneNumber: formData.phoneNumber }}
                    setShowOtpField={setShowOtpField}
                  />
                )}
              </View>
            )}
            {!showOtpField && (
              <View>
                <DividerWithText />

                <SecondaryButton
                  title={'Sign Up'}
                  onPress={() => navigation.navigate('register')}
                />
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By signing up you accept the {'\n'}
                    <TouchableOpacity
                      onPress={() =>
                        handleLinkPress(
                          'https://www.chairbord.in/termsandconditions'
                        )
                      }
                    >
                      <Text style={styles.link}>Terms of Service</Text>
                    </TouchableOpacity>{' '}
                    <Text>&</Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleLinkPress(
                          'https://www.chairbord.in/privacypolicy'
                        )
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
