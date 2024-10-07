import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Modal, StyleSheet, Button, TouchableOpacity } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';
import SelectFieldSbi from './SelectFieldSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';

const SbiFastagRegistration2 = (props: any) => {
    const [pincode, setPincode] = useState('');
    const [chasisNumber, setChasisNumber] = useState('');
    const [ownername, setOwnerName] = useState('');
    const [engineNumber, setEngineNumber] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [selectedFuel, setSelectedFuel] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedtagsrno, setSelectedTagsrno] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true); // Manage button disabled state
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [panModalVisible, setPanModalVisible] = useState(false);
    const [pan, setPan] = useState('');
    const [isPanSubmitted, setIsPanSubmitted] = useState(false);
    const [mobileModalVisible, setMobileModalVisible] = useState(false);
    const [mobile, setMobile] = useState('');
    const [isMobileSubmitted, setIsMobileSubmitted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOtpModalVisible(true);
        }, 2000); // Show after 2 seconds

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []);
    // Data for the dropdowns
    const fuelData = [
        { title: 'Petrol' },
        { title: 'CNG' },
        { title: 'Diesel' },
    ];

    const stateData = [
        { title: 'Delhi' },
        { title: 'Rajasthan' },
        { title: 'Mumbai' },
        { title: 'Kerela' },
    ];
    const tagData = [
        { title: '242424' },
        { title: '42422' },
        { title: '242424' },
        { title: '1131313' },
    ];

    // Check if all fields are filled to enable/disable the button
    useEffect(() => {
        if (
            pincode !== '' &&
            chasisNumber !== '' &&
            ownername !== '' &&
            engineNumber !== '' &&
            vehicleNumber !== '' &&
            selectedFuel !== null &&
            selectedState !== null &&
            selectedtagsrno !== null
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [pincode, chasisNumber, ownername, engineNumber, vehicleNumber, selectedFuel, selectedState, selectedtagsrno]);


    const handleOtpSubmit = () => {
        if (otp) {
            setIsOtpSubmitted(true);
            setOtpModalVisible(false);
            setPanModalVisible(true);
            // Logic to show next modal, e.g., for PAN details can go here
        }
    };
    const handlePanSubmit = () => {
        if (otp) {
            setIsPanSubmitted(true);
            setPanModalVisible(false);
            setMobileModalVisible(true);
            // Logic to show next modal, e.g., for PAN details can go here
        }
    };
    const handleMobileSubmit = () => {
        if (otp) {
            setIsMobileSubmitted(true);
            setMobileModalVisible(false);
            // setPanModalVisible(true);
            // Logic to show next modal, e.g., for PAN details can go here
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />

            <View style={styles.detailsContainer}>
                <Text style={styles.headerText}>Description details</Text>

                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/location.png')} style={{ width: 40, height: 40 }} />
                    <InputTextSbi placeholder={"Enter pincode"} value={pincode} onChangeText={setPincode} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/vehicle.png')} style={{ width: 40, height: 40 }} />
                    <InputTextSbi placeholder={"Enter vehicle number"} value={vehicleNumber} onChangeText={setVehicleNumber} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={{ width: 40, height: 40 }} />
                    <InputTextSbi placeholder={"Enter chasis number"} value={chasisNumber} onChangeText={setChasisNumber} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={{ width: 40, height: 40 }} />
                    <InputTextSbi placeholder={"Enter engine number"} value={engineNumber} onChangeText={setEngineNumber} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={{ width: 40, height: 40 }} />
                    <InputTextSbi placeholder={"Enter owner name"} value={ownername} onChangeText={setOwnerName} />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={{ width: 40, height: 40 }} />
                    <View style={{ width: '80%', marginVertical: 12 }}>
                        <SelectFieldSbi
                            dataToRender={fuelData}
                            title={'Fuel Type'}
                            selectedValue={setSelectedFuel}
                            borderColor={selectedFuel ? '#0A74DA' : '#D3D3D3'}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightblue.png')} style={{ width: 40, height: 40 }} />
                    <View style={{ width: '80%', marginVertical: 12 }}>
                        <SelectFieldSbi
                            dataToRender={stateData}
                            title={'State of Registration'}
                            selectedValue={setSelectedState}
                            borderColor={selectedState ? '#0A74DA' : '#D3D3D3'}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/sbi/rightorange.png')} style={{ width: 40, height: 40 }} />
                    <View style={{ width: '80%', marginVertical: 12 }}>
                        <SelectFieldSbi
                            dataToRender={tagData}
                            title={'Tag Serial Number'}
                            selectedValue={setSelectedTagsrno}
                            borderColor={selectedtagsrno ? '#0A74DA' : '#D3D3D3'}
                        />
                    </View>
                </View>
            </View>

            {/* Updated buttonContainer with a title */}
            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} onPress={() => props.navigation.navigate('sbi3')} disabled={isDisabled} />
            </View>

            {/* Modal for OTP */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={otpModalVisible}
                onRequestClose={() => setOtpModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView1}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={{ width: 90, height: 30, }} />
                            <Image source={require('../../assets/sbi/cbpllogo.png')} style={{ width: 40, height: 40, }} />
                        </View>
                        <View style={styles.container}>
                            <View style={styles.TextContainer}>
                                <Text style={styles.Text}>Please Insert Customer OTP</Text>
                            </View>
                            <InputTextSbi
                                placeholder="Enter OTP"
                                keyboardType="numeric"
                                value={otp}
                                onChangeText={setOtp}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingRight: 20, paddingBottom: 10, }}>
                            <TouchableOpacity
                                onPress={handleOtpSubmit}
                                disabled={!otp}
                                style={[
                                    styles.appButtonContainer,
                                    { backgroundColor: otp ? '#5ECD4C' : '#EFE6F7' } // Change color to red if tag not registered
                                ]}
                            >
                                <View style={styles.innerContainer}>
                                    <Text style={styles.appButtonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={panModalVisible}
                onRequestClose={() => setPanModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView2}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={{ width: 90, height: 30, }} />
                            <Image source={require('../../assets/sbi/cbpllogo.png')} style={{ width: 40, height: 40, }} />
                        </View>
                        <View style={styles.container}>
                            <View style={styles.TextContainer}>
                                <Text style={styles.Text}>Please change Customer PAN</Text>
                            </View>
                            <InputTextSbi
                                placeholder="Enter Pan number"
                                keyboardType="text"
                                value={pan}
                                onChangeText={setPan}
                            />
                            <View style={styles.uploadContainer}>
                                <UploadDoc text={'Upload Pan Card'} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingRight: 20, paddingBottom: 10, }}>
                            <TouchableOpacity
                                onPress={handlePanSubmit}
                                disabled={!pan}
                                style={[
                                    styles.appButtonContainer,
                                    { backgroundColor: pan ? '#5ECD4C' : '#EFE6F7' } // Change color to red if tag not registered
                                ]}
                            >
                                <View style={styles.innerContainer}>
                                    <Text style={styles.appButtonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={mobileModalVisible}
                onRequestClose={() => setMobileModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView3}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={{ width: 90, height: 30, }} />
                            <Image source={require('../../assets/sbi/cbpllogo.png')} style={{ width: 40, height: 40, }} />
                        </View>
                        <View style={styles.container}>
                            <View style={styles.TextContainer}>
                                <Text style={styles.Text}>Please change Mobile Number</Text>
                            </View>
                            <InputTextSbi
                                placeholder="Enter mobile number"
                                keyboardType="text"
                                value={mobile}
                                onChangeText={setMobile}
                            />
                            
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingRight: 20, paddingBottom: 10, }}>
                            <TouchableOpacity
                                onPress={handleMobileSubmit}
                                disabled={!mobile}
                                style={[
                                    styles.appButtonContainer,
                                    { backgroundColor: mobile ? '#5ECD4C' : '#EFE6F7' } // Change color to red if tag not registered
                                ]}
                            >
                                <View style={styles.innerContainer}>
                                    <Text style={styles.appButtonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    uploadContainer: {
        backgroundColor: '#FFFFFF',
     width:260,
        
        padding: 15,
        borderRadius: 20,
        height: 160,
      },
    appButtonContainer: {
        backgroundColor: '#5ECD4C', // Enabled state color
        elevation: 4,
        borderRadius: 15,
        height: 40,
        width: '30%', // Adjust width for more space
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',

    },
    innerContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '70%', // Make inner container full width
        paddingHorizontal: 5
    },
    appButtonText: {
        fontSize: 16,
        color: 'black', // Ensure visible text color
        fontWeight: '500',
        fontFamily: 'inter',

    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems:'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    modalView1: {
        width: '80%',
        height: '40%',
        backgroundColor: '#5F259E',
        borderRadius: 10,
        // justifyContent: 'center',
        // textAlign: 'center',
        // alignItems: 'center',
        position: 'relative'
    },
    modalView2: {
        width: '80%',
        height: '65%',
        backgroundColor: '#5F259E',
        borderRadius: 10,
        // justifyContent: 'center',
        // textAlign: 'center',
        // alignItems: 'center',
        position: 'relative'
    },
    modalView3: {
        width: '80%',
        height: '40%',
        backgroundColor: '#5F259E',
        borderRadius: 10,
        // justifyContent: 'center',
        // textAlign: 'center',
        // alignItems: 'center',
        position: 'relative'
    },
    modalText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
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

    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextContainer: {
        backgroundColor: '#5F259E',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    Text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center'
    },
});

export default SbiFastagRegistration2;
