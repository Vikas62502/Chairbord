import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';
import { client } from '../../client/Axios';
import useUserData from '../../hooks/useUserData';

interface RegistrationFormDataType {
  mobileNumber: string;
  panNumber: string;
  customerName: string;
  dob: string;
  vehicleNumber: string;
  panImage: any
}

const SbiFastagRegistration = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { userData }: any = useUserData();
  const [RegistrationFormData, setRegistrationFormData] = useState<RegistrationFormDataType>({
    mobileNumber: "",
    panNumber: "",
    customerName: "",
    dob: "",
    vehicleNumber: "",
    panImage: null
  });

  // Handler to update form data
  const handleInputChange = (name: keyof RegistrationFormDataType, value: string) => {
    setRegistrationFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned?.length > 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned?.length > 5) {
      cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5);
    }
    if (cleaned?.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    setRegistrationFormData({
      ...RegistrationFormData,
      dob: cleaned
    })
  };

  // validation test
  const isFormComplete = Object.values(RegistrationFormData).every((field) => field !== "" && field !== null);

  const handleGetVehcileDetails = async () => {
    setLoading(true);

    // Create a new FormData instance
    const formData = new FormData();

    // Append each field to formData
    formData.append('mobileNo', RegistrationFormData.mobileNumber);
    formData.append('panNumber', RegistrationFormData.panNumber);
    formData.append('name', RegistrationFormData.customerName);
    formData.append('dob', RegistrationFormData.dob);
    formData.append('vehicleNumber', RegistrationFormData.vehicleNumber);
    formData.append('pan-image', RegistrationFormData.panImage);
    formData.append('agentId', userData.user.id)


    try {
      // Send formData using Axios
      const res: any = await client.post('/sbi/validate-rc-pan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res?.data.customer, "customer data");
      console.log(res.data.vehicleDetails, "vehicle details")
      console.log(res.data.reportData, "reports data")
      // Navigate with vehicle and customer details
      props.navigation.navigate('sbi2', {
        vehicleDetails: res?.data?.vehicleDetails,
        customerDetails: RegistrationFormData,
        customer: res?.data.customer,
        reportsData: res.data.reportData
      });
    } catch (error: any) {
      console.log(error.response);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
      <OverlayHeaderSbi title={'SBI FASTag Registration'} />
      {loading && (
        <View >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Customer details</Text>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/telephone.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi
            placeholder="Enter mobile number"
            value={RegistrationFormData.mobileNumber}
            onChangeText={(value) => handleInputChange("mobileNumber", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/info.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi
            placeholder="Enter pan number"
            value={RegistrationFormData.panNumber}
            onChangeText={(value) => handleInputChange("panNumber", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/user.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi
            placeholder="Enter name (Pan Holder)"
            value={RegistrationFormData.customerName}
            onChangeText={(value) => handleInputChange("customerName", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/calendar.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi
            placeholder="DD/MM/YYYY"
            value={RegistrationFormData.dob}
            onChangeText={handleDateChange}
          />
        </View>

      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Vehicle details</Text>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/vehicle.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi
            placeholder="Enter vehicle number"
            value={RegistrationFormData.vehicleNumber}
            onChangeText={(value) => handleInputChange("vehicleNumber", value)}
          />
        </View>
      </View>

      <View style={{ margin: 20 }}>
        <View style={styles.uploadContainer}>
          <UploadDoc
            text="Upload Pan Card"
            uploadDoc={true}
            setUploadFile={(value: any) => setRegistrationFormData({ ...RegistrationFormData, panImage: value })}
          />
          {RegistrationFormData.panImage && (
            <TouchableOpacity onPress={() => setRegistrationFormData({ ...RegistrationFormData, panImage: null })}>
              <Image
                source={{ uri: RegistrationFormData.panImage.uri }}
                style={{ height: 180, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <NextButton title="Next" onPress={handleGetVehcileDetails} disabled={!isFormComplete || loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  uploadContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    height: 200,
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
});

export default SbiFastagRegistration;
