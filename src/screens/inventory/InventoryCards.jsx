import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import VerticalDivider from '../../components/common/VerticalDivider'

const InventoryCards = ({ data }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          padding: '4%',
          borderRadius: 10
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: `${data.color}`,
              borderRadius: 50,
              marginRight: '5%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              width: 30
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 19
              }}
            >
              {data.number}
            </Text>
          </View>
          <View>
            <Text style={styles.idText}>607469-00B-258445</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>{'20:19:36'}</Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>{'16-03-2024'}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.amount}>₹50</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: '5%'
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Image source={require('../../assets/bankIcon.png')} />
            <Text style={styles.bankText}>KOTAK</Text>
          </View>
          <Text style={styles.orderIdText}>ORFID-998754631</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              backgroundColor: '#00C142',
              padding: '5%',
              borderRadius: 20,
              height: 5,
              width: 5
            }}
          ></View>
          <Text style={styles.stockText}>In Stock</Text>
        </View>
      </View>
      <View
        style={{ height: '0.3%', width: '100%', backgroundColor: '#959595' }}
      ></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '4%'
        }}
      >
        <Text style={styles.vcText}>VC-4</Text>
        <Image source={require('../../assets/eyeIcon.png')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    borderWidth: 0.7,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: '5%'
  },
  dateAndTimeText: {
    color: '#848484',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14
  },
  idText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16
  },
  amount: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24
  },
  bankText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: '5%'
  },
  orderIdText: {
    color: '#F0AC5C',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    marginTop: '10%'
  },
  stockText: {
    color: '#00C142',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    marginLeft: '5%'
  },
  vcText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19
  }
})

export default InventoryCards
