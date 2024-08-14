import { View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { colorData, npciVehicleClassIDData, commercialOptions, manufacturerData, fuelData, modelsData, typesData } from './staticData'
import pickImage from '../../helper/pickImage'
import OverlayHeader from '../../components/OverlayHeader'
import SecondaryButton from '../../components/common/SecondaryButton'
import SuccessModal from '../../components/SuccessModal'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale, verticalScale } from '../../helper/Metrics'
import CustomInputText from '../../components/common/CustomInputText'
import SelectField from '../../components/common/SelectField'
import { client } from '../../client/Axios'

const TagRegistration = (props: any) => {
    console.log(props.route.params?.response, "props")
    console.log(props.route.params?.sessionId, "sessionId")
    const { custDetails } = props.route.params?.response;
    const { vrnDetails } = props.route.params?.response;
    const [isYes, setIsYes] = React.useState(false)
    console.log(vrnDetails, "vrnDetails")

    const [modalVisible, setModalVisible] = React.useState<null | boolean>(null)
    const [isModalSuccess, setIsModalSuccess] = React.useState<null | boolean>(null)
    const navigation = useNavigation()
    const [documentFront, setDocumentFront] = React.useState<string | undefined>("")
    const [documentBack, setDocumentBack] = React.useState<string | undefined>("")
    const [vehicleNumber, setVehicleNumber] = React.useState("")
    const [vehicleType, setVehicleType] = React.useState("")
    const [vehicleManufacturer, setVehicleManufacturer] = React.useState("")
    const [vehicleModel, setVehicleModel] = React.useState([])
    const [vehicleColor, setVehicleColor] = React.useState("")
    const [rechargeAmount, setRechargeAmount] = React.useState("")
    const [tagCost, setTagCost] = React.useState("")
    const [securityDeposit, setSecurityDeposit] = React.useState("")
    const [tagSerialNumber1, setTagSerialNumber1] = React.useState("608268")
    const [tagSerialNumber2, setTagSerialNumber2] = React.useState("001")
    const [tagSerialNumber3, setTagSerialNumber3] = React.useState("")
    const [vehicleImage, setVehicleImage] = React.useState<string | undefined>("")
    const [sessionId, setSessionId] = React.useState('dummySessionId')
    const [vehicleIscommercial, setVehicleIscommercial] = React.useState("")
    const [listOfMakers, setListOfMakers] = React.useState(["Toyota", "Honda", "Ford"])
    const [vehicleModelValue, setVehicleModelValue] = React.useState("")
    const [npciIdData, setNpciIdData] = React.useState("4")
    const [loading, setLoading] = React.useState(false)

    const dropdownOptions = listOfMakers?.map((manufacturer, index) => ({
        id: index + 1,
        title: manufacturer
    }));

    const vehicleModalDropdown = vehicleModel?.map((model, index) => ({
        id: index + 1,
        title: model
    }));

    const setValueOfVehcileModal = async (model: any) => {
        setVehicleModelValue(model?.title)
    }

    const setNpciIdDataDropdown = async (npciId: any) => {
        setNpciIdData(npciId?.value)
    }

    const setColorData = async (color: any) => {
        setVehicleColor(color?.title)
    }

    const setImageData = async (side: string) => {
        if (side === 'front') {
            const frontImage = await pickImage();
            setDocumentFront(frontImage);
        } else if (side === 'back') {
            const backImage = await pickImage();
            setDocumentBack(backImage);
        } else {
            const vehicleImage = await pickImage();
            setVehicleImage(vehicleImage);
        }
    }

    const successResponse = () => {
        setIsModalSuccess(true);
        setModalVisible(true);
    }

    const failureResponse = () => {
        setIsModalSuccess(false);
        setModalVisible(true);
    }

    const customerData = [
        {
            title: "Tag cost",
            value: `: ₹${vrnDetails?.tagCost}`
        },
        {
            title: "Security deposit",
            value: `: ₹${vrnDetails?.securityDeposit}`
        },
        {
            title: "Wallet balance",
            value: `: ₹${vrnDetails?.rechargeAmount}`
        },
        {
            title: "First time load balance",
            value: `: ₹${vrnDetails?.rechargeAmount}`
        },
        {
            title: "Total cost",
            value: `: ₹${vrnDetails?.rechargeAmount}`
        }
    ]

    const customerDetailsData = [
        {
            title: "Name",
            value: `: ${custDetails?.name}`
        },
        {
            title: "Mobile Number",
            value: `: ${custDetails?.mobileNo}`
        },
    ]

    const registerFastagApi = async () => {
        setLoading(true)
        try {
            const bodyData = JSON.stringify({
                "regDetails": {
                    "sessionId": "51b5aa1fbda2485fabf199163041925b"
                },
                "agentId": 18,
                "masterId": "",
                "vrnDetails": {
                    "vrn": "RJ14UH0250",
                    "chassis": "MA1TA2WGXH2E45298",
                    "engine": "WGH4E11340",
                    "vehicleManuf": "MAHINDRA & MAHINDRA LIMITED",
                    "model": "MAHINDRA SCORPIO S10 IH 2WD",
                    "vehicleColour": "DESAT SILVER",
                    "type": "LMV",
                    "status": "Active",
                    "npciStatus": "Active",
                    "isCommercial": false,
                    "tagVehicleClassID": "4",
                    "npciVehicleClassID": "4",
                    "vehicleType": "Motor Car",
                    "rechargeAmount": 99.0,
                    "securityDeposit": 1.0,
                    "tagCost": 100.0,
                    "debitAmt": 200.0,
                    "vehicleDescriptor": "PETROL",
                    "isNationalPermit": "2",
                    "permitExpiryDate": "",
                    "stateOfRegistration": "RJ"
                },
                "custDetails": {
                    "name": "Vikas Yadav",
                    "mobileNo": "8178624530",
                    "walletId": ""
                },
                "fasTagDetails": {
                    "serialNo": "608268-001-0022167",
                    "tid": "",
                    "udf1": "",
                    "udf2": "",
                    "udf3": "",
                    "udf4": "",
                    "udf5": ""
                }
            })

            const res = await client.post("bajaj/registerFastag",
                bodyData
            )
            successResponse()
        } catch (error) {
            failureResponse()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setSessionId('dummySessionId');
        setVehicleIscommercial(vrnDetails?.isCommercial ? 'true' : 'false');
    }, [vrnDetails?.isCommercial])

    return (
        <ScrollView style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Registration"} navigateTo={() => navigation.goBack()} />
            <View style={styles.container}>
                {loading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
                <Text style={styles.label}>Customer details</Text>

                <View style={styles.dataDetailContainer}>
                    {customerDetailsData && customerDetailsData.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.label}>Vehicle Details</Text>
                <CustomInputText placeholder={"Enter vehicle number"}
                    onChangeText={(text: string) => setVehicleNumber(text)}
                />
                {/* {vrnDetails?.vehicleManuf === undefined ? */}
                <>
                    <View style={{ marginTop: "5%" }}>
                        <SelectField
                            dataToRender={dropdownOptions} title={'Select Vehicle Manufacturer'} selectedValue={(value) => setVehicleManufacturer(value.title)} />
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <SelectField
                            dataToRender={modelsData} title={'Select Vehicle Model'} selectedValue={setValueOfVehcileModal} />
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <SelectField
                            dataToRender={colorData} title={'Select Vehicle Color'} selectedValue={setColorData} />
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <SelectField
                            dataToRender={typesData} title={'Select Type'} selectedValue={setColorData} />
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <SelectField
                            dataToRender={npciVehicleClassIDData} title={'NPCI vehicle class'} selectedValue={setColorData} />
                    </View>
                </>
                {/* : */}
                {/* <View>
                    <CustomInputText placeholder={""} value={vehicleManufacturer || vrnDetails?.vehicleManuf}
                        editable={!vrnDetails?.vehicleManuf}
                        onChangeText={(text: string) => setVehicleManufacturer(text)}
                    />
                    <CustomInputText placeholder={""} value={vehicleModelValue || vrnDetails?.model}
                        editable={!vrnDetails?.model}
                        onChangeText={(text: string) => setVehicleModelValue(text)}
                    />
                    <CustomInputText placeholder={""} value={vehicleColor || vrnDetails?.vehicleColour}
                        editable={!vrnDetails?.vehicleColour}
                        onChangeText={(text: string) => setVehicleColor(text)}
                    />
                </View> */}
                {/* } */}
                {/* <View style={{ marginTop: "5%" }}>
                    <SelectField
                        dataToRender={npciVehicleClassIDData} title={'Select Vehicle Class'} selectedValue={setNpciIdDataDropdown} />
                </View> */}
                {/* <View style={{ marginTop: "5%" }}>
                    <CustomInputText placeholder={"Enter vehicle type"} value={vehicleType || vrnDetails?.type}
                        editable={!vrnDetails?.type}
                        onChangeText={(text: string) => setVehicleType(text)}
                    />
                </View> */}
                <Text style={styles.label}>Tag serial number</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <CustomInputText placeholder={''} value='608268' onChangeText={(text: string) => setTagSerialNumber1(text)} editable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInputText placeholder={''} value='001' onChangeText={(text: string) => setTagSerialNumber2(text)} editable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInputText placeholder={'0084568'} value={tagSerialNumber3} onChangeText={(text: string) => setTagSerialNumber3(text)} />
                    </View>
                </View>

                <View style={{ marginTop: "5%" }}>
                    <SelectField
                        dataToRender={commercialOptions} title={'Select isCommercial'} selectedValue={(value) => setVehicleIscommercial(value.title)} />
                </View>
                <Text style={styles.label}>Enter Expiry Date</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        placeholder='DD-MM-YYYY'
                        placeholderTextColor='#263238'
                        style={styles.dateInput}
                        value={''}
                        // onChangeText={(text) => handleDateChange(text, 'expiryDate')}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                </View>
                <View style={{ marginVertical: "5%" }}>
                    <SelectField
                        dataToRender={fuelData} title={'Select fuel type'} selectedValue={(value) => setVehicleIscommercial(value.title)} />
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <SelectField
                        dataToRender={commercialOptions} title={'Select national permit'} selectedValue={(value) => setVehicleIscommercial(value.title)} />
                </View>

                <View style={styles.dataDetailContainer}>
                    {customerData && customerData.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>



                <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
                    <SecondaryButton
                        title={"Submit"}
                        onPress={() => { console.log("Submit pressed") }}
                    />
                </View>

            </View>
            <SuccessModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                success={isModalSuccess}
                successMessage={"Tag Registered Successfully"}
                failureMessage={"Failed to Register Tag"}
                onPress={() => {
                    setModalVisible(false)
                    navigation.goBack()
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10,
    },
    label: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: "#000000",
        marginTop: "5%",
        marginBottom: "3%"
    },
    dataDetailContainer: {
        borderWidth: 1,
        borderColor: "#263238",
        borderRadius: 20,
        padding: "5%"
    },
    customerDetailsValueText: {
        color: "#000000",
        width: "55%",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    customerValueText: {
        color: "#000000",
        width: "45%",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    dateInput: {
        borderColor: '#263238',
        borderWidth: 1,
        color: '#000000',
        width: '100%',
        fontSize: 16,
        borderRadius: 20,
        height: 60,
        paddingHorizontal: '5%',
        backgroundColor: '#F3F3F3',
        textAlign: 'center'
    },
    customerDetailsTitleText: {
        color: "grey",
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16
    },
    customerDetailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "3%"
    },
    uploadDocContainer: {
        borderWidth: 1,
        borderColor: "#263238",
        height: verticalScale(175),
        width: horizontalScale(163),
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadVehicle: {
        borderWidth: 1,
        borderColor: "#263238",
        height: verticalScale(175),
        width: horizontalScale(333),
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadText: {
        textAlign: "center",
        color: "#263238",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    imagePlaceholderText: {
        color: '#7f7f7f',
    },
})
export default TagRegistration;
