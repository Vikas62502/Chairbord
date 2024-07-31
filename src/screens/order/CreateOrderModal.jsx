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
import InputText from '../../components/common/InputText'
import SelectField from '../../components/common/SelectField'
import { useNavigation } from '@react-navigation/native'

const CreateOrderModal = ({ visible, onClose, onApply }) => {
  const navigation = useNavigation()
  const [orderBodyData, setOrderBodyData] = React.useState({
    bankName: '',
    vehicleClass: '',
    tagCost: '',
    quantity: '',
    amount: ''
  })
  console.log(orderBodyData)

  const formDataHandler = (key, value) => {
    setOrderBodyData({ ...orderBodyData, [key]: value })
  }
  const setBank = (selectedItem, index) => {
    formDataHandler('bankName', selectedItem.id)
  }
  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 },
    { title: 'PNB', id: 3 },
    { title: 'KOTAK', id: 4 }
  ]

  const vehicleClassData = [
    { title: '2 Wheeler' },
    { title: '4 Wheeler' },
    { title: '6 Wheeler' }
  ]
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '5%'
            }}
          >
            <View>
              <Text style={styles.titleText}>Create Order</Text>
            </View>
            <View>
              <Pressable onPress={onClose}>
                <Image
                  source={require('../../assets/DrawerNavigation/closeLogout.png')}
                  alt="closeBtn"
                />
              </Pressable>
            </View>
          </View>
          <SelectField
            dataToRender={bankNameData}
            title={'Select bank name'}
            selectedValue={setBank}
          />
          <View style={{ marginTop: '5%' }}>
            <SelectField
              dataToRender={vehicleClassData}
              title={'Select vehicle'}
              selectedValue={(selectedItem, index) => {
                formDataHandler('vehicleClass', selectedItem.title)
              }}
            />
          </View>
          <InputText
            placeholder={'Tag cost'}
            inputStyle={{
              width: '100%'
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '5%'
            }}
          >
            <View style={{ width: '45%' }}>
              <InputText
                placeholder={'Enter quantity'}
                inputStyle={{
                  width: '100%'
                }}
                onChangeText={(value) => {
                  formDataHandler('quantity', value)
                }}
              />
            </View>
            <View style={{ width: '45%' }}>
              <InputText
                placeholder={'Enter amount'}
                inputStyle={{
                  width: '100%'
                }}
                onChangeText={(value) => {
                  formDataHandler('amount', value)
                }}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('orderDetails', {
                  orderBodyData: {
                    bankName: 'Bajaj',
                    vehicleClass: '2 Wheeler'
                  }
                })
              }
              style={[styles.button, styles.applyButton]}
            >
              <Text style={[styles.buttonText, styles.applyButtonText]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: '10%',
    lineHeight: 24,
    color: '#000000'
  },
  description: {
    textAlign: 'center',
    marginBottom: '6%',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000'
  },
  backButton: {
    backgroundColor: '#263238',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  bolderText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000'
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '7%'
  },
  button: {
    flex: 1,
    paddingVertical: '3%',
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#263238'
  },
  applyButton: {
    backgroundColor: '#263238',
    marginLeft: 10
  },
  applyButtonText: {
    color: 'white'
  },
  buttonText: {
    color: '#263238',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  }
})

export default CreateOrderModal
