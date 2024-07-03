import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React from 'react'
import OverlayHeader from '../../component/OverlayHeader'
import SelectField from '../../component/common/SelectField'
import InputText from '../../component/common/InputText'
import PrimaryBtn from '../../component/common/PrimaryBtn'
import { useNavigation } from '@react-navigation/native'
import {
    CustomerOTPRequest,
    SendOtpResponse,
    StackScreenProp
} from '../../services/DTOs'
import { ApiData } from '../../client/AuthResponse'
import { sendCustomerOTP } from '../../services/AuthService'
import { setCache } from '../../helper/Storage'

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

    const sendOTP = async () => {
        // setLoading(true)
        const request: CustomerOTPRequest = {
            mobileNo: mobileNumber,
            vehicleNo: vehicleNumber,
            reqType: 'REP',
            chassisNo: '',
            resend: '0',
            udf1: '',
            udf2: '',
            udf3: '',
            udf4: '',
            udf5: '',
        }
        const response: ApiData<SendOtpResponse> = await sendCustomerOTP(request)
        console.log(response, "tag replacement response")

        if (response.success && response.data?.validateCustResp.sessionId) {
            await setCache('session', response.data?.validateCustResp.sessionId)
            props.navigation.navigate('OTP', {
                session: response.data?.validateCustResp.sessionId,
                mobile: mobileNumber,
                vehicleNo: vehicleNumber,
                to: "TagReplacement"
            })
        } else {
            Alert.alert(response.error ?? '')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Replacement"} showBackButton={true} navigateTo={() => navigation.goBack()} />
            <View style={styles.container}>
                <Text style={styles.label}>Get Details By</Text>
                <InputText placeholder={"Enter mobile number"} onChangeText={(text) => setMobileNumber(text)} />
                <InputText value={vehicleNumber} placeholder={"Enter vehicle number"} onChangeText={(text: string) => setVehicleNumber(text.toUpperCase())} />

                {/* error message */}
                <Text style={styles.errorText}>*Details not found
                    Invalid mobile number, tag serial number or bank name
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <PrimaryBtn title={"Next"} onPress={() => sendOTP()} />
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
        marginTop: "5%",
        marginBottom: "3%"
    },
    errorText: {
        padding: "2%",
        paddingHorizontal: "4%",
        color: "#FF0000",
    },
    bottomContainer: {
        justifyContent: 'flex-end',
        marginBottom: 16,
        paddingHorizontal: "5%",
    },
})

export default TagReplacement
