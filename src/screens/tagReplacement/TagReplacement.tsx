import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { getCache, setCache } from '../../helper/Storage'
import OverlayHeader from '../../components/OverlayHeader'
import CustomInputText from '../../components/common/CustomInputText'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import SelectField from '../../components/common/SelectFieldBig'
import InputText from '../../components/common/InputText'

import { client } from '../../client/Axios'
import Loader from '../../components/ui/Loader'


const TagReplacement = (props: any) => {
    const [userData, setUserData] = React.useState<any>()
    const [loading, setLoading] = React.useState(false)
    const [replacementOtpData, setReplacementOtpData] = React.useState<any>({
        mobileNumber: '',
        vehicleNumber: '',
        engineNumber: ''
    })

    const formDatahandler = (key: string, value: string) => {
        setReplacementOtpData({
            ...replacementOtpData,
            [key]: value
        })
    }

    const sendOTP = async () => {
        setLoading(true)
        try {
            const res = await client.post('/bajaj/sendOtp', {
                requestId: '',
                channel: '',
                agentId: userData?.user?.id,
                vehicleNo: replacementOtpData.vehicleNumber?.toUpperCase(),
                chassisNo: '',
                engineNo: replacementOtpData.engineNumber?.toUpperCase(),
                mobileNo: replacementOtpData.mobileNumber,
                reqType: 'REP',
                resend: 0,
                isChassis: 0,
                udf1: '',
                udf2: '',
                udf3: '',
                udf4: '',
                udf5: '',
            })
            console.log(JSON.stringify(res), "otp response")

            await setCache('session', res?.data?.validateCustResp?.sessionId)
            props.navigation.navigate("OTP", {
                otpData: res.data,
                sessionId: res?.data?.validateCustResp?.sessionId,
                VerificationFormData: replacementOtpData,
                type: 'tagReplacement'
            })
            console.log(res, "otp response")
        } catch (error) {
            console.log(JSON.stringify(error), "error")
        } finally {
            setLoading(false)
        }
    }

    const getUserData = async () => {
        let userData = await getCache('userData')
        setUserData(userData)
    }

    useEffect(() => {
        getUserData()
    }, [])

    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Replacement"} />
            {loading && <Loader />}
            <View style={styles.container}>
                <Text style={styles.label}>Get Details By</Text>

                <View style={{ marginBottom: "4%" }}>
                    <CustomInputText
                        value={replacementOtpData.mobileNumber}
                        placeholder={"Enter mobile number"}
                        onChangeText={(text: string) => formDatahandler('mobileNumber', text)}
                        keyboardType='numeric'
                    />
                </View>

                <CustomInputText
                    placeholder={"Enter Vehicle number"}
                    value={replacementOtpData.vehicleNumber}
                    onChangeText={(text: string) => formDatahandler('vehicleNumber', text.toUpperCase())}
                />

                <View style={{ marginVertical: "5%" }}>
                    <CustomInputText
                        value={replacementOtpData.engineNumber}
                        placeholder={"Enter last 5 digit engine number"}
                        onChangeText={(text: string) => formDatahandler('engineNumber', text)}
                    />
                </View>

                {/* error message */}
                <Text style={styles.errorText}>*Details not found
                    Invalid mobile number, tag serial number or bank name
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <PrimaryBtn title={"Next"} onPress={sendOTP} />
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
        marginBottom: "2%"
    },
    errorText: {
        padding: "0%",
        paddingHorizontal: "2%",
        color: "#FF0000",
    },
    bottomContainer: {
        justifyContent: 'flex-end',
        padding: "5%",
        height: "40%",
    },
})

export default TagReplacement
