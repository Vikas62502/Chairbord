import React, { useState, useEffect } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slice/login'

const LogoutModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useAppDispatch()

  // This will trigger every time the screen is focused (or reloaded)
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(true); // Show the modal every time this screen is focused
    }, [])
  )

  const handleClearCache = async () => {
    await AsyncStorage.clear() // Clear AsyncStorage
    setModalVisible(false) // Close modal before navigating
    props.navigation.navigate('SignIn') // Navigate to SignIn screen
    dispatch(logout())

  }

  const handleCancel = () => {
    setModalVisible(false) // Close the modal
    props.navigation.navigate('drawer') // Navigate back to dashboard
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={handleCancel}
              style={{ alignSelf: 'flex-end', paddingBottom: '5%' }}
            >
              <View>
                <Image
                  source={require('../../assets/DrawerNavigation/closeLogout.png')}
                  alt="closeBtn"
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.modalText}>Log out?</Text>
            <Text style={styles.description}>
              Are you sure you want to logout?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%'
              }}
            >
              <Pressable
                style={styles.cancelButton}
                onPress={handleCancel} // Handle cancel action
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.logoutButton}
                onPress={handleClearCache} // Handle logout action
              >
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  logoutButton: {
    borderRadius: 22,
    padding: 10,
    borderWidth: 1,
    borderColor: '#02546D',
    backgroundColor: '#02546D',
    width: '45%'
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24
  },
  cancelButton: {
    borderRadius: 22,
    padding: 10,
    borderWidth: 1,
    borderColor: '#263238',
    width: '45%'
  },
  cancelText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24
  },
  textStyle: {
    color: '#263238',
    fontWeight: '600',
    textAlign: 'center'
  },
  modalText: {
    textAlign: 'center',
    color: '#263238',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    paddingBottom: '15%'
  },
  description: {
    textAlign: 'center',
    color: '#263238',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 38,
    paddingBottom: '15%'
  }
})

export default LogoutModal
