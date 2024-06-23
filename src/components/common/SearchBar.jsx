import {
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet
} from 'react-native'
import React from 'react'

const SearchBar = ({ setShowInventoryModal }) => {
  return (
    <>
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
            value={''}
            // onChangeText={}
          />
        </View>
        <Pressable
          onPress={() => setShowInventoryModal(true)}
          style={styles.filterLogo}
        >
          <Image source={require('../../assets/screens/wallet/filter.png')} />
        </Pressable>
      </View>
      <View style={styles.divider}></View>
    </>
  )
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    gap: 10
  },
  searchIcon: {
    width: 20,
    height: 20
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#9A9A9A',
    color: '#9A9A9A'
  },
  filterLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#9A9A9A',
    marginTop: '5%'
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
    marginVertical: '5%'
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
})

export default SearchBar
