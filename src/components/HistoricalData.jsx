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

const HistoricalData = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SmsAlert')}>
        <View>
          <Image
            source={require('../assets/homeScreen/historicalData.png')}
            style={styles.image}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.heading}>Historical data</Text>
          <Text style={styles.font}>
            You can access location history and detailed log by logging into the
            GPS portal.
          </Text>
        </View>
      </TouchableOpacity>

      <PrimaryBtn
        onPress={() => navigation.navigate('SmsAlert')}
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
    color: '#263238',
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

export default HistoricalData
