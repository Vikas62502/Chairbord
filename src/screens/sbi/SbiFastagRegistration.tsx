import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';
import SelectFieldSbi from './SelectFieldSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';

const SbiFastagRegistration = (props: any) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [selectedVC, setSelectedVC] = useState(null);
  const [selectedCS, setSelectedCS] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true); // Manage button disabled state

  // Data for the dropdowns
  const vcData = [
    { title: 'VC 4' },
    { title: 'VC 5' },
    { title: 'VC 7' },
  ];

  const csData = [
    { title: 'True' },
    { title: 'False' },
  ];

  // Check if all fields are filled to enable/disable the button
  useEffect(() => {
    if (
      mobileNumber !== '' &&
      panNumber !== '' &&
      name !== '' &&
      dob !== '' &&
      vehicleNumber !== '' &&
      selectedVC !== null &&
      selectedCS !== null
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [mobileNumber, panNumber, name, dob, vehicleNumber, selectedVC, selectedCS]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
      <OverlayHeaderSbi title={'SBI FASTag Registration'} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Customer details</Text>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/telephone.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi placeholder={"Enter mobile number"} value={mobileNumber} onChangeText={setMobileNumber} />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/info.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi placeholder={"Enter pan number"} value={panNumber} onChangeText={setPanNumber} />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/user.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi placeholder={"Enter name (Pan Holder)"} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/calendar.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi placeholder={"Enter D.O.B"} value={dob} onChangeText={setDob} />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Vehicle details</Text>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/vehicle.png')} style={{ width: 40, height: 40 }} />
          <InputTextSbi placeholder={"Enter vehicle number"} value={vehicleNumber} onChangeText={setVehicleNumber} />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/sbi/info.png')} style={{ width: 40, height: 40 }} />
          <View style={{ width: '37%', marginVertical: 15 }}>
            <SelectFieldSbi
              dataToRender={vcData}
              title={'VC'}
              selectedValue={setSelectedVC}
              borderColor={selectedVC ? '#0A74DA' : '#D3D3D3'}
            />
          </View>
          <View style={{ width: '37%', marginVertical: 15 }}>
            <SelectFieldSbi
              dataToRender={csData}
              title={'CS'}
              selectedValue={setSelectedCS}
              borderColor={selectedCS ? '#0A74DA' : '#D3D3D3'}
            />
          </View>
        </View>
      </View>

      <View style={styles.uploadContainer}>
        <UploadDoc text={'Upload Pan Card'} />
      </View>

      {/* Updated buttonContainer with a title */}
      <View style={styles.buttonContainer}>
        <NextButton title={"Next"} onPress={() => props.navigation.navigate('sbi2')} disabled={isDisabled} />
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
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
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
