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

const SaveFuelAndTime = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../assets/homeScreen/saveFuelAndTime.png')}
          style={styles.image}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.heading}>Save fuel & time</Text>
        <Text style={styles.font}>
          Real-Time location and Status of vehicles allows effective trip
          planning.
        </Text>
      </View>

      <PrimaryBtn
        onPress={() => navigation.navigate('SignIn')}
        title={'Sign In'}
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

export default SaveFuelAndTime
