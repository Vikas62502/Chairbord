import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('FastTagAndGPS')}>
        <View>
          <Image
            source={require('../assets/chairBoardLogo.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
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
  }
})

export default HomeScreen
