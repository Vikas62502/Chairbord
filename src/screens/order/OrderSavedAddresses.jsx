import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import OverlayHeader from '../../components/OverlayHeader'
import Loader from '../../components/ui/Loader'
import LinearButton from '../../components/common/LinearButton'
import AddBtn from '../../components/ui/AddBtn'
import OrderSuccessModal from './OrderSuccessModal'
import OrderFaildModal from './OrderFaildModal'
import { client } from '../../client/Axios'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

// Import the context for orders
import { useOrders } from '../../orderContext/OrderContext'
import { getCache } from '../../helper/Storage'
import DeliveryAddressModal from './DeliveryAddressModal'

const OrderSavedAddresses = (props) => {

  const navigation = useNavigation()
  const { ordersArray, setOrdersArray } = useOrders()
  const [loading, setLoading] = useState(false)
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState({
    address: '',
    state: '',
    pincode: '',
    phone: '',
    alternate_mobile_number: ''
  })

  function calculateTotalAmount(ordersArray) {
    return ordersArray.reduce((total, order) => total + order.amount, 0)
  }

  const responseAmount = calculateTotalAmount(ordersArray)

  const [totalOrderAmount, setTotalAmountCost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    setTotalAmountCost(calculateTotalAmount(ordersArray))
  }, [ordersArray])

  const [deliveryAddressModal, setDeliveryAddressModal] = useState(false)
  const [isOrderSuccess, setIsOrderSuccess] = useState(false)
  const [isOrderFailed, setIsOrderFailed] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [userData, setUserData] = useState(null)
  const [orderId, setOrderId] = useState('')
  const [userId, setUserId] = useState(props?.route?.params?.userId)

  const [addressArray, setAddressArray] = useState([])

  const handleDeleteOrder = () => {
    setOrdersArray([])
    setTotalAmountCost(0)
  }

  const handleSavedAddressFetching = async () => {
    setLoading(true)
    try {
      const response = await client.get(
        `/order/fastag/get-saved-addresses/${userId}`
      )
      console.log(response.data, '<------------response data is here man')
      setAddressArray(response.data.addresses)
    } catch (error) {
      console.log(error.messsage)
    } finally {
      setLoading(false)
    }
  }

  const bankNameData = [
    { title: 'Bajaj', id: 1 },
    { title: 'SBI', id: 2 }
    // { title: 'PNB', id: 3 },
    // { title: 'KOTAK', id: 4 }
  ]

//   const getUserData = async () => {
//     let userData = await getCache('userData')
//     setUserId(userData.user.id)
//   }

  let TransactionID, OrderID

  const handleSubmit = async () => {
    setDeliveryAddressModal(true)
  }

//   useEffect(() => {
//     getUserData();
//   }, [])

  useFocusEffect(
    useCallback(() => {
      if (userId!=0) {
        handleSavedAddressFetching();
      }
    }, [])
  )

  useEffect(() => {
    if (deliveryAddressModal == false) handleSavedAddressFetching()
  }, [deliveryAddressModal])

//   const dummyAddresses = [
//     {
//       address: '123 Main Street, Apartment 5B',
//       state: 'Metropolis',
//       pincode: '123456',
//       phone: '9876543210',
//       alternate_mobile_number: '9876504321'
//     },
//     {
//       address: '456 Another Lane, Suite 8C',
//       state: 'Hometown',
//       pincode: '654321',
//       phone: '8765432109',
//       alternate_mobile_number: '8765404321'
//     }
//   ]

  const handleAddressSelect = (address) => {
    setCurrentDeliveryAddress(address)
  }

  const handleOutsideClick = () => {
    setCurrentDeliveryAddress({
      address: '',
      state: '',
      pincode: '',
      phone: '',
      alternate_mobile_number: ''
    })
  }


  const checkIfAddressIsSame = (address) => {
    return (
      address.address === currentDeliveryAddress.address &&
      address.state === currentDeliveryAddress.state &&
      address.pincode === currentDeliveryAddress.pincode &&
      address.phone === currentDeliveryAddress.phone &&
      address.alternate_mobile_number ===
        currentDeliveryAddress.alternate_mobile_number
    )
  }

  const checkIfCurrentAddress = () => {
    return (
      currentDeliveryAddress.address &&
      currentDeliveryAddress.state &&
      currentDeliveryAddress.pincode &&
      currentDeliveryAddress.phone &&
      currentDeliveryAddress.alternate_mobile_number
    )
  }

  const handleOrderSubmit = async () => {
    if (!ordersArray || ordersArray.length === 0) {
      return
    }
    setLoading(true)
    try {
      const response = await client.post('/order/fastag/request-complete', {
        fromUserId: userId, // Agent's user ID
        toUserId: 1, // Admin user ID (default)
        fromUserType: 'agent', // User type (default is agent)
        toUserType: 'admin', // User type (default is admin)
        orders: ordersArray,
        deliveryAddress: currentDeliveryAddress
      })
      console.log(response, 'res')

      if (response.status === 201) {
        setTransactionId(response.data.transactionId)
        setOrderId(response.data.completeOrder.orderId)
        // setTotalValue(amountToBeDisplay)
        setIsOrderSuccess(true)
      }
    } catch (error) {
      console.error(
        'Error creating order:',
        error.response ? error.response.data : error.message
      )
      setIsOrderFailed(true)
    } finally {
      handleDeleteOrder()
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={{ flex: 1 }}>
          <OverlayHeader title="Saved Addresses" isOrderSection={false} />

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {addressArray?.map((address, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  checkIfAddressIsSame(address)
                    ? styles.selectedAddress
                    : styles.addressCard
                ]}
                onPress={() => handleAddressSelect(address)}
              >
                <Text style={styles.addressText}>{address.address}</Text>
                <Text style={styles.detailText}>
                  State: {address.state}, Pincode: {address.pincode}
                </Text>
                <Text style={styles.detailText}>
                  Phone: {address.phone}, Alternate:{' '}
                  {address.alternate_mobile_number}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            {checkIfCurrentAddress() ? (
              <LinearButton title="Proceed" onPress={handleOrderSubmit} />
            ) : (
              <LinearButton
                title="Add Delivery Address"
                onPress={handleSubmit}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <OrderSuccessModal
        visible={isOrderSuccess}
        onClose={setIsOrderSuccess}
        transactionId={transactionId}
        orderId={orderId}
        responseAmount={responseAmount}
        orders={ordersArray}
        totalOrderAmount={calculateTotalAmount(ordersArray)}
      />
      <OrderFaildModal visible={isOrderFailed} onClose={setIsOrderFailed} />
      <DeliveryAddressModal
        visible={deliveryAddressModal}
        onClose={() => setDeliveryAddressModal(false)}
        userId={userId}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  scrollContent: {
    padding: 20
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  selectedAddress: {
    borderColor: '#ff0000', // Red border for selected address
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  detailText: {
    fontSize: 14,
    color: '#555'
  },
  footer: {
    padding: 20
  }
})

export default OrderSavedAddresses
