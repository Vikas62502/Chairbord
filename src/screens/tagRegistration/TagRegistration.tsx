import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorData, npciVehicleClassIDData, commercialOptions, fuelData, stateData, isNationalPermitOptions, telanganaStateCode, vehicleTypeDropdown, middleTagSerialNumber } from './staticData'
import OverlayHeader from '../../components/OverlayHeader'
import SecondaryButton from '../../components/common/SecondaryButton'
import SuccessModal from '../../components/SuccessModal'
import CustomInputText from '../../components/common/CustomInputText'
import SelectField from '../../components/common/SelectFieldBig'
import InputText from '../../components/common/InputText'
import showAlert from '../../utils/showAlert'
import styles from './Styles'
import CustomLabelText from './CustomLabelText'
import { client } from '../../client/Axios'
import { getMakerIfVahanFails, getTheVehicleModel, handleDateChange, onVechileTypeSelect, setColorData, setNpciIdDataDropdown, setValueOfVehcileModal, successResponse, updatevehicleType, validateFields } from './utils'
import useUserData from '../../helper/useUserData'

const dummyProps = {
    route: {
        params: {
            response: {
                custDetails: {
                    name: 'John Doe',
                    mobileNo: '1234567890',
                    walletId: '987654321',
                },
                vrnDetails: null,
                sessionId: '123456789',
            },
        },
    },
    // navigation: {
    //   navigate: (screenName, params) => {
    //     console.log(`Navigating to ${screenName} with params:`, params);
    //   },
    //   goBack: () => {
    //     console.log('Going back');
    //   },
    // },
}


