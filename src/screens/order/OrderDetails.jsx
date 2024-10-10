import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import DisplayDetailsCard from '../../components/common/DisplayDetailsCard'
import HorizontalDivider from '../../components/common/HorizontalDivider'
import LinearButton from '../../components/common/LinearButton'
import AddBtn from '../../components/ui/AddBtn'
import VerticalDivider from '../../components/common/VerticalDivider'
import OrderSuccessModal from './OrderSuccessModal'
import OrderFaildModal from './OrderFaildModal'
import CreateOrderModal from './CreateOrderModal'
import { client } from '../../client/Axios'

// Import the context for orders
import { useOrders } from '../../orderContext/OrderContext'
import Loader from '../../components/ui/Loader'
import { getCache } from '../../helper/Storage'

const OrderDetails = (props) => {
  const [walletDetails, setWalletDetails] = useState([])
  const { ordersArray, setOrdersArray } = useOrders()
  const [loading, setLoading] = useState(false)

  const getWalletDetails = async () => {
    try {
      const response = await client.get(`/wallet/transactions/agent-get`)
      setWalletDetails(response.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  function calculateTotalAmount(ordersArray) {
    return ordersArray.reduce((total, order) => total + order.amount, 0)
  }

  const [totalOrderAmount, setTotalAmountCost] = useState(0)

  useEffect(() => {
    getWalletDetails()
    setTotalAmountCost(calculateTotalAmount(ordersArray))
  }, [ordersArray])

  const [createOrderModal, setCreateOrderModal] = useState(false)
  const [isOrderSuccess, setIsOrderSuccess] = useState(false)
  const [transactionId, setTransactionId] = useState('');
  const [userData, setUserData] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState(0);

  const handleDeleteOrder = () => {
    setOrdersArray([])
    setTotalAmountCost(0)
  }

  const getUserData = async () => {
    let userData = await getCache('userData')
    // console.log(userData.user.id, "here");
    setUserId(userData.user.id)
  }

  useEffect(() => {
    getUserData()
    console.log(userData, "here");
  }, [])

  let TransactionID, OrderID;

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await client.post('/order/fastag/request-complete', {
        fromUserId: userId, // Agent's user ID
        toUserId: 1, // Admin user ID (default)
        fromUserType: 'agent', // User type (default is agent)
        toUserType: 'admin', // User type (default is admin)
        orders: ordersArray
      })

      if (response.status === 201) {
        console.log('Order created successfully:', response.data)
        setTransactionId(response.data.transactionId);
        TransactionID = response.data.transactionId
        setOrderId(response.data.orderId);
        OrderID = response.data.orderId
        setOrdersArray([]);
        console.log(TransactionID, totalOrderAmount, OrderID, "in order creation");
      }
    } catch (error) {
      console.error(
        'Error creating order:',
        error.response ? error.response.data : error.message
      )
      // Handle error, e.g., show an error message to the user
    } finally {
      setLoading(false)
      setIsOrderSuccess(true);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <SafeAreaView style={{ flex: 1 }}>
        <OverlayHeader title={'Order Summary'} />
        <ScrollView style={{ flex: 1, padding: '5%' }}>
          <DisplayDetailsCard
            cardData={[
              {
                title: 'Available wallet balance',
                value: `: ₹${walletDetails?.agent?.balance || 0}`
              },
              {
                title: 'Order value',
                value: `: ₹${totalOrderAmount || 0}`
                // value: `: ₹0`
              },
              {
                title: 'Remaining Balance',
                value: `: ₹${
                  (walletDetails?.agent?.balance || 0) - (totalOrderAmount || 0)
                }`
                // value: `: ₹0`
              }
            ]}
          />

          <HorizontalDivider />
          {/* Render each order in the ordersArray dynamically */}
          {ordersArray && ordersArray.length > 0 ? (
            ordersArray.map((order, index) => (
              <View key={index}>
                {/* Order content */}
                <View style={styles.orderContainer}>
                  <View>
                    <Image
                      source={require('../../assets/screens/kotakLogo.png')}
                    />
                    <View style={styles.costQtyContainer}>
                      <Text style={styles.constAndQtyContainerText}>
                        Cost: {order.tagCost || 'N/A'}
                      </Text>
                      <VerticalDivider />
                      <Text style={styles.constAndQtyContainerText}>
                        Qty: {order.quantity || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.vcText}>
                      {order.vehicleClass || 'VC 4'}
                    </Text>
                    <Text style={[styles.amountText, { marginTop: '10%' }]}>
                      ₹{order.amount || 'N/A'}
                    </Text>
                  </View>
                </View>

                <HorizontalDivider />
              </View>
            ))
          ) : (
            <Text>No orders Yet</Text>
          )}
        </ScrollView>

        {/* Buttons */}
        <View
          style={{
            paddingHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <AddBtn title={'Add +'} onPress={() => setCreateOrderModal(true)} />
          <AddBtn title={'Cancel Order'} onPress={handleDeleteOrder} />
        </View>

        <View style={{ padding: '5%', paddingBottom: 20 }}>
          <LinearButton title={'Place order'} onPress={handleSubmit} />
        </View>

        <OrderSuccessModal
          visible={isOrderSuccess}
          onClose={setIsOrderSuccess}
        />
        {/* <OrderFaildModal /> */}
        <CreateOrderModal
          visible={createOrderModal}
          onClose={() => setCreateOrderModal(false)}
          transactionId={TransactionID}
          totalOrderAmount={totalOrderAmount}
          orderId={OrderID}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  constAndQtyContainerText: {
    color: '#848484',
    fontSize: 12,
    fontWeight: '400'
  },
  vcText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400'
  },
  amountText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600'
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#00000080',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    padding: '4%'
  },
  costQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%'
  }
})

export default OrderDetails
