import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Status from '../../../components/common/Status'
import HorizontalDivider from '../../../components/common/HorizontalDivider'
import { RadioButton } from 'react-native-paper'

const AcknowlegementCard = () => {
  const [acknowledgementRadioCheck, setAcknowledgementRadioCheck] = useState('')
  const acknowledgementCheckboxData = ['Missing', 'Damaged', 'Received']
  const kotakLogo = require('../../../assets/screens/kotakLogo.png')
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: '#00000080',
        borderRadius: 20,
        padding: '5%',
        marginBottom: '5%'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
          <Image source={kotakLogo} />
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: '#000000',
              marginVertical: '5%'
            }}
          >
            ORFID-998754631
          </Text>
        </View>
        <View>
          <Status status={'new'} />
        </View>
      </View>

      <HorizontalDivider />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
    </View>
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

export default AcknowlegementCard
