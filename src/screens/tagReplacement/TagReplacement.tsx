import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { setCache } from '../../helper/Storage'
import OverlayHeader from '../../components/OverlayHeader'
import CustomInputText from '../../components/common/CustomInputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import SelectField from '../../components/common/SelectFieldBig'

const TagReplacement = (props: any) => {
    const navigation = useNavigation()
    const [mobileNumber, setMobileNumber] = React.useState("")
    const [vehicleNumber, setVehicleNumber] = React.useState("")
    const getDetailsDropdownData = [
        {
            title: "By OTP"
        },
        {
            title: "By Password"
        },
        {
            title: "By Tag Number"
        },
        {
            title: "Get new tag"
        },
    ]

    // const sendOTP = async () => {
    //     // setLoading(true)
    //     const request: CustomerOTPRequest = {
    //         mobileNo: mobileNumber,
    //         vehicleNo: vehicleNumber,
    //         reqType: 'REP',
    //         chassisNo: '',
    //         resend: '0',
    //         udf1: '',
    //         udf2: '',
    //         udf3: '',
    //         udf4: '',
    //         udf5: '',
    //     }
    //     const response: ApiData<SendOtpResponse> = await sendCustomerOTP(request)
    //     console.log(response, "tag replacement response")

    //     if (response.success && response.data?.validateCustResp.sessionId) {
    //         await setCache('session', response.data?.validateCustResp.sessionId)
    //         props.navigation.navigate('OTP', {
    //             session: response.data?.validateCustResp.sessionId,
    //             mobile: mobileNumber,
    //             vehicleNo: vehicleNumber,
    //             to: "TagReplacement"
    //         })
    //     } else {
    //         Alert.alert(response.error ?? '')
    //     }
    // }
    const data = [
        {
            id: 1,
            title: "By OTP"
        },
        {
            id: 2,
            title: "By Password"
        },
        {
            id: 3,
            title: "By Tag Number"
        },
        {
            id: 4,
            title: "Get new tag"
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Replacement"} />
            <View style={styles.container}>
                <Text style={styles.label}>Get Details By</Text>

                <View style={{ marginBottom: "5%" }}>
                    <SelectField dataToRender={data} title={"Select"} />
                </View>

                <CustomInputText placeholder={"Enter mobile number"} onChangeText={(text) => setMobileNumber(text)} />
                <View style={{ marginVertical: "5%" }}>
                    <CustomInputText value={vehicleNumber} placeholder={"Enter last 5 digit engine number"} onChangeText={(text: string) => setVehicleNumber(text.toUpperCase())}
                    />
                </View>


                {/* error message */}
                <Text style={styles.errorText}>*Details not found
                    Invalid mobile number, tag serial number or bank name
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <PrimaryBtn title={"Next"}
                    onPress={() => props.navigation.navigate('tagReplacementForm')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%"
    },
    label: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: "#000000",
        marginBottom: "4%"

    },
    errorText: {
        padding: "2%",
        paddingHorizontal: "4%",
        color: "#FF0000",
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: "5%",
    },
})

export default TagReplacement
