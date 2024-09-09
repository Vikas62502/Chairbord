import { View, Text, ScrollView,RefreshControl, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import InventoryCards from './InventoryCards'
import LinearGradient from 'react-native-linear-gradient'
import InventoryFilterModal from './InventoryFilterModal'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import ExcelButton from '../../components/ui/ExcelButton'

const Inventory = () => {
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [inventoryCardData, setInventoryCardData] = useState([])
  const [userData, setUserData] = useState()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getWalletDetails();
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setRefreshing(false);
    }
  };
  const getUserData = async () => {
    let userData = await getCache('userData')
    setUserData(userData, 'userData')
  }

  const getInventory = async (userId) => {
    try {
      const response = await client.get(`/inventory/fastag/agent/${userId}`)
      // console.log(response?.data?.data, 'res')
      setInventoryCardData(response?.data?.data)
      // console.log(response, 'response')
    } catch (error) {
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (userData) {
      getInventory(userData?.user?.id)
    }
  }, [userData])

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={{ padding: '5%' }}>
        <SearchBar setShowInventoryModal={setShowInventoryModal} />

        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}
          >
            <View>
              <Text style={styles.titleText}>Inventory</Text>
            </View>
            <ExcelButton title={"Excel"} style={{justifyContent:'center', padding:10}} />
          </View>
        </View>
        <View style={{ marginTop: '4%' }}>
          {inventoryCardData &&
            inventoryCardData?.map((data, index) => (
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
