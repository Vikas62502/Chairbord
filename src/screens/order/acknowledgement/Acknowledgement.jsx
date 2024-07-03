import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
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

const Acknowledgement = () => {
  const [ackModalData, setAckModalData] = useState({
    visible: false,
    isSuccess: true
  })
  const [acknowledgementRadioCheck, setAcknowledgementRadioCheck] = useState('')
  const acknowledgementCheckboxData = ['Missing', 'Damaged', 'Received']

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader title={'Acknowledgement'} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ padding: '5%', flex: 1, justifyContent: 'space-between' }}
        >
          <SearchBar />

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
  label: {
    fontSize: 16,
    color: '#000000'
  }
})

export default Acknowledgement