const TagRegistration = (props: any) => {
    const { custDetails, vrnDetails, sessionId } = props.route.params.response as any;
    const { CustomerRegData, userOtpData } = props.route.params;
    const [chassisNo, setChasisNo] = React.useState<any>("")
    const [engineNumber, setEngineNumber] = React.useState<any>("")
    const { userData } = useUserData()
    const [modalVisible, setModalVisible] = useState<null | boolean>(false)
    const [isModalSuccess, setIsModalSuccess] = useState<null | boolean>(null)
    const [vehicleManufacturer, setVehicleManufacturer] = useState("")
    const [vehicleModel, setVehicleModel] = useState([])
    const [vehicleColor, setVehicleColor] = useState("")
    const [tagSerialNumber1, setTagSerialNumber1] = useState("608268")
    const [tagSerialNumber2, setTagSerialNumber2] = useState("001")
    const [tagSerialNumber3, setTagSerialNumber3] = useState("")
    const [vehicleIscommercial, setVehicleIscommercial] = useState("")
    const [nationalpermit, setNationalPermit] = useState("")
    const [vehicleFuelType, setVehicleFuelType] = useState("")
    const [listOfMakers, setListOfMakers] = useState(["Toyota", "Honda", "Ford"])
    const [vehicleModelValue, setVehicleModelValue] = useState("")
    const [npciIdData, setNpciIdData] = useState(vrnDetails?.npciVehicleClassID || "")
    const [permitExpiryDate, setPermitExpiryDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [stateOfRegistration, setStateOfRegistration] = useState("")
    const [typeOfVehicle, setTypeOfVehicle] = useState("")
    const [vehicleType, setVehicleType] = useState("")
    const [errors, setErrors] = useState<any>()
    const [stateCode, setStateCode] = useState("")
    console.log(errors, "<---- errors")
    console.log(vehicleColor, "<---- vehicleColor")

    const dropdownOptions = listOfMakers?.map((manufacturer, index) => ({
        id: index + 1,
        title: manufacturer
    }));

    const vehicleModalDropdown = vehicleModel?.map((model, index) => ({
        id: index + 1,
        title: model
    }));


    const customerData = [
        { title: "Tag cost", value: `: ₹${vrnDetails?.tagCost}` },
        { title: "Security deposit", value: `: ₹${vrnDetails?.securityDeposit}` },
        { title: "Wallet balance", value: `: ₹${vrnDetails?.rechargeAmount}` },
    ]

    const customerDetailsData = [
        { title: "Name", value: `: ${custDetails?.name || CustomerRegData?.name}` },
        { title: "Mobile Number", value: `: ${custDetails?.mobileNo || CustomerRegData?.mobileNo}` },
    ]

    const registerFastagApi = async () => {
        if (!validateFields(chassisNo, vehicleManufacturer, vehicleModelValue, vehicleColor, npciIdData, vehicleFuelType, vehicleIscommercial, typeOfVehicle, vehicleType, setErrors,)) {
            return;
        }
        setLoading(true)
        if (vrnDetails?.type && vrnDetails?.tagVehicleClassID === '4') {
            updatevehicleType(vrnDetails?.type, vrnDetails?.tagVehicleClassID, vehicleIscommercial, setVehicleType)
        }

        if (vrnDetails?.type && vrnDetails?.npciVehicleClassID === '20' && !vehicleType) {
            console.log("called", vrnDetails?.type, vrnDetails?.npciVehicleClassID, vehicleIscommercial, typeof setTypeOfVehicle)
            onVechileTypeSelect(vrnDetails?.type, setTypeOfVehicle, setVehicleType, vehicleIscommercial)
        }
        const dynamicDebitAmount = Number(vrnDetails?.rechargeAmount || 0) + Number(vrnDetails?.repTagCost) + Number(vrnDetails?.securityDeposit) + Number(vrnDetails?.tagCost)
        try {
            const bodyData = JSON.stringify({
                "regDetails": {
                    "sessionId": props.route.params?.sessionId
                },
                "agentId": Number(userData?.user?.id),
                "masterId": Number(userData?.user?.master_id) || "",
                "agentName": userData?.user?.name || CustomerRegData?.name || "",
                "vrnDetails": {
                    "vrn": vrnDetails?.vehicleNo || userOtpData?.vehicleNo?.toUpperCase(),
                    "chassis": vrnDetails?.chassisNo || chassisNo,
                    "engine": vrnDetails?.engineNo || "",
                    "vehicleManuf": vrnDetails?.vehicleManuf || vehicleManufacturer,
                    "model": vrnDetails?.model || vehicleModelValue,
                    "vehicleColour": vrnDetails?.vehicleColour || vehicleColor,
                    "type": vrnDetails?.type || typeOfVehicle,
                    "status": "Active",
                    "npciStatus": "Active",
                    "isCommercial": vrnDetails?.commercial || vehicleIscommercial,
                    "tagVehicleClassID": "4",
                    "npciVehicleClassID": npciIdData || "4",
                    "vehicleType": vrnDetails?.vehicleType || vehicleType,
                    "rechargeAmount": vrnDetails?.rechargeAmount,
                    "securityDeposit": vrnDetails?.securityDeposit,
                    "tagCost": vrnDetails?.tagCost,
                    "debitAmt": dynamicDebitAmount.toString(),
                    "vehicleDescriptor": vrnDetails?.vehicleDescriptor || vehicleFuelType,
                    "isNationalPermit": nationalpermit || vrnDetails?.isNationalPermit || "2",
                    "permitExpiryDate": permitExpiryDate || vrnDetails?.permitExpiryDate || "",
                    "stateOfRegistration": stateCode || vrnDetails?.stateOfRegistration || stateOfRegistration,
                },
                "custDetails": {
                    "name": custDetails?.name || CustomerRegData?.name,
                    "mobileNo": custDetails?.mobileNo,
                    "walletId": custDetails?.walletId,
                },
                "fasTagDetails": {
                    "serialNo": `${tagSerialNumber1}-${tagSerialNumber2}-${tagSerialNumber3}`,
                    "tid": "",
                    "udf1": Number(userData?.user?.id),
                    "udf2": "",
                    "udf3": "",
                    "udf4": "",
                    "udf5": ""
                }
            })
            console.log(bodyData, "<----------------------- response")
            // const res = await client.post("/bajaj/registerFastag",
            //     bodyData
            // )
            // successResponse(setIsModalSuccess, setModalVisible)
        } catch (error: any) {
            console.log(error || 'Tag registration failed')
            showAlert(error.response.data.error.msg || error.response.data.error.errorDesc || 'Tag registration failed',
                () => {
                    props?.navigation?.goBack()
                });
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (props.route.params?.sessionId) {
            getMakerIfVahanFails(props.route.params?.sessionId, setListOfMakers);
        }
    }, [sessionId, vrnDetails?.vehicleManuf, vrnDetails?.model])

    useEffect(() => {
        if (!vehicleType) {
            updatevehicleType(vrnDetails?.type, vrnDetails?.tagVehicleClassID, vehicleIscommercial, setVehicleType)
        }
    }, [vehicleType])


    return (
        <ScrollView style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Registration"} />
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

                <CustomLabelText label={"Vehicle Number"} />
                <InputText placeholder={"Enter vehicle number"} value={vrnDetails?.vehicleNo || userOtpData?.vehicleNo?.toUpperCase()}
                    onChangeText={{}} isEditable={false}
                />

                <View style={{ marginTop: "5%" }}>
                    <CustomLabelText label={"Chasis Number"} />
                    {vrnDetails && vrnDetails?.chassisNo?.length > 2 ?
                        <InputText placeholder={"Enter Chasis number"} value={vrnDetails?.chassisNo}
                            isEditable={false}
                        /> : <CustomInputText placeholder={"Enter Chasis number"} value={chassisNo}
                            onChangeText={(text: string) => setChasisNo(text?.toUpperCase())} borderColor={chassisNo?.length < 2 ? "red" : "#263238"}
                        />}
                </View>
                <View style={{ marginTop: "5%" }}>
                    <CustomLabelText label={"Enter Engine number"} />
                    {vrnDetails && vrnDetails?.engineNo?.length > 2 ?
                        <InputText placeholder={"Engine number"} value={vrnDetails?.engineNo}
                            isEditable={false}
                        /> : <CustomInputText placeholder={"Enter Engine number"} value={engineNumber}
                            onChangeText={(text: string) => setEngineNumber(text?.toUpperCase())} borderColor={engineNumber?.length < 2 ? "red" : "#263238"}
                        />}
                </View>
                <>
                    <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Manufacturer"} />
                        {vrnDetails && vrnDetails?.vehicleManuf?.length > 2 && vrnDetails?.model?.length > 2 ?
                            <CustomInputText
                                placeholder={"Vehicle Manufacturer"}
                                value={vrnDetails?.vehicleManuf}
                                onChangeText={(text: string) => setVehicleManufacturer(text)}
                                isEditable={false}
                            />
                            : <SelectField dataToRender={dropdownOptions} title={'Select Vehicle Manufacturer'} selectedValue={(manufacturer: any) => getTheVehicleModel(manufacturer, props?.route?.params?.sessionId, setVehicleManufacturer, setVehicleModel)} borderColor={!vehicleManufacturer ? "red" : "black"} />}
                    </View>

                    <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Model"} />
                        {vrnDetails && vrnDetails?.model?.length > 2 ? <CustomInputText
                            placeholder={"Vehicle Model"}
                            value={vrnDetails?.model}
                            onChangeText={(text: string) => setVehicleModelValue(text)}
                            isEditable={false}
                        /> : <SelectField dataToRender={vehicleModalDropdown} title={'Select Vehicle Model'} selectedValue={(model: string) => setValueOfVehcileModal(model, setVehicleModelValue)} borderColor={!vehicleModelValue || vehicleModelValue === "NA" ? "red" : "black"} />}
                    </View>

                    <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Color"} />
                        {vrnDetails && vrnDetails?.vehicleColour?.length > 2 ? <CustomInputText
                            placeholder={"Vehicle Color"}
                            value={vrnDetails?.vehicleColour}
                            onChangeText={(text: string) => setVehicleColor(text)}
                            isEditable={false}
                        /> : <SelectField dataToRender={colorData} title={'Select Vehicle Color'} selectedValue={(color: string) => setColorData(color, setVehicleColor)} borderColor={!vrnDetails?.vehicleColour && !vehicleColor ? "red" : "black"} />}
                    </View>

                    {vrnDetails && vrnDetails?.npciVehicleClassID ? <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"NPCI Vehicle Class ID"} />
                        <CustomInputText placeholder={"NPCI Vehicle Class ID"} value={vrnDetails?.npciVehicleClassID} isEditable={false} />
                    </View> :
                        <View style={{ marginTop: "5%" }}>
                            <CustomLabelText label={"NPCI Class"} />
                            <SelectField dataToRender={npciVehicleClassIDData} title={'NPCI vehicle class'} selectedValue={(npciId: string) => setNpciIdDataDropdown(npciId, setNpciIdData)} borderColor={!npciIdData ? "red" : "black"} />
                        </View>
                    }

                </>

                <Text style={styles.label}>Tag serial number</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <View style={{ flex: 1, marginVertical: "5%" }}>
                        <CustomInputText placeholder={''} value='608268' onChangeText={(text: string) => setTagSerialNumber1(text)} isEditable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <SelectField dataToRender={middleTagSerialNumber} title={tagSerialNumber2 || 'select'} selectedValue={(value: any) => setTagSerialNumber2(value.value)} borderColor={!tagSerialNumber2 ? "red" : "black"} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomInputText placeholder={''} value={tagSerialNumber3} onChangeText={(text: string) => setTagSerialNumber3(text)} borderColor={tagSerialNumber3?.length < 2 ? "red" : "#263238"} keyboardType={"numeric"} />
                    </View>
                </View>

                <View style={{ marginBottom: "5%" }}>
                    {vrnDetails && vrnDetails?.type && vrnDetails?.tagVehicleClassID === '4' ? <View style={{ marginTop: "5%" }}>
                        <CustomLabelText label={"Vehicle Type"} />
                        <CustomInputText placeholder={"Vehicle Type"} value={vrnDetails?.type} isEditable={false} />
                    </View> :
                        <View style={{ marginTop: "5%" }}>
                            <CustomLabelText label={"Vehicle Type"} />
                            <SelectField dataToRender={vehicleTypeDropdown} title={'Select Vehicle Type'} selectedValue={(value: any) => onVechileTypeSelect(value.value,
                                setTypeOfVehicle, setVehicleType, vehicleIscommercial)} borderColor={!typeOfVehicle ? "red" : "black"} />
                        </View>
                    }
                </View>

                <View style={{ marginBottom: "5%" }}>
                    <CustomLabelText label={"Is Commercial"} />
                    <SelectField
                        dataToRender={commercialOptions} title={'Select isCommercial'} selectedValue={(value: any) => setVehicleIscommercial(value.value)} borderColor={!vehicleIscommercial ? "red" : "black"} />
                </View>
                {vehicleIscommercial === "true" &&
                    <View style={{ marginBottom: "5%" }}>
                        <CustomLabelText label={"Is National Permit"} />
                        <SelectField
                            dataToRender={isNationalPermitOptions} title={'Select National Permit'} selectedValue={(value: any) => setNationalPermit(value.value)} borderColor={!nationalpermit ? "red" : "black"} />
                    </View>}

                {vehicleIscommercial === "true" && nationalpermit === "1" &&
                    <View>
                        <CustomLabelText label={"Enter Permit Expiry of Vehicle"} />
                        <CustomInputText
                            placeholder='DD-MM-YYYY'
                            placeholderTextColor='#263238'
                            style={styles.dateInput}
                            value={permitExpiryDate}
                            onChangeText={(text: string) => handleDateChange(text, setPermitExpiryDate)}
                            keyboardType='numeric'
                            maxLength={10}
                            borderColor={permitExpiryDate?.length < 2 ? "red" : "#263238"}
                        />
                    </View>
                }


                <View style={{ marginVertical: "5%" }}>
                    <CustomLabelText label={"Fuel Type"} />
                    {
                        vrnDetails && vrnDetails?.vehicleDescriptor ? <CustomInputText placeholder={'Enter fuel type'} value={vrnDetails?.vehicleDescriptor} isEditable={false} /> : <SelectField
                            dataToRender={fuelData} title={'Select fuel type'} selectedValue={(value: any) => setVehicleFuelType(value.title)}
                            borderColor={!vehicleFuelType ? "red" : "black"}
                        />
                    }
                </View>

                {
                    vrnDetails && !vrnDetails?.stateOfRegistration && <View style={{ marginVertical: "5%" }}>
                        <CustomLabelText label={"State of Registration"} />
                        <SelectField
                            dataToRender={stateData} title={'Select Vehicle State'} selectedValue={(value: any) => setStateOfRegistration(value.code)} borderColor={!stateOfRegistration ? "red" : "black"} />
                    </View>

                }
                {
                    stateOfRegistration === 'TELANGANA' && <View style={{ marginVertical: "5%" }}>
                        <CustomLabelText label={"Select State Code"} />
                        <SelectField
                            dataToRender={telanganaStateCode} title={'Select Vehicle State'} selectedValue={(value: any) => setStateCode(value.code)} borderColor={!stateCode ? "red" : "black"} />
                    </View>
                }

                <View style={styles.dataDetailContainer}>
                    {customerData && customerData.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ marginTop: 20, justifyContent: "center" }}>
                    <SecondaryButton
                        title={"Submit"}
                        onPress={registerFastagApi}
                    />
                </View>
            </View>

            <SuccessModal visible={modalVisible!} onClose={() => {
                setModalVisible(false)
                setIsModalSuccess(null)
            }}
                isSuccess={isModalSuccess}
            />
        </ScrollView >
    )
}


export default TagRegistration;