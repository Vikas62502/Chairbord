import { View, Text, Modal, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import InputTextSbi from './InputTextSbi'

const MobileNumberModal = ({ mobileModalVisible, setMobileModalVisible }: any) => {
    const [mobile, setMobile] = useState('');
    // Handle mobile number submission
    const handleMobileSubmit = () => {
        if (mobile) {
            setMobileModalVisible(false);
            // Next steps after mobile number submission can be handled here
        }
    };
    return (
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
    )
}

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


export default MobileNumberModal