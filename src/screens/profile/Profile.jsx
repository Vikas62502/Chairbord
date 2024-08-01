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
import Step2 from './Step2'
import LinearButton from '../../components/common/LinearButton'

const Profile = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email_id: '',
    mobile_number: '',
    father_name: '',
    mother_name: '',
    contact_person_name: '',
    contact_person_mobile_number: '',
    relationship_status: '',
    address: '',
    pincode: '',
    city: '',
    address2: '',
    state: '',
    pan_card_number: '',
    id_proof_document_type: '',
    id_proof_document_number: '',
    pos_number: ''
  })
  const [files, setFiles] = useState({
    pan_card_photo: null,
    id_proof_front_photo: null,
    id_proof_back_photo: null,
    profile_pic: null,
    pos_proof_photo: null
  })
  console.log(files, 'formData')

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }
  const handleFileUpload = (key, file) => {
    setFiles({ ...files, [key]: file })
  }

  const registerCompleteData = async () => {
    // api call to save data
  }
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
            <View style={{ marginVertical: '5%' }}>
              <CustomInputText
                placeholder="Enter Name"
                value={formData.name}
                onChangeText={(value) => formDataHandler('name', value)}
              />
            </View>
            <CustomInputText
              placeholder="Enter Father’s Name"
              value={formData.father_name}
              onChangeText={(value) => formDataHandler('father_name', value)}
            />
            <View style={{ marginVertical: '5%' }}>
              <CustomInputText
                placeholder="Enter Mother’s Name"
                value={formData.mother_name}
                onChangeText={(value) => formDataHandler('mother_name', value)}
              />
            </View>

            <TagOfInput text="ID Proof" />
            {/* <View style={{ marginTop: '5%' }}> */}
            <CustomInputText
              placeholder="Enter PAN card number"
              value={formData.pan_card_number}
              onChangeText={(value) =>
                formDataHandler('pan_card_number', value)
              }
            />

            <View style={{ marginTop: '5%' }}>
              <TagOfInput text="PAN card photo" />
            </View>
            <View style={{ height: 150, width: '100%' }}>
              <UploadDoc
                text="Upload PAN card photo"
                setUploadFile={setFiles}
              />
            </View>

            <View style={{ marginTop: '5%' }}>
              <TagOfInput text="POS Proof" />
            </View>

            <CustomInputText
              placeholder="Enter POS number"
              value={formData.pos_number}
              onChangeText={(value) => formDataHandler('pos_number', value)}
            />

            <View style={{ marginVertical: '5%' }}></View>
            <View style={{ height: 150, width: '100%' }}>
              <UploadDoc
                text="Upload POS proof photo here"
                setUploadFile={(file) =>
                  handleFileUpload('pos_proof_photo', file)
                }
              />
            </View>
            <View
              style={{ alignSelf: 'center', marginTop: '5%', width: '100%' }}
            >
              <LinearButton title={'Submit'} onPress={() => setStep(2)} />
            </View>
          </ScrollView>
        ) : (
          <Step2
            formDataHandler={formDataHandler}
            handleFileUpload={handleFileUpload}
            setFormData={setFormData}
            formData={formData}
          />
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
