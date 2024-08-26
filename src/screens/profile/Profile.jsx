import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import TagOfInput from '../../components/common/TagOfInput'
import CustomInputText from '../../components/common/CustomInputText'
import UploadDoc from '../../components/common/UploadDoc'
import Step2 from './Step2'
import LinearButton from '../../components/common/LinearButton'
import { client } from '../../client/Axios'
import { getCache } from '../../helper/Storage'
import { launchImageLibrary } from 'react-native-image-picker'
import InputText from '../../components/common/InputText'

const Profile = (props) => {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    agentId: userData?.id,
    name: '',
    email_id: userData?.email_id || '',
    mobile_number: userData?.mobile_number || '',
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
    // address_document_type :"",
    // address_document_number :"",
  })
  const [files, setFiles] = useState({
    pan_card_photo: null,
    id_proof_front_photo: null,
    id_proof_back_photo: null,
    profile_pic: null,
    pos_proof_photo: null
  })

  const formDataHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleFileUpload = (key, file) => {
    setFiles({ ...files, [key]: file })
  }

  const pickImage = (key) => {
    const options = {
      mediaType: 'photo'
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type
        }
        handleFileUpload(key, source)
      }
    })
  }

  const registerCompleteData = async () => {
    setLoading(true)
    const form = new FormData()

    for (const key in formData) {
      form.append(key, formData[key])
    }

    for (const key in files) {
      if (files[key]) {
        form.append(key, {
          uri: files[key].uri,
          name: files[key].name,
          type: files[key].type
        })
      }
    }

    try {
      const response = await client.post('/register/agent-complete', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => props.navigation?.navigate('Home') }
      ])
      console.log('response:', response)
    } catch (error) {
      Alert.alert('Error', 'Error creating agent', [{ text: 'OK' }])
      console.error('Error creating agent:', error)
    } finally {
      setLoading(false)
    }
  }

  const getUserdata = async () => {
    const data = await getCache('userData')
    setUserData(data?.user)
  }

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      agentId: userData?.id,
      email_id: userData?.email_id,
      mobile_number: userData?.mobile_number
    }))
  }, [userData])

  useEffect(() => {
    getUserdata()
  }, [userData?.user?.id])

  return (
    <SafeAreaView style={{ flex: 1, padding: '5%' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5%'
        }}
      >
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
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
            <View style={{  }}>
              <InputText
                placeholder="Enter Name"
                value={formData.name}
                onChangeText={(value) => formDataHandler('name', value)}
              />
            </View>
            <InputText
              placeholder="Enter Father’s Name"
              value={formData.father_name}
              onChangeText={(value) => formDataHandler('father_name', value)}
            />
            <View style={{ }}>
              <InputText
                placeholder="Enter Mother’s Name"
                value={formData.mother_name}
                onChangeText={(value) => formDataHandler('mother_name', value)}
              />
            </View>

            <TagOfInput text="ID Proof" />
            <InputText
              placeholder="Enter PAN card number"
              value={formData.pan_card_number}
              onChangeText={(value) =>
                formDataHandler('pan_card_number', value?.toUpperCase())
              }
            />

            <View style={{ }}>
              <TagOfInput text="PAN card photo" />
            </View>
            <View style={{ height: 150, width: '100%' }}>
              {files.pan_card_photo ? (
                <Pressable
                  onPress={() => setFiles({ ...files, pan_card_photo: null })}
                >
                  <Image
                    source={{ uri: files.pan_card_photo.uri }}
                    style={{ height: 150, width: '100%' }}
                  />
                </Pressable>
              ) : (
                <UploadDoc
                  text="Upload PAN card photo here"
                  setUploadFile={() => pickImage('pan_card_photo')}
                />
              )}
            </View>

            <View style={{  }}>
              <TagOfInput text="POS Proof" />
            </View>

            <InputText
              placeholder="Enter POS number"
              value={formData.pos_number}
              onChangeText={(value) => formDataHandler('pos_number', value)}
            />

            <View style={{ marginVertical: '5%' }}></View>
            <View style={{ height: 150, width: '100%' }}>
              {files.pos_proof_photo ? (
                <Pressable
                  onPress={() => setFiles({ ...files, pos_proof_photo: null })}
                >
                  <Image
                    source={{ uri: files.pos_proof_photo.uri }}
                    style={{ height: 150, width: '100%' }}
                  />
                </Pressable>
              ) : (
                <UploadDoc
                  text="Upload POS proof photo here"
                  setUploadFile={() => pickImage('pos_proof_photo')}
                />
              )}
            </View>

            <View style={{ marginTop: '5%' }}>
              <TagOfInput text="Upload profile pic" />
            </View>
            <View style={{ height: 150, width: '100%' }}>
              {files.profile_pic ? (
                <Pressable
                  onPress={() => setFiles({ ...files, profile_pic: null })}
                >
                  <Image
                    source={{ uri: files.profile_pic.uri }}
                    style={{ height: 150, width: '100%' }}
                  />
                </Pressable>
              ) : (
                <UploadDoc
                  text="Upload profile picture"
                  setUploadFile={() => pickImage('profile_pic')}
                />
              )}
            </View>
            <View
              style={{ alignSelf: 'center', marginTop: '5%', width: '100%' }}
            >
              <LinearButton title={'Step 2'} onPress={() => setStep(2)} />
            </View>
          </ScrollView>
        ) : (
          <Step2
            formDataHandler={formDataHandler}
            handleFileUpload={handleFileUpload}
            setFormData={setFormData}
            formData={formData}
            files={files}
            setFiles={setFiles}
            registerCompleteData={registerCompleteData}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '90%',
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
