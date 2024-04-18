import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import InputText from '../../components/common/InputText'
import SecondaryButton from '../../components/common/SecondaryButton'
import { useNavigation } from '@react-navigation/native'

const ForgetYourPassword = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View>
        <View style={styles.overlayContainer}>
          <View style={styles.overlay}></View>
          <View style={styles.overlayTextContainer}>
            <View>
              <TouchableOpacity style={styles.backArrow}>
                <Image source={require('../../assets/backArrowButton.png')} />
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: '-15%', zIndex: 10 }}>
              <Text style={styles.overlayText}>{'Reset Password'}</Text>
            </View>
            <View></View>
          </View>
        </View>
        <View style={styles.chairBordLogo}>
          <Image
            source={require('../../assets/chairBordLogoWithoutName.png')}
          />
        </View>
      </View>

      <View style={{ marginTop: '10%' }}>
        <InputText placeholder={'Enter Phone Number'} />
        <View style={{ marginVertical: '5%', alignItems: 'center' }}>
          <SecondaryButton
            title={'Get OTP'}
            onPress={() => navigation.navigate('OTP')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'relative',
    height: 172
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(38, 50, 56, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  overlayText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    color: 'white'
  },
  overlayTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1
  },
  backArrow: {
    marginRight: 20
  },
  chairBordLogo: {
    position: 'absolute',
    left: '33%',
    top: '10%',
    zIndex: 0
  }
})

export default ForgetYourPassword
