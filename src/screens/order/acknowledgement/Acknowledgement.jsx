import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput ,
  Pressable,
  StyleSheet
} from 'react-native'
import React, { useState } from 'react'
import OverlayHeader from '../../../components/OverlayHeader'
import SearchBar from '../../../components/common/SearchBar'
import LinearButton from '../../../components/common/LinearButton'
import { RadioButton } from 'react-native-paper'
import HorizontalDivider from '../../../components/common/HorizontalDivider'
import AcknowlegementCard from './AcknowlegementCard'
import AckModal from './AckModal'
import AckFilter from './AckFilter'


const Acknowledgement = () => {
  const [ackModalData, setAckModalData] = useState({
    visible: false,
    isSuccess: true
  })
  const [searchText, setSearchText] = useState('')
  const [acknowledgementRadioCheck, setAcknowledgementRadioCheck] = useState('')
  const acknowledgementCheckboxData = ['Missing', 'Damaged', 'Received']
  const [showFilterModal, setShowFilterModal] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader title={'Acknowledgement'} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ padding: '5%', }}
        >
          <View style={styles.searchAndfilter}>
        <View style={styles.searchField}>
          <Image
            source={require('../../../assets/screens/wallet/searchLogo.png')}
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
          onPress={() => setShowFilterModal(true)}
          style={styles.filterLogo}
        >
          <Image source={require('../../../assets/screens/wallet/filter.png')} />
        </Pressable>
      </View>
      <View style={styles.divider}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#1A7E9D',
              borderRadius: 25,
              paddingHorizontal: '5%',
              paddingVertical: '2%'
            }}
          >
            {acknowledgementCheckboxData.map((data, index) => (
              <Pressable
                key={index}
                style={styles.radioButtonContainer}
                onPress={() => setAcknowledgementRadioCheck(data)}
              >
                <RadioButton
                  color={'#02546D'}
                  value={data}
                  status={
                    acknowledgementRadioCheck === data ? 'checked' : 'unchecked'
                  }
                />
                <Text style={styles.label}>{data}</Text>
              </Pressable>
            ))}
          </View>

          <HorizontalDivider />

          {Array.from({ length: 5 }).map((_, index) => (
            <AcknowlegementCard key={index} />
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: '5%', paddingBottom: 20 }}>
        <LinearButton
          title={'Submit'}
          onPress={() =>
            setAckModalData({
              visible: true,
              isSuccess: true
            })
          }
        />
      </View>
      <AckFilter
      visible={showFilterModal}
      onClose={() => setShowFilterModal(false)}
      />
      {/* success modal */}
      <AckModal
        isSuccess={ackModalData.isSuccess}
        title={'Tag acknowledged successfully'}
        visible={ackModalData.visible}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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
    justifyContent: 'center',
    gap: 10
  },
  searchIcon: {
    width: 20,
    height: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#9A9A9A',
    color: '#9A9A9A',
    backgroundColor:'white'
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
    height: .5,
    backgroundColor: '#9A9A9A',
    marginVertical: '5%'
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
  label: {
    fontSize: 16,
    color: '#000000'
  }
})

export default Acknowledgement
