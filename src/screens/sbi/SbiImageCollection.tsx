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
const SbiImageCollection = (props: any) => {
    
    

    // Check if all fields are filled to enable/disable the button
    // useEffect(() => {
    //     if (
    //         pincode !== '' &&
    //         chasisNumber !== '' &&
    //         ownername !== '' &&
    //         engineNumber !== '' &&
    //         vehicleNumber !== '' &&
    //         selectedFuel !== null &&
    //         selectedState !== null &&
    //         selectedtagsrno !== null
    //     ) {
    //         setIsDisabled(false);
    //     } else {
    //         setIsDisabled(true);
    //     }
    // }, [pincode, chasisNumber, ownername, engineNumber, vehicleNumber, selectedFuel, selectedState, selectedtagsrno]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#EFE6F7' }}>
            <OverlayHeaderSbi title={'SBI FASTag Registration'} />

            <View style={styles.detailsContainer}>
                <Text style={styles.headerText}>Description details</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical:15 }}>
                    <View style={{ height: isSmallScreen ? 150 : 160, width: isSmallScreen ? 150 : 160, }}>
                        <UploadDoc text={'Upload RC Front'} backgroundType={"RC"}/>
                    </View>
                    <View style={{ height: isSmallScreen ? 150 : 160, width: isSmallScreen ? 150 : 160, }}>
                        <UploadDoc text={'Upload RC Back'} backgroundType={"RC"}/>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ height: isSmallScreen ? 150 : 160, width: isSmallScreen ? 150 : 160, }}>
                        <UploadDoc text={'Upload Vehicle Front'} backgroundType={"Vehicle-Front"}/>
                    </View>
                    <View style={{ height: isSmallScreen ? 150 : 160, width: isSmallScreen ? 150 : 160, }}>
                        <UploadDoc text={'Upload Vehicle Side'} backgroundType={"Vehicle-Side"}/>
                    </View>
                </View>
                <View style={styles.uploadContainer}>
        <UploadDoc text={'Upload Tag Image'} backgroundType={"FASTAG"}/>
      </View>
      
                {/* <View style={styles.uploadContainer}>
                    <UploadDoc text={'Upload Pan Card'} />
                </View> 
                <View style={styles.uploadContainer}>
                    <UploadDoc text={'Upload Pan Card'} />
                </View>
                 <View style={styles.uploadContainer}>
                    <UploadDoc text={'Upload Pan Card'} />
                </View> */}

            </View>

            {/* Updated buttonContainer with a title */}
            <View style={styles.buttonContainer}>
                <NextButton title={"Next"} onPress={() => props.navigation.navigate('sbi4')} />
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
    uploadContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 0,
        marginVertical: 15,
        // padding: 10,
        borderRadius: 20,
        height: 170,
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
});

export default SbiImageCollection;
