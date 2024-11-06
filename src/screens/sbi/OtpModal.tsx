import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import InputTextSbi from './InputTextSbi';

const OtpModal = ({ otpModalVisible, setOtpModalVisible }: any) => {
    const [otp, setOtp] = useState('');
    // Handle OTP submission
    const handleOtpSubmit = () => {
        if (otp) {
            console.log(otp, "otp")
        }
    };
    return (
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
    )
}

const styles = StyleSheet.create({
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
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center',
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


export default OtpModal