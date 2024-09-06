import { View, Text, StyleSheet, ScrollView, Image,RefreshControl, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderCards from './OrderCards'
import CreateOrderModal from './CreateOrderModal'
import ExcelButton from '../../components/ui/ExcelButton'
import CreateReturnModal from '../return/CreateReturnModal'
import CreateButton from '../../components/ui/CreateButton'
import OrderFilter from './OrderFilter'

const orderCardData = [
  {
    id: "TRR:8844851",
    date: "16-03-2024",
    time: "20:19:36",
    amount: "₹200",
    status: "pending"
  },
  {
    id: "TRR:8844851",
    date: "16-03-2024",
    time: "20:19:36",
    amount: "₹800",
    status: "return"
  },
  {
    id: "TRR:8844851",
    date: "16-03-2024",
    time: "20:19:36",
    amount: "₹400",
    status: "confirm"
  },
  {
    id: "TRR:8844851",
    date: "16-03-2024",
    time: "20:19:36",
    amount: "₹1200",
    status: "pending"
  },
  {
    id: "TRR:8844851",
    date: "16-03-2024",
    time: "20:19:36",
    amount: "₹400",
    status: "acknowledge"
  },
]

const Order = (props) => {
  const [searchText, setSearchText] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [createReturnModal, setCreateReturnModal] = useState(false);
  const [userData, setUserData] = useState()
  console.log(userData, 'userData')
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getUserData();
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setRefreshing(false);
    }
  };

  const getUserData = async () => {
    let userData = await getCache('userData')
    setUserData(userData)
  }


  const getAllFastagByAgent = async () => {
    try {
      const response = await client.get(`/inventory/fastag/agent/${userData?.user?.id}`)
      setInventoryCardData(response?.data?.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }


  useEffect(() => {
    getUserData()
  }, [])

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={{ padding: "5%" }}>
        <View style={styles.searchAndfilter}>
          <View style={styles.searchField}>
            <Image
              source={require('../../assets/screens/wallet/searchLogo.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={'#9A9A9A'}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <Pressable
            onPress={() => setShowFilterModal(true)}
            style={styles.filterLogo}
          >
            <Image source={require('../../assets/screens/wallet/filter.png')} />
          </Pressable>
        </View>
        <View style={styles.divider}></View>

        <View >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View >
              <Text style={styles.titleText}>Order history</Text>
            </View>
            <CreateButton title={"Create order"} onpressOperation={() => setCreateOrderModal(!createOrderModal)} />
            <CreateButton title={"Create return"} onpressOperation={() => setCreateReturnModal(!createReturnModal)} />

          </View>
        </View>

        <View style={{ marginTop: "4%" }}>
          {orderCardData.map((data, index) => (
            <Pressable onPress={() => props.navigation.navigate("orderDescription")} key={index}>
              <OrderCards
                data={data}
              />
            </Pressable>
          ))}
        </View>
      </View>


      {/* filter modal */}
      {/* <RequestFilter
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      /> */}

<OrderFilter
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
      <CreateOrderModal
        visible={createOrderModal}
        onClose={() => setCreateOrderModal(false)}
      />

      <CreateReturnModal
        visible={createReturnModal}
        onClose={() => setCreateReturnModal(false)}
      />


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 20,
  },
  searchAndfilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    gap: 20,
    marginTop: '5%'
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#858585',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000'
  },
  filterLogo: {
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 50,
    padding: 15
  },
  divider: {
    height: 0.7,
    backgroundColor: '#4C6470',
    marginVertical: "5%"
  },
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "#263238",
    color: "white",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    borderRadius: 12,
  }
});


export default Order
