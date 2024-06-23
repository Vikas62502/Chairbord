import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import OrderCards from '../order/OrderCards'
import InventoryCards from './InventoryCards'
import inventoryCardData from './InventoryCardData'
import LinearGradient from 'react-native-linear-gradient'
import InventoryFilterModal from './InventoryFilterModal'

const Inventory = () => {
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: '5%' }}>
        <SearchBar setShowInventoryModal={setShowInventoryModal} />

        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text style={styles.titleText}>Inventory</Text>
            </View>
            <Pressable
            // style={styles.excelButton}
            // onPress={() => setCreateOrderModal(true)}
            >
              <LinearGradient
                colors={['#02546D', '#142D40']}
                style={styles.excelButton}
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
              </LinearGradient>
            </Pressable>
          </View>
        </View>
        <View style={{ marginTop: '4%' }}>
          {inventoryCardData.map((data, index) => (
            <Pressable
              //  onPress={() => setDataShowModal(true)}
              key={index}
            >
              <InventoryCards data={data} />
            </Pressable>
          ))}
          {/* {orderCardData.map((data, index) => (
            <Pressable onPress={() => setDataShowModal(true)} key={index}>
              <OrderCards key={index} data={data} />
            </Pressable>
          ))} */}
        </View>
      </View>

      {/* Filter modal */}
      <InventoryFilterModal
        visible={showInventoryModal}
        onClose={() => setShowInventoryModal(false)}
      />
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
    color: 'white',
    paddingVertical: '10%',
    paddingHorizontal: '7%',
    borderRadius: 12
  }
}

export default Inventory
