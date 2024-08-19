import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import SelectFieldSmall from '../../components/common/SelectFieldSmall'
import { IssuanceTrackerData, bankName } from './IssuanceTrackerData'
import ExcelButton from '../../components/ui/ExcelButton'
import IssuanceCards from './IssuanceCards'

const IssuanceTracker = () => {
  const [showIssuanceModal, setShowIssuanceModal] = useState(false)
  return (
    <ScrollView>
      <View style={{ padding: '5%' }}>
        <SearchBar setShowInventoryModal={setShowIssuanceModal} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ width: '65%' ,marginEnd: "5%" }}>
            <SelectFieldSmall title={'Select Bank'} dataToRender={bankName} />
          </View>
          <ExcelButton title={"Excel"} style={{justifyContent:'center', padding:10}} />
        </View>

        <View style={{ marginTop: '5%' }}>
          {IssuanceTrackerData.map((data, index) => (
            <IssuanceCards key={index} data={data} />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default IssuanceTracker
