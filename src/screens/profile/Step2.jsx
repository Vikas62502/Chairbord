import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Image
} from 'react-native'
import React from 'react'
import TagOfInput from '../../components/common/TagOfInput'
import CustomInputText from '../../components/common/CustomInputText'
import UploadDoc from '../../components/common/UploadDoc'
import SelectField from '../../components/common/SelectField'
import LinearButton from '../../components/common/LinearButton'

const Step2 = ({
  formData,
  formDataHandler,
  handleFileUpload,
  files,
  setFormData,
  setFiles
}) => {
  console.log(formData, 'formData')
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TagOfInput text="Address Detail" />
      <CustomInputText
        placeholder="Enter address"
        value={formData.address}
        onChangeText={(value) => formDataHandler('address', value)}
      />
      <View style={{ marginVertical: '5%' }}>
        <CustomInputText
          placeholder="Enter address line 2"
          value={formData.address2}
          onChangeText={(value) => formDataHandler('address2', value)}
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
            value={formData.pincode}
            onChangeText={(value) => formDataHandler('pincode', value)}
          />
        </View>
        <View style={{ width: '48%' }}>
          <CustomInputText
            placeholder="City"
            value={formData.city}
            onChangeText={(value) => formDataHandler('city', value)}
          />
        </View>
      </View>
      <View style={{ marginVertical: '5%' }}>
        <CustomInputText
          placeholder="Enter state"
          value={formData.state}
          onChangeText={(value) => formDataHandler('state', value)}
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
        selectedValue={(value) => {
          formDataHandler('id_proof_document_type', value?.id)
        }}
      />
      <View style={{ marginTop: '5%' }}>
        <CustomInputText
          placeholder="Enter document number"
          value={formData.document_number}
          onChangeText={(value) => formDataHandler('id_proof_document_number', value)}
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
        <View style={{ height: 150, width: '45%' }}>
          {files.id_proof_front_photo ? (
            <Pressable
              onPress={() => setFiles({ ...files, id_proof_front_photo: null })}
            >
              <Image
                source={{ uri: files.id_proof_front_photo }}
                style={{ height: 150, width: '100%' }}
              />
            </Pressable>
          ) : (
            <UploadDoc
              text="Upload ID proof photo (front)"
              setUploadFile={(file) =>
                handleFileUpload('id_proof_front_photo', file)
              }
            />
          )}
        </View>
        <View style={{ height: 150, width: '45%' }}>
          {files.id_proof_back_photo ? (
            <Pressable
              onPress={() => setFiles({ ...files, id_proof_back_photo: null })}
            >
              <Image
                source={{ uri: files.id_proof_back_photo }}
                style={{ height: 150, width: '100%' }}
              />
            </Pressable>
          ) : (
            <UploadDoc
              text="Upload ID proof photo (back)"
              setUploadFile={(file) =>
                handleFileUpload('id_proof_back_photo', file)
              }
            />
          )}
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
