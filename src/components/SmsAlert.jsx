import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PrimaryBtn from './common/PrimaryBtn'

const SmsAlert = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../assets/homeScreen/smsAlert.png')}
          style={styles.image}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.heading}>SMS alert</Text>
        <Text style={styles.font}>
          Stay updated with SMS alerts notifying all the events.
        </Text>
      </View>

      <PrimaryBtn
        onPress={() => navigation.navigate('SaveFuelAndTime')}
        title={'Next'}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  image: {
    alignSelf: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#03536D',
    fontWeight: '600',
    fontFamily: 'inter',
    textAlign: 'center'
  },
  font: {
    fontSize: 14,
    color: '#263238',
    fontWeight: '400',
    fontFamily: 'inter',
    maxWidth: 286,
    textAlign: 'center'
  }
})

export default SmsAlert
