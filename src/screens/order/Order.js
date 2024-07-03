import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import OrderCards from './OrderCards'
import CreateOrderModal from './CreateOrderModal'
import ExcelButton from '../../components/ui/ExcelButton'

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
  return (
    <ScrollView style={styles.container}>
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
            <ExcelButton title={"Create order"} onpressOperation={() => setCreateOrderModal(true)} />
            <ExcelButton title={"Create return"} />

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


      <CreateOrderModal
        visible={createOrderModal}
        onClose={() => setCreateOrderModal(false)}
      />


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
