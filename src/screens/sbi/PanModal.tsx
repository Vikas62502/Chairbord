import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import InputTextSbi from './InputTextSbi';
import UploadDoc from '../../components/common/UploadDoc';

const PanModal = ({ setPanModalVisible, panModalVisible }: any) => {
    const [pan, setPan] = useState('');
    // Handle PAN submission
    const handlePanSubmit = () => {
        if (pan) {
            console.log(pan, "pan")
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={panModalVisible}
            onRequestClose={() => setPanModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo1} />
                        <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo2} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.modalText}>Please change Customer PAN</Text>
                        <InputTextSbi placeholder="Enter Pan number" value={pan} onChangeText={setPan} />
                        <View style={styles.uploadContainer}>
                        <UploadDoc />
                        </View>
                        
                    </View>
                    
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                            // onPress={handlePanSubmit}
                            // disabled={!pan}
                            style={styles.closeButtonContainer}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
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
    )
}

const styles = StyleSheet.create({
    // detailsContainer: {
    //     margin: 10,
    //     padding: 10,
    //     borderRadius: 10,
    //     backgroundColor: 'white',
    //     elevation: 3,
    // },
    // headerText: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },
    // inputContainer: {
    //     marginBottom: 15,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // icon: {
    //     width: 30,
    //     height: 30,
    //     marginRight: 10,
    // },
    // buttonContainer: {
    //     marginVertical: 20,
    //     alignItems: 'center',
    // },

    // modalBackground: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // },
    // modalView: {
    //     width: '80%',
    //     margin: 20,
    //     backgroundColor: 'white',
    //     borderRadius: 20,
    //     padding: 35,
    //     alignItems: 'center',
    //     elevation: 5,
    // },
    // logoContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 20,
    // },
    // logo: {
    //     width: 50,
    //     height: 50,
    //     marginHorizontal: 10,
    // },
    // container: {
    //     marginBottom: 20,
    //     alignItems: 'center',
    // },
    // modalText: {
    //     marginBottom: 15,
    //     textAlign: 'center',
    // },
    // uploadContainer: {
    //     backgroundColor: '#FFFFFF',
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    //     borderRadius: 20,
    //     height: 200,
    //   },
    // appButtonContainer: {
    //     elevation: 8,
    //     borderRadius: 10,
    //     paddingVertical: 10,
    //     paddingHorizontal: 12,
    //     width: '100%',
    //     alignItems: 'center',
    // },
    // appButtonText: {
    //     color: 'white',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        // height:'90%',
        margin: 20,
        // backgroundColor: 'white',
        backgroundColor: '#5F259E',
        borderRadius: 20,
        padding: 20,
        // alignItems: 'center',
        elevation: 5,
    },
    logoContainer: {
        // backgroundColor:"red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        // marginBottom: 20,
    },
    logo1: {
        width: 120,
        height: 40,
        // marginHorizontal: 10,
    },
    logo2: {
        width: 50,
        height: 50,
        // marginHorizontal: 10,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginVertical: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalText: {
        backgroundColor: '#5F259E',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        color: 'white',
        marginBottom: 15,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer:{
display:'flex',
gap:22,
flexDirection:'row'
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        // paddingHorizontal: 20,
        width: '46%',
        alignItems: 'center',
    },
    appButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButtonContainer: {
        elevation: 8,
        backgroundColor:'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '46%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadContainer: {
        backgroundColor: '#FFFFFF',
        // paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        height: 140,
        width:240
      },
});

export default PanModal