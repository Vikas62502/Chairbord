import { View, ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import TagOfInput from '../../components/common/TagOfInput'
import CustomInputText from '../../components/common/CustomInputText'
import UploadDoc from '../../components/common/UploadDoc'
import SelectField from '../../components/common/SelectField'
import LinearButton from '../../components/common/LinearButton'

const Step2 = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TagOfInput text="Address Detail" />
      <CustomInputText
        placeholder="Enter address"
        value=""
        onChangeText={() => {}}
      />
      <View style={{ marginVertical: '5%' }}>
        <CustomInputText
          placeholder="Enter address"
          value=""
          onChangeText={() => {}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ width: '48%' }}>
          <CustomInputText
            placeholder="Pincode"
            value=""
            onChangeText={() => {}}
          />
        </View>
        <View style={{ width: '48%' }}>
          <CustomInputText
            placeholder="City"
            value=""
            onChangeText={() => {}}
          />
        </View>
      </View>
      <View style={{ marginVertical: '5%' }}>
        <CustomInputText
          placeholder="Enter state"
          value=""
          onChangeText={() => {}}
        />
      </View>
      <TagOfInput text="Document type" />

      <SelectField
        dataToRender={[
          { title: 'Aadhar Card', id: 1 },
          { title: 'Voter ID', id: 2 },
          { title: 'Passport', id: 3 }
        ]}
        title="Select document type"
      />
      <View style={{ marginTop: '5%' }}>
        <CustomInputText
          placeholder="Enter document number"
          value=""
          onChangeText={() => {}}
        />
      </View>

      <View style={{ marginTop: '5%' }}>
        <TagOfInput text="ID Proof" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: '20%',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ height: '500%', width: '45%' }}>
          <UploadDoc text="Upload ID (front)" />
        </View>
        <View style={{ height: '500%', width: '45%' }}>
          <UploadDoc text="Upload ID proof photo (back)" />
        </View>
      </View>

      <View>
        <Text
          style={{
            color: '#000000',
            fontWeight: '500',
            fontSize: 16,
            alignSelf: 'center',
            marginTop: '5%'
          }}
        >
          I hereby accept all the{' '}
          <Text
            style={{
              color: '#0083FD',
              fontWeight: '500',
              fontSize: 16,
              alignSelf: 'center',
              marginTop: '5%'
            }}
          >
            terms & conditions.
          </Text>
        </Text>
      </View>

      <View style={{ alignSelf: 'center', marginTop: '5%', width: '100%' }}>
        <LinearButton title={'Submit'} onPress={() => setStep(2)} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 200
  }
})

export default Step2
