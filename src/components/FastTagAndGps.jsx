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

const FastTagAndGps = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../assets/homeScreen/fasttagAndGPS.png')}
          style={styles.image}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.heading}>FASTAG and GPS</Text>
        <Text style={styles.font}>
          The easiest way of monitor and dispatch your vehicle
        </Text>
      </View>

      <PrimaryBtn
        onPress={() => navigation.navigate('HistoricalData')}
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
    fontFamily: 'inter'
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

export default FastTagAndGps
