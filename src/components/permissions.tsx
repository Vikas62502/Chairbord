import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'
import PrimaryBtn from './common/PrimaryBtn'
import SecondaryButton from './common/SecondaryButton'

const Permissions = () => {
  const navigation = useNavigation()

  // State to manage checkbox selections
  const [locationChecked, setLocationChecked] = useState(false)
  const [cameraChecked, setCameraChecked] = useState(false)
  const [notificationChecked, setNotificationChecked] = useState(false)
  const [storageChecked, setStorageChecked] = useState(false)
  const [contactChecked, setContactChecked] = useState(false)


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/homeScreen/permissions.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>To get started, we need your permissions:</Text>
        <View style={{justifyContent:'flex-start',marginVertical:10 }}>
        <View style={styles.permissionItem}>
          <CheckBox
            value={locationChecked}
            onValueChange={setLocationChecked}
            tintColors={{ true: '#02546D', false: 'grey' }}
          />
          <Text style={styles.font}>Location access</Text>
        </View>

        <View style={styles.permissionItem}>
          <CheckBox
            value={cameraChecked}
            onValueChange={setCameraChecked}
            tintColors={{ true: '#02546D', false: 'grey' }}
          />
          <Text style={styles.font}>Camera access</Text>
        </View>
        <View style={styles.permissionItem}>
          <CheckBox
            value={storageChecked}
            onValueChange={setStorageChecked}
            tintColors={{ true: '#02546D', false: 'grey' }}
          />
          <Text style={styles.font}>Storage access</Text>
        </View>
        <View style={styles.permissionItem}>
          <CheckBox
            value={contactChecked}
            onValueChange={setContactChecked}
            tintColors={{ true: '#02546D', false: 'grey' }}
          />
          <Text style={styles.font}>Contact access</Text>
        </View>
        <View style={styles.permissionItem}>
          <CheckBox
            value={notificationChecked}
            onValueChange={setNotificationChecked}
            tintColors={{ true: '#02546D', false: 'grey' }}
          />
          <Text style={styles.font}>Notification access</Text>
        </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SecondaryButton
          onPress={() => navigation.navigate('drawer')}
          title={'Grant Permissions'}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    justifyContent: 'space-between', // Space between content and button
    alignItems: 'center', // Center content horizontally
  },
  content: {
    flex: 1, // Allow content to take available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 20, // Optional: Add horizontal padding for better spacing
  },
  image: {
    width: 300, // Adjust as needed
    height: 300, // Adjust as needed
  },
  heading: {
    fontSize: 28,
    color: '#03536D',
    fontWeight: '800',
    fontFamily: 'inter',
    textAlign: 'center',
    marginVertical: 10, // Add vertical margin between image and text
  },
  font: {
    fontSize: 16,
    color: '#263238',
    fontWeight: '400',
    fontFamily: 'inter',
    maxWidth: 300,
    textAlign: 'left',
    marginLeft: 10, // Add margin to create space between checkbox and text
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5, // Space between permission items
  },
  bottomContainer: {
    padding: 20, // Add padding around the button
    width: '100%',
    alignItems: 'center', // Center button horizontally
  }
})

export default Permissions
