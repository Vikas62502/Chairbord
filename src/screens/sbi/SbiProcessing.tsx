import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import OverlayHeaderSbi from '../../components/OverlayHeaderSbi';
import InputTextSbi from './InputTextSbi';
import SelectFieldSbi from './SelectFieldSbi';
import UploadDoc from '../../components/common/UploadDoc';
import NextButton from './NextButton';
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen = width < 400;
const SbiProcessing = (props: any) => {
    const [pincode, setPincode] = useState('');
    const [chasisNumber, setChasisNumber] = useState('');
    const [ownername, setOwnerName] = useState('');
    const [engineNumber, setEngineNumber] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [selectedFuel, setSelectedFuel] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedtagsrno, setSelectedTagsrno] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false); // Manage button disabled state

    // Data for the dropdowns


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />

            <View style={styles.detailsContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={{ width: 90, height: 30, }} />
                    <Image source={require('../../assets/sbi/cbpllogo.png')} style={{ width: 40, height: 40, }} />
                </View>
                <View style={styles.container1}>
                    <View style={styles.waitmsgTextContainer}>
                        <Text style={styles.Textwait}>Please wait!</Text>
                    </View>
                    <View style={styles.processmsgTextContainer}>
                        <Text style={styles.Textprocess}>Please completing soon!!</Text>
                    </View>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.Textcontainer2}>Usually it takes 5 to 7 minutes!!</Text>
                </View>

            </View>
            <Text style={{textAlign:'center',color:'black', fontSize: 16,fontWeight: '600',}}>Get...Set...Go...</Text>

            {/* Updated buttonContainer with a title */}
            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} onPress={() => props.navigation.navigate('sbi5')} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#5F259E',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        elevation: 8,
        borderRadius: 20,
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    headerText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    uploadContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 0,
        marginVertical: 15,
        // padding: 10,
        borderRadius: 20,
        height: 170,
    },
    container1: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    waitmsgTextContainer: {
        backgroundColor: '#5F259E',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    processmsgTextContainer: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        marginVertical: 10
    },
    container2: {
        backgroundColor: '#EFE6F7',
        borderRadius: 10,
        height: 40,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        
        marginVertical: 10
    },
    Textcontainer2: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'

    },
    Textwait: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center'
    },
    Textprocess: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
});

export default SbiProcessing;
