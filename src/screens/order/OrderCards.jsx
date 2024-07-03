import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import VerticalDivider from '../../components/common/VerticalDivider'
import Status from '../../components/common/Status'

const OrderCards = ({ data, key }) => {
  return (
    <View style={styles.cardContainer} key={key}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.IdText}>{data.id}</Text>
          </View>
          <Text style={styles.amountText}>{data.amount}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.IdText}>{data.transactionId}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.dateAndTimeText}>{data.time}</Text>
            <VerticalDivider />
            <Text style={styles.dateAndTimeText}>{data.date}</Text>
          </View>
          <Status status={data.status} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
     rginBottom: 15,
    elevation: 2,
    shadowColor: '#00000040',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '3%'
  },
  dateAndTimeText: {
    color: '#848484',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  IdText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600'
  },
  orderNumberText: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400'
  },
  amountText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000000'
  }
})

export default OrderCards
