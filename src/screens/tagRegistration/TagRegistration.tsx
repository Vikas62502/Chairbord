import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import OverlayHeader from '../../component/OverlayHeader'
import { useNavigation } from '@react-navigation/native'
import InputText from '../../component/common/InputText'
import SecondaryButton from '../../component/common/SecondaryButton'
import SuccessModal from '../../component/SuccessModal'
import { horizontalScale, verticalScale } from '../../helper/Metrics'
import { getListMakers, getModalOfVehicle, registerFasttagApi } from '../../services/AuthService'
import { getCache } from '../../helper/Storage'
import SelectField from '../../component/common/SelectField'
import { colorData, npciVehicleClassIDData } from './staticData'
import pickImage from '../../helper/pickImage'

const TagRegistration = (props: any) => {
    const { custDetails } = props?.route?.params;
    const { vrnDetails } = props?.route?.params;
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
    const [sessionId, setSessionId] = React.useState('')
    const [vehicleIscommercial, setVehicleIscommercial] = React.useState("")
    const [listOfMakers, setListOfMakers] = React.useState([])
    const [vehicleModelValue, setVehicleModelValue] = React.useState("")
    const [npciIdData, setNpciIdData] = React.useState("4")
    const [loading, setLoading] = React.useState(false)

    // to get the vehcile manufaturer list if vahan fails
    const dropdownOptions = listOfMakers?.map((manufacturer, index) => ({
        id: index + 1,
        title: manufacturer
    }));

    const vehicleModalDropdown = vehicleModel?.map((model, index) => ({
        id: index + 1,
        title: model
    }));


    const getTheVehicleModel = async (manufacturer: any) => {
        setVehicleManufacturer(manufacturer?.title)
        const response: any = await getModalOfVehicle(manufacturer?.title, sessionId)
        setVehicleModel(response.data.vehicleModelList)
    }

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

    const registerFasttag = async () => {
        setLoading(true)
        const dynamicDebitAmount = Number(vrnDetails?.rechargeAmount) + Number(vrnDetails?.repTagCost) + Number(vrnDetails?.securityDeposit) + Number(vrnDetails?.tagCost)
        // try {
        const response: any = await registerFasttagApi(
            sessionId,
            {
                vrn: vrnDetails?.vehicleNo || props.route.params.vehicleNo,
                chassis: vrnDetails?.chassisNo || "",
                engine: vrnDetails?.engineNo || "",
                vehicleManuf: vrnDetails?.vehicleManuf || vehicleManufacturer,
                model: vrnDetails?.model || vehicleModelValue,
                vehicleColour: vrnDetails?.vehicleColour || vehicleColor,
                type: vrnDetails?.type,
                status: vrnDetails?.rtoStatus || "ACTIVE",
                npciStatus: "ACTIVE",
                isCommercial: vrnDetails?.isCommercial,
                tagVehicleClassID: "4",
                npciVehicleClassID: npciIdData || "4",
                vehicleType: vrnDetails?.vehicleType || "Motor Car",
                rechargeAmount: vrnDetails?.rechargeAmount,
                securityDeposit: vrnDetails?.securityDeposit,
                tagCost: vrnDetails?.tagCost,
                debitAmt: dynamicDebitAmount.toString()
            },
            {
                name: custDetails?.name ?? "",
                lastName: "",
                mobileNo: custDetails?.mobileNo ?? "",
                walletId: custDetails?.walletId ?? ""
            },
            {
                serialNo: `${tagSerialNumber1}-${tagSerialNumber2}-${tagSerialNumber3}`,
                tid: "",
                rcImageFront: documentFront ?? "",
                rcImageBack: documentBack ?? "",
                vehicleImage: vehicleImage ?? "",
                udf1: "",
                udf2: "",
                udf3: "",
                udf4: "",
                udf5: ""
            }
        );
        console.log(response, "response")
        setLoading(false)
        if (response.data.response.code === "00") {
            successResponse();
        }
        else if (response.data.response.code === "11") {
            failureResponse();
            Alert.alert(response.data.response.msg);
        }
        else {
            failureResponse();
            Alert.alert("Something went wrong");
        }
    };

    const customerData = [
        {
            title: "Tag cost",
            value: `: ₹${vrnDetails && vrnDetails?.tagCost}`
        },
        {
            title: "Security deposit",
            value: `: ₹${vrnDetails && vrnDetails?.securityDeposit}`
        },
    ]


    const customerDetailsData = [
        {
            title: "Name",
            value: `: ${custDetails.name}`
        },
        {
            title: "Mobile Number",
            value: `: ${custDetails.mobileNo}`
        },
    ]

    const getSessionId = async () => {
        const session = await getCache('session')
        setSessionId(session)
    }

    const getMakerIfVahanFails = async () => {
        const response: any = await getListMakers(sessionId)
        setListOfMakers(response?.data?.vehicleMakerList)
    }

    useEffect(() => {
        if (sessionId && !vrnDetails?.vehicleManuf) {
            getMakerIfVahanFails();
        }
    }, [sessionId, vrnDetails?.vehicleManuf])

    useEffect(() => {
        getSessionId()
        if (vrnDetails?.isCommercial === true) {
            setVehicleIscommercial('true')
        }
        else if (vrnDetails?.isCommercial === false) {
            setVehicleIscommercial('false')
        }
    }, [sessionId, vrnDetails?.isCommercial])
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
                <InputText placeholder={"Enter vehicle number"} value={vrnDetails?.vehicleNo || props?.route?.params?.vehicleNo} editable={!vrnDetails?.vehicleNo}
                    onChangeText={(text: string) => setVehicleNumber(text)}
                />
                {vrnDetails?.vehicleManuf === undefined ?
                    <>
                        <View style={{ marginTop: "5%" }}>
                            <SelectField
                                dataToRender={dropdownOptions} title={'Select Vehicle Manufacturer'} selectedValue={getTheVehicleModel} />
                        </View>
                        <View style={{ marginTop: "5%" }}>
                            <SelectField
                                dataToRender={vehicleModalDropdown} title={'Select Vehicle Modal'} selectedValue={setValueOfVehcileModal} />
                        </View>
                        <View style={{ marginTop: "5%" }}>
                            <SelectField
                                dataToRender={colorData} title={'Select Vehicle Color'} selectedValue={setColorData} />
                        </View>
                    </> : <View>
                        <InputText placeholder={""} value={vrnDetails?.vehicleManuf}
                            editable={!vrnDetails?.vehicleManuf}
                        // onChangeText={(text: string) => setVehicleType(text)}
                        />
                        <InputText placeholder={""} value={vrnDetails?.model}
                            editable={!vrnDetails?.model}
                        // onChangeText={(text: string) => setVehicleType(text)}
                        />
                        <InputText placeholder={""} value={vrnDetails?.vehicleColour}
                            editable={!vrnDetails?.vehicleColour}
                        // onChangeText={(text: string) => setVehicleType(text)}
                        />
                    </View>}
                <View style={{ marginTop: "5%" }}>
                    <SelectField
                        dataToRender={npciVehicleClassIDData} title={'Select Vehicle Class'} selectedValue={setNpciIdDataDropdown} />
                </View>
                <InputText placeholder={"Enter vehicle type"} value={vrnDetails?.type}
                    editable={!vrnDetails?.type}
                    onChangeText={(text: string) => setVehicleType(text)}
                />
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
                        <InputText placeholder={''} value='608268' onChangeText={(text: string) => setTagSerialNumber1(text)} editable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputText placeholder={''} value='001' onChangeText={(text: string) => setTagSerialNumber2(text)} editable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputText placeholder={'xxxxxx'} onChangeText={(text: string) => setTagSerialNumber3(text)} />
                    </View>
                </View>

                <Text style={styles.label}>RC copy photo</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => setImageData('front')}>
                        {documentFront ? (
                            <Image
                                source={{ uri: documentFront }}
                                style={{ width: 150, height: 150, marginTop: 10 }}
                            />
                        ) : (
                            <View style={styles.uploadDocContainer}>
                                <Image source={require("../../assets/uploadLogo.png")} />
                                <Text style={styles.uploadText}>Upload RC copy (Front)</Text>
                            </View>)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageData('back')}>
                        {documentBack ? (
                            <Image
                                source={{ uri: documentBack }}
                                style={{ width: 150, height: 150, marginTop: 10 }}
                            />
                        ) : (
                            <View style={styles.uploadDocContainer}>
                                <Image source={require("../../assets/uploadLogo.png")} />
                                <Text style={styles.uploadText}>Upload RC copy (Back)</Text>
                            </View>)}
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: "5%" }}>
                    <TouchableOpacity onPress={() => setImageData('vehicleImage')}>
                        {vehicleImage ? (
                            <Image
                                source={{ uri: vehicleImage }}
                                style={{ width: 150, height: 150, marginTop: 10 }}
                            />) : (
                            <View style={styles.uploadVehicle}>
                                <Image source={require("../../assets/uploadLogo.png")} />
                                <Text style={styles.uploadText}>Upload Vehicle Image</Text>
                            </View>)}
                    </TouchableOpacity>
                </View>

                {/* recharge amount , tagcost, security deposit */}
                <Text style={styles.label}>Recharge amount</Text>
                <InputText placeholder={"Enter recharge amount"} value={vrnDetails?.rechargeAmount}
                    editable={!vrnDetails?.rechargeAmount}
                    onChangeText={(text: string) => setRechargeAmount(text)}
                />
                <Text style={styles.label}>Tag cost</Text>
                <InputText placeholder={"Enter tag cost"} value={vrnDetails?.tagCost}
                    editable={!vrnDetails?.tagCost}
                    onChangeText={(text: string) => setTagCost(text)}
                />
                <Text style={styles.label}>Security deposit</Text>
                <InputText placeholder={"Enter security deposit"} value={vrnDetails?.securityDeposit}
                    editable={!vrnDetails?.securityDeposit}
                    onChangeText={(text: string) => setSecurityDeposit(text)}
                />

                <Text style={styles.label}>Customer details</Text>

                <View style={styles.dataDetailContainer}>
                    {vrnDetails && customerData?.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ marginVertical: "5%" }}>
                    <SecondaryButton title={"Submit"} onPress={() => {
                        registerFasttag();
                    }} />
                </View>

                <SuccessModal onClose={() => setModalVisible(false)} visible={modalVisible} isSuccess={isModalSuccess} />
            </View>
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
})

export default TagRegistration