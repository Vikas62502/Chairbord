import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import TagOfInput from '../../components/common/TagOfInput'
import CustomInputText from '../../components/common/CustomInputText'
import UploadDoc from '../../components/common/UploadDoc'
import SecondaryButton from '../../components/common/SecondaryButton'
import Step2 from './Step2'
import LinearButton from '../../components/common/LinearButton'

const Profile = () => {
  const [step, setStep] = useState(1)
  return (
    <SafeAreaView style={{ flex: 1, padding: '5%' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5%'
        }}
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabSection, step === 1 && styles.activeState]}
            onPress={() => setStep(1)}
          >
            <Text
              style={[styles.tabContent, step === 1 && styles.activeContent]}
            >
              Step 1
            </Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity
            onPress={() => setStep(2)}
            style={[styles.tabSection, step === 2 && styles.activeState]}
          >
            <Text
              style={[styles.tabContent, step === 2 && styles.activeContent]}
            >
              Step 2
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {step === 1 ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TagOfInput text="Personal Information" />

            <CustomInputText
              placeholder="Enter Father’s Name"
              value=""
              onChangeText={() => {}}
            />
            <View style={{ marginVertical: '5%' }}>
              <CustomInputText
                placeholder="Enter Mother’s Name"
                value=""
                onChangeText={() => {}}
              />
            </View>

            <TagOfInput text="ID Proof" />
            {/* <View style={{ marginTop: '5%' }}> */}
            <CustomInputText
              placeholder="Enter PAN card number"
              value=""
              onChangeText={() => {}}
            />

            <View style={{ marginTop: '5%' }}>
              <TagOfInput text="PAN card photo" />
            </View>
            <UploadDoc text="Upload PAN card photo" />

            <View style={{ marginTop: '5%' }}>
              <TagOfInput text="POS Proof" />
            </View>

            <CustomInputText
              placeholder="Enter POS number"
              value=""
              onChangeText={() => {}}
            />

            <View style={{ marginVertical: '5%' }}></View>
            <UploadDoc text="Upload POS proof photo here" />

            <View
              style={{ alignSelf: 'center', marginTop: '5%', width: '100%' }}
            >
              <LinearButton title={'Submit'} onPress={() => setStep(2)} />
            </View>
          </ScrollView>
        ) : (
          <Step2 />
        )}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '90 %',
    marginTop: 20
  },
  tabSection: {
    width: '50%'
  },
  activeState: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2
  },
  activeContent: {
    color: '#000000'
  },
  verticalDivider: {
    height: '100%',
    width: 2,
    backgroundColor: '#CCCCCC'
  },
  text: {
    color: '#263238',
    margin: '5%',
    textAlign: 'center'
  },
  tabContent: {
    alignSelf: 'center',
    color: '#807C7C'
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 300
  }
})

export default Profile
