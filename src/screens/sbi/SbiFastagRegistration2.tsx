import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';
import SelectFieldSbi from './SelectFieldSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';

const SbiFastagRegistration2 = (props) => {
    const vehiclePropData = props.route.params.vehicleDetails.data.data.data;

    // State declarations
    const [pincode, setPincode] = useState('');
    const [chasisNumber, setChasisNumber] = useState(vehiclePropData.vehicle_chasi_number || '');
    const [ownername, setOwnerName] = useState(vehiclePropData.owner_name || '');
    const [engineNumber, setEngineNumber] = useState(vehiclePropData.vehicle_engine_number || '');
    const [vehicleNumber, setVehicleNumber] = useState(vehiclePropData.rc_number || '');
    const [selectedFuel, setSelectedFuel] = useState(vehiclePropData.fuel_type || null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedTagsrno, setSelectedTagsrno] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [panModalVisible, setPanModalVisible] = useState(false);
    const [pan, setPan] = useState('');
    const [mobileModalVisible, setMobileModalVisible] = useState(false);
    const [mobile, setMobile] = useState('');

    // Dropdown data
    const fuelData = [
        { title: 'Petrol' },
        { title: 'CNG' },
        { title: 'Diesel' },
    ];

    const stateData = [
        { title: 'Delhi' },
        { title: 'Rajasthan' },
        { title: 'Mumbai' },
        { title: 'Kerala' },
    ];

    const tagData = [
        { title: '242424' },
        { title: '42422' },
        { title: '242424' },
        { title: '1131313' },
    ];

    // Check if all fields are filled to enable/disable the button
    useEffect(() => {
        const allFieldsFilled = [
            pincode, chasisNumber, ownername, engineNumber, vehicleNumber,
            selectedFuel, selectedState, selectedTagsrno
        ].every(field => field !== '' && field !== null);
        setIsDisabled(!allFieldsFilled);
    }, [pincode, chasisNumber, ownername, engineNumber, vehicleNumber, selectedFuel, selectedState, selectedTagsrno]);

    // Handle OTP submission
    const handleOtpSubmit = () => {
        if (otp) {
            setOtpModalVisible(false);
            setPanModalVisible(true);
        }
    };

    // Handle PAN submission
    const handlePanSubmit = () => {
        if (pan) {
            setPanModalVisible(false);
            setMobileModalVisible(true);
        }
    };

    // Handle mobile number submission
    const handleMobileSubmit = () => {
        if (mobile) {
            setMobileModalVisible(false);
            // Next steps after mobile number submission can be handled here
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />

            <View style={styles.detailsContainer}>
                <Text style={styles.headerText}>Description details</Text>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/location.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter pincode"} value={pincode} onChangeText={setPincode} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/vehicle.png')} style={styles.icon} />
                    <InputTextSbi
                        placeholder={"Enter vehicle number"}
                        value={vehicleNumber}
                        onChangeText={setVehicleNumber}
                        isEditable={!vehiclePropData.rc_number.toUpperCase()}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter chasis number"} value={chasisNumber} onChangeText={setChasisNumber} isEditable={!vehiclePropData.vehicle_chasi_number} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter engine number"} value={engineNumber} onChangeText={setEngineNumber} isEditable={!vehiclePropData.vehicle_engine_number} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={styles.icon} />
                    <InputTextSbi placeholder={"Enter owner name"} value={ownername} onChangeText={setOwnerName} isEditable={!vehiclePropData.owner_name} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={styles.icon} />
                    {!vehiclePropData.fuel_type ? (
                        <SelectFieldSbi
                            dataToRender={fuelData}
                            title={'Fuel Type'}
                            selectedValue={setSelectedFuel}
                            borderColor={selectedFuel ? '#0A74DA' : '#D3D3D3'}
                            initialValue={selectedFuel} // Set initial value
                        />
                    ) : (
                        <InputTextSbi placeholder={"Fuel Type"} value={vehiclePropData.fuel_type} isEditable={!vehiclePropData.fuel_type} />
                    )}


                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={styles.icon} />
                    {!vehiclePropData.registered_at ? (
                        <SelectFieldSbi
                            dataToRender={stateData}
                            title={'State of Registration'}
                            selectedValue={setSelectedState}
                            borderColor={selectedState ? '#0A74DA' : '#D3D3D3'}
                        />
                    ) : (
                        <InputTextSbi placeholder={"State of registration"} value={vehiclePropData.registered_at} isEditable={!vehiclePropData.registered_at} />
                    )}

                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={styles.icon} />
                    <SelectFieldSbi
                        dataToRender={tagData}
                        title={'Tag Serial Number'}
                        selectedValue={setSelectedTagsrno}
                        borderColor={selectedTagsrno ? '#0A74DA' : '#D3D3D3'}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} onPress={() => props.navigation.navigate('sbi3')} disabled={isDisabled} />
            </View>

            {/* OTP Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={otpModalVisible}
                onRequestClose={() => setOtpModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo} />
                            <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo} />
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.modalText}>Please Insert Customer OTP</Text>
                            <InputTextSbi placeholder="Enter OTP" keyboardType="numeric" value={otp} onChangeText={setOtp} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handleOtpSubmit}
                                disabled={!otp}
                                style={[styles.appButtonContainer, { backgroundColor: otp ? '#5ECD4C' : '#EFE6F7' }]}
                            >
                                <Text style={styles.appButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* PAN Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={panModalVisible}
                onRequestClose={() => setPanModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo} />
                            <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo} />
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.modalText}>Please change Customer PAN</Text>
                            <InputTextSbi placeholder="Enter Pan number" value={pan} onChangeText={setPan} />
                            <UploadDoc />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handlePanSubmit}
                                disabled={!pan}
                                style={[styles.appButtonContainer, { backgroundColor: pan ? '#5ECD4C' : '#EFE6F7' }]}
                            >
                                <Text style={styles.appButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Mobile Number Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={mobileModalVisible}
                onRequestClose={() => setMobileModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo} />
                            <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo} />
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.modalText}>Please change Customer Mobile Number</Text>
                            <InputTextSbi placeholder="Enter mobile number" value={mobile} onChangeText={setMobile} keyboardType="numeric" />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handleMobileSubmit}
                                disabled={!mobile}
                                style={[styles.appButtonContainer, { backgroundColor: mobile ? '#5ECD4C' : '#EFE6F7' }]}
                            >
                                <Text style={styles.appButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
    container: {
        marginBottom: 20,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '100%',
        alignItems: 'center',
    },
    appButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SbiFastagRegistration2;
