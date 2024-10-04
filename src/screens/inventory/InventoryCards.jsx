import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import VerticalDivider from '../../components/common/VerticalDivider'

const InventoryCards = ({ data }) => {
  console.log(data, 'Inventory card data');
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
              {data?.vc_no}
            </Text>
          </View>
          <View>
            <Text style={styles.idText}>{data?.Tag_sr_no}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:2}}>
              <Text style={styles.dateAndTimeText}>{data.time}</Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>{data.date}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.amount}>₹{data.amount}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '5%'
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Image source={require('../../assets/bankIcon.png')} style={{width:24,height:22}}/>
            <Text style={styles.bankText}>{data.bankName}</Text>
          </View>
          <Text style={styles.orderIdText}>{data.orderId}</Text>
        </View>
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',

            gap:10,
            
          }}
        >
          <View style={{flexDirection: 'row',alignItems: 'center',gap:5,}}>
          <View
            style={{
              backgroundColor: data.inStock ? '#00C142' : '#FF0000' ,
              borderRadius: 20,
              height: 6,
              width: 6,
            }}
          ></View>
           <Text style={[styles.stockText, { color: data.inStock ? '#00C142' : '#FF0000' }]}>
            {data.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
          </View>
          <Text style={styles.vcText}>{data.vehicleClass}</Text>
        </View>

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
    lineHeight: 14,
    marginBottom:-4
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
   
  },
  vcText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
   
   
  }
})

export default InventoryCards
