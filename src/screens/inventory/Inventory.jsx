import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import SearchBar from '../../components/common/SearchBar'
import OrderCards from '../order/OrderCards'
import InventoryCards from './InventoryCards'
import inventoryCardData from './InventoryCardData'

const Inventory = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: '5%' }}>
        <SearchBar />

        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text style={styles.titleText}>Inventory</Text>
            </View>
            <Pressable
              style={styles.excelButton}
              // onPress={() => setCreateOrderModal(true)}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  lineHeight: 19,
                  color: '#FFFFFF'
                }}
              >
                Excel
              </Text>
              <Image
                source={require('../../assets/addIcon.png')}
                style={{ marginLeft: '5%' }}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ marginTop: '4%' }}>
          {inventoryCardData.map((data, index) => (
            <Pressable
              //  onPress={() => setDataShowModal(true)}
              key={index}
            >
              <InventoryCards key={index} data={data} />
            </Pressable>
          ))}
          {/* {orderCardData.map((data, index) => (
            <Pressable onPress={() => setDataShowModal(true)} key={index}>
              <OrderCards key={index} data={data} />
            </Pressable>
          ))} */}
        </View>
        <Text style={{ color: 'red' }}>Inventory</Text>
      </View>
    </ScrollView>
  )
}

const styles = {
  container: {
    flex: 1
  },
  titleText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 20
  },
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#263238',
    color: 'white',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 12
  }
}

export default Inventory
