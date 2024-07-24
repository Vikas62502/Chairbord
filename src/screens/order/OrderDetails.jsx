import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import DisplayDetailsCard from '../../components/common/DisplayDetailsCard'
import HorizontalDivider from '../../components/common/HorizontalDivider'
import LinearButton from '../../components/common/LinearButton'
import AddBtn from '../../components/ui/AddBtn'
import VerticalDivider from '../../components/common/VerticalDivider'
import OrderSuccessModal from './OrderSuccessModal'
import OrderFaildModal from './OrderFaildModal'

const customerDetailsData = [
  {
    title: 'Available wallet balance',
    value: ':  ₹200.00'
  },
  {
    title: 'Order value',
    value: ':  ₹1200.00'
  },
  {
    title: 'Remaining Balance',
    value: ':  ₹00.00'
  }
]

const OrderDetails = () => {
  const [isOrderSuccess, setIsOrderSuccess] = React.useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader title={'Order Summary'} />
      <ScrollView style={{ flex: 1, padding: '5%' }}>
        <DisplayDetailsCard cardData={customerDetailsData} />

        <HorizontalDivider />

        {/* content */}
        <View
          style={{
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
          }}
        >
          <View>
            <Image source={require('../../assets/screens/kotakLogo.png')} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10%'
              }}
            >
              <Text style={styles.constAndQtyContainerText}>Cost: 20</Text>
              <VerticalDivider />
              <Text style={styles.constAndQtyContainerText}>Qty: 20</Text>
            </View>
          </View>

          <View>
            <Text style={styles.vcText}>VC-4</Text>
            <Text style={[styles.amountText, { marginTop: '10%' }]}>₹400</Text>
          </View>
        </View>
      </ScrollView>

      {/* buttons */}
      <View style={{ paddingHorizontal: '5%' }}>
        <AddBtn title={'Add +'} />
      </View>
      <View style={{ padding: '5%', paddingBottom: 20 }}>
        <LinearButton
          title={'Place order'}
          onPress={() => setIsOrderSuccess(true)}
        />
      </View>

      <OrderSuccessModal visible={isOrderSuccess} onClose={setIsOrderSuccess} />
      <OrderFaildModal />
    </SafeAreaView>
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
  }
})

export default OrderDetails
