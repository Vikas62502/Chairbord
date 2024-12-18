import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorData, npciVehicleClassIDData, commercialOptions, fuelData, stateData, isNationalPermitOptions, telanganaStateCode, vehicleTypeDropdown, middleTagSerialNumber, manufacturerData } from './staticData'
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
            CustomerRegData: {
                name: 'John Doe',
                mobileNo: '1234567890',
                walletId: '987654321',
            },
            userOtpData: {
                vehicleNo: 'DL1CAB1234',
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
    const [errors, setErrors] = useState<any>()
    const [stateCode, setStateCode] = useState("")
    console.log(errors, "<---- errors");


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
        // setNpciIdData(vrnDetails?.npciVehicleClassID)
        const dynamicDebitAmount = Number(vrnDetails?.rechargeAmount || 0) + Number(vrnDetails?.repTagCost) + Number(vrnDetails?.securityDeposit) + Number(vrnDetails?.tagCost)
        const typeOfVehicleData = vrnDetails?.type || npciIdData === "4" ? "LMV" : npciIdData === "20" ? "LGV" : null
        const vehicleTypeData = vrnDetails?.vehicleType || npciIdData === "4" ? "Motor Car" : npciIdData === "20" ? "Goods Carrier" : null
        const agentNameData = userData?.user?.name || CustomerRegData?.name || ""
        const vrnNumberData = vrnDetails?.vehicleNo || userOtpData?.vehicleNo?.toUpperCase()
        const chassisData = vrnDetails?.chassisNo || chassisNo
        const engineData = vrnDetails?.engineNo || engineNumber
        const vehicleManufacturerData = vrnDetails?.vehicleManuf || vehicleManufacturer
        const vehicleModelData = vrnDetails?.model === "NA" ? vehicleModelValue : vrnDetails?.model || vehicleModelValue
        const vehicleColorData = vrnDetails?.vehicleColour || vehicleColor
        const vehicleFuelTypeData = vrnDetails?.vehicleDescriptor || vehicleFuelType
        if (!validateFields(chassisData, vehicleManufacturerData, vehicleModelData, vehicleColorData, npciIdData, vehicleFuelTypeData, vehicleIscommercial, setErrors,)) {
            return;
        }
        setLoading(true)
        try {
            const bodyData = JSON.stringify({
                "regDetails": {
                    "sessionId": props.route.params?.sessionId
                },
                "agentId": Number(userData?.user?.id),
                "masterId": Number(userData?.user?.master_id) || "",
                "agentName": agentNameData,
                "vrnDetails": {
                    "vrn": vrnNumberData,
                    "chassis": chassisData,
                    "engine": engineData,
                    "vehicleManuf": vehicleManufacturerData,
                    "model": vehicleModelData,
                    "vehicleColour": vehicleColorData,
                    "type": typeOfVehicleData,
                    "status": "Active",
                    "npciStatus": "Active",
                    "isCommercial": vehicleIscommercial,
                    "tagVehicleClassID": "4",
                    "npciVehicleClassID": npciIdData,
                    "vehicleType": vehicleTypeData,
                    "rechargeAmount": vrnDetails?.rechargeAmount,
                    "securityDeposit": vrnDetails?.securityDeposit,
                    "tagCost": vrnDetails?.tagCost,
                    "debitAmt": dynamicDebitAmount.toString(),
                    "vehicleDescriptor": vehicleFuelTypeData,
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
            const res = await client.post("/bajaj/registerFastag",
                bodyData
            )
            successResponse(setIsModalSuccess, setModalVisible)
        } catch (error: any) {
            const errorMessage = error.response.data.error.msg || error.response.data.error.errorDesc
            console.log(error || 'Tag registration failed')
            showAlert(error.response.data.error.msg || error.response.data.error.errorDesc || 'Tag registration failed',
                () => {
                    errorMessage === "Please upload correct car front image" ? props?.navigation?.goBack() : ""
                });
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getMakerIfVahanFails(props.route.params?.sessionId, setListOfMakers);
    }, [sessionId, vrnDetails?.vehicleManuf, vrnDetails?.model])


    return (
        <View style={{ flex: 1 }}>
            <OverlayHeader title={"Tag Registration"} />
            <ScrollView>
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

                        {vrnDetails && vrnDetails?.model === "NA" || !vrnDetails?.model &&
                            <View style={{ marginTop: "5%" }}>
                                <CustomLabelText label={"Vehicle Color"} />
                                <SelectField dataToRender={colorData} title={'Select Vehicle Color'} selectedValue={(color: string) => setColorData(color, setVehicleColor)} borderColor={!vrnDetails?.vehicleColour && !vehicleColor ? "red" : "black"} />
                            </View>
                        }

                        {/* {vrnDetails && !vrnDetails?.npciVehicleClassID && */}
                        <View style={{ marginTop: "5%" }}>
                            <CustomLabelText label={"NPCI Class"} />
                            <SelectField dataToRender={npciVehicleClassIDData} title={vrnDetails?.npciVehicleClassID || 'NPCI vehicle class'} selectedValue={(npciId: string) => setNpciIdDataDropdown(npciId, setNpciIdData)} borderColor={!npciIdData ? "red" : "black"} />
                        </View>
                        {/* } */}

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

                    {/* <View style={{ marginBottom: "5%" }}>
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
                </View> */}

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
                        <View style={{ marginBottom: "5%" }}>
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


                    {!vrnDetails?.vehicleDescriptor &&
                        <View style={{ marginVertical: "5%" }}>
                            <CustomLabelText label={"Fuel Type"} />
                            <SelectField
                                dataToRender={fuelData} title={'Select fuel type'} selectedValue={(value: any) => setVehicleFuelType(value.title)}
                                borderColor={!vehicleFuelType ? "red" : "black"}
                            />
                        </View>
                    }

                    {!vrnDetails?.stateOfRegistration &&
                        <View style={{ marginVertical: "5%" }}>
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
        </View>
    )
}


export default TagRegistration;