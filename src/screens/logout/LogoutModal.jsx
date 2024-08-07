import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogoutModal = (props) => {
  const handleClearCache = async () => {
    await AsyncStorage.clear()
    props.navigation.navigate('SignIn')
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          // setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('dashboard')}
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
                style={[styles.cancelButton]}
                onPress={() => props.navigation.navigate('dashboard')}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.logoutButton]}
                onPress={handleClearCache}
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
    borderColor: '#263238',
    backgroundColor: '#263238',
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
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: 'white'
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
