import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image
} from 'react-native'
import InputText from '../../components/common/InputText'
import SelectField from '../../components/common/SelectFieldBig'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../components/ui/Loader'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import { useOrders } from '../../orderContext/OrderContext'

const CreateOrderModal = ({ visible, onClose, onApply }) => {
  const navigation = useNavigation()

  // Access the ordersArray and setOrdersArray from context
  const { ordersArray, setOrdersArray } = useOrders()

  const [orderBodyData, setOrderBodyData] = useState({
    bankId: 0,
    vehicleClass: 0,
    tagCost: 0,
    quantity: 0,
    amount: 0
  })
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '',
    state: '',
    pincode: '',
    phone: '',
    alternate_m: ''
  })

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [tagCost, setTagCost] = useState('')

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const formDataHandler = (key, value) => {
    setOrderBodyData({ ...orderBodyData, [key]: value })
    // setDeliveryAddress({ ...deliveryAddress, [key]: value })
  }

  const setBank = (selectedItem, index) => {
    formDataHandler('bankId', selectedItem.id)
  }

  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 },
    { title: 'PNB', id: 3 },
    { title: 'KOTAK', id: 4 }
  ]

  const vehicleClassData = [
    { title: 'VC 4', id: 'VC4' },
    { title: 'VC 5', id: 'VC5' }
  ]

  const getUserData = async () => {
    let userData = await getCache('userData')
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleTagCost = async () => {
    setLoading(true)
    try {
      const response = await client.post('/order/fastag/get-tag-cost', {
        agentId: userData?.user?.id,
        bankId: orderBodyData.bankId,
        vehicleClass: orderBodyData.vehicleClass
      })
      setTagCost(JSON.stringify(response.data.cost))
      setOrderBodyData({ ...orderBodyData, tagCost: response.data.cost })
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderBodyData.bankId !== 0 && orderBodyData.vehicleClass !== 0) {
      handleTagCost()
    }
  }, [orderBodyData.bankId, orderBodyData.vehicleClass])

  useEffect(() => {
    setOrderBodyData({
      ...orderBodyData,
      amount: orderBodyData.quantity * orderBodyData.tagCost
    })
  }, [orderBodyData.quantity])

  const handleNext = () => {
    if (isButtonEnabled) {
      setOrdersArray((prevOrdersArray) => {
        const updatedOrders = [...prevOrdersArray, { ...orderBodyData }]
        console.log(updatedOrders, 'Updated array with new order')
        handleClose()
        navigation.navigate('orderDetails')
        return updatedOrders
      })
    }
  }

  const allFieldsFilled = () => {
    // Combine both objects into one array of values
    const allValues = [
      ...Object.values(orderBodyData),
      // ...Object.values(deliveryAddress)
    ]

    // Check if all fields are filled (i.e., non-empty and non-zero)
    return allValues.every((value) => value !== '' && value !== 0)
  }

  useEffect(() => {
    // Update button state whenever `orderBodyData` or `deliveryAddress` changes
    setIsButtonEnabled(allFieldsFilled())
  }, [orderBodyData, deliveryAddress])

  const handleClose = () => {
    setOrderBodyData({
      bankId: 0,
      vehicleClass: 0,
      tagCost: 0,
      quantity: 0,
      amount: 0
    })
    setTagCost('')
    onClose()
  }

  return (
    <>
      {loading && <Loader />}
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
                    style={{ width: 20, height: 20 }}
                  />
                </Pressable>
              </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <SelectField
                dataToRender={bankNameData}
                title={'Select bank name'}
                selectedValue={setBank}
              />
              <View style={{ marginTop: '5%' }}>
                <SelectField
                  dataToRender={vehicleClassData}
                  title={'Select vehicle class'}
                  selectedValue={(selectedItem, index) => {
                    formDataHandler('vehicleClass', selectedItem.id)
                  }}
                />
              </View>

              <View style={{ width: '100%', marginTop: '4%' }}>
                <InputText
                  value={tagCost}
                  placeholder="Tag Cost"
                  secure={false}
                  onChangeText={(value) => {
                    formDataHandler('tagcost', value)
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ width: '45%' }}>
                  <InputText
                    placeholder={'Quantity'}
                    inputStyle={{ width: '100%' }}
                    value={orderBodyData.quantity}
                    onChangeText={(value) => {
                      formDataHandler('quantity', value)
                    }}
                  />
                </View>
                <View style={{ width: '45%' }}>
                  <InputText
                    placeholder={'Amount'}
                    inputStyle={{ width: '100%' }}
                    value={JSON.stringify(orderBodyData.amount)}
                  />
                </View>
              </View>
              {/* <View style={{ width: '100%' }}>
                <InputText
                  value={deliveryAddress?.address}
                  placeholder="Address"
                  secure={false}
                  onChangeText={(value) => {
                    formDataHandler('address', value)
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ width: '45%' }}>
                  <InputText
                    placeholder={'State'}
                    inputStyle={{ width: '100%' }}
                    value={deliveryAddress?.state}
                    onChangeText={(value) => {
                      formDataHandler('state', value)
                    }}
                  />
                </View>
                <View style={{ width: '45%' }}>
                  <InputText
                    placeholder={'Pincode'}
                    inputStyle={{ width: '100%' }}
                    value={deliveryAddress?.pincode}
                    onChangeText={(value) => {
                      formDataHandler('pincode', value)
                    }}
                  />
                </View>
              </View>

              <View style={{ width: '100%' }}>
                <InputText
                  value={deliveryAddress?.phone}
                  placeholder="Mobile number"
                  secure={false}
                  onChangeText={(value) => {
                    formDataHandler('phone', value)
                  }}
                />
              </View>
              <View style={{ width: '100%' }}>
                <InputText
                  value={deliveryAddress?.alternate_m}
                  placeholder="Alternate mobile number"
                  secure={false}
                  onChangeText={(value) => {
                    formDataHandler('alternate_m', value)
                  }}
                />
              </View> */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleClose} style={styles.button}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNext}
                  style={[
                    styles.button,
                    styles.applyButton,
                    isButtonEnabled ? {} : { opacity: 0.5 } // Dim the button when disabled
                  ]}
                  disabled={!isButtonEnabled} // Disable button if fields are not filled
                >
                  <Text style={[styles.buttonText, styles.applyButtonText]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
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
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%'
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
    marginLeft: '5%'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#263238'
  },
  applyButtonText: {
    color: '#fff'
  }
})

export default CreateOrderModal
