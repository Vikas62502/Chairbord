import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AddBtn from '../../components/ui/AddBtn'

const OrderSuccessModal = ({ visible, onClose, onApply }) => {
  const navigation = useNavigation()
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              padding: '5%'
            }}
          >
            <Pressable onPress={onClose}>
              <Image
                source={require('../../assets/DrawerNavigation/closeLogout.png')}
                alt="closeBtn"
              />
            </Pressable>
          </View>

          <View style={{ justifyContent: 'center', backgroundColor: 'red' }}>
            <Image
              source={require('../../assets/screens/success.png')}
              style={{ justifyContent: 'center' }}
            />
            <Text style={styles.titleText}>
              Your order has been placed successfully
            </Text>

            <View style={{ marginVertical: '10%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 16, color: '#000000' }}>Order ID</Text>
                <Text>: RET145665654</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, color: '#000000' }}>
                  Amount Paid
                </Text>
                <Text>: 1200.00</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, color: '#000000' }}>
                  Payment Reff No.
                </Text>
                <Text>: 5565467878</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Dashboard</Text>
            </TouchableOpacity>

            <AddBtn
              title={'Order History'}
              onPress={() => navigation.navigate('OrderHistory')}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '95%',
    backgroundColor: '#FFFFFF',
    padding: '5%',
    borderRadius: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%'
  },
  button: {
    borderWidth: 0.5,
    borderColor: '#02546D',
    borderRadius: 20,
    padding: '5%'
  },
  buttonText: {
    color: '#02546D',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  applyButton: {
    backgroundColor: '#00FF00'
  },
  applyButtonText: {
    color: '#000000'
  }
})

export default OrderSuccessModal
