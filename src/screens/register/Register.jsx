import React from 'react'
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
const Register = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View>
        <View style={{ position: 'relative' }}>
          <View style={styles.overlay}></View>
          <View style={styles.overlayTextContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('drawer')}>
                <Image source={require('../../assets/backArrowButton.png')} />
              </TouchableOpacity>
              <Text style={styles.overlayText}>Register</Text>
              <View></View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: '5%' }}>
          <Image
            source={require('../../assets/chairBordLogoWithoutName.png')}
          />
        </View>

        <View style={{ marginTop: '5%' }}>
          <InputText placeholder={'Enter full name'} />
          <InputText placeholder={'Enter email id'} />
          <InputText placeholder={'Enter mobile number'} />
          <View style={styles.getOtpButton}>
            <SecondaryButton title={'Get OTP'} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  getOtpButton: {
    marginTop: '10%',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(38, 50, 56, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 204,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  overlayText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    zIndex: 1,
    color: 'white'
  },
  overlayTextContainer: {
    position: 'relative',
    zIndex: 2,
    top: '250%',
    paddingHorizontal: 10
  }
})

export default Register
