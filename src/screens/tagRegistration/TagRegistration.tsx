import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { colorData, npciVehicleClassIDData } from './staticData'
import pickImage from '../../helper/pickImage'
import OverlayHeader from '../../components/OverlayHeader'
import InputText from '../../components/common/InputText'
import SelectField from '../../components/common/SelectField'
import SecondaryButton from '../../components/common/SecondaryButton'
import SuccessModal from '../../components/SuccessModal'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale, verticalScale } from '../../helper/Metrics'

const TagRegistration = (props: any) => {
    // Dummy data for testing
    const custDetails = {
        name: "John Doe",
        mobileNo: "1234567890",
        walletId: "wallet123"
    };

    const vrnDetails = {
        vehicleNo: "ABC1234",
        vehicleManuf: "Toyota",
        model: "Camry",
        vehicleColour: "Red",
        type: "Sedan",
        isCommercial: false,
        rechargeAmount: "500",
        tagCost: "200",
        securityDeposit: "100"
    };

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
                <InputText placeholder={"Enter vehicle number"} value={vrnDetails?.vehicleNo || props?.route?.params?.vehicleNo} editable={!vrnDetails?.vehicleNo}
                    onChangeText={(text: string) => setVehicleNumber(text)}
                />
                {vrnDetails?.vehicleManuf === undefined ?
                    <>
                        <View style={{ marginTop: "5%" }}>
                            <SelectField
                                dataToRender={dropdownOptions} title={'Select Vehicle Manufacturer'} selectedValue={(value) => setVehicleManufacturer(value.title)} />
                        </View>
                        <View style={{ marginTop: "5%" }}>
                            <SelectField
                                dataToRender={vehicleModalDropdown} title={'Select Vehicle Model'} selectedValue={setValueOfVehcileModal} />
                        </View>
                        <View style={{ marginTop: "5%" }}>
                            <SelectField
                                dataToRender={colorData} title={'Select Vehicle Color'} selectedValue={setColorData} />
                        </View>
                    </> : <View>
                        <InputText placeholder={""} value={vrnDetails?.vehicleManuf}
                            editable={!vrnDetails?.vehicleManuf}
                        />
                        <InputText placeholder={""} value={vrnDetails?.model}
                            editable={!vrnDetails?.model}
                        />
                        <InputText placeholder={""} value={vrnDetails?.vehicleColour}
                            editable={!vrnDetails?.vehicleColour}
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
                            <View style={styles.imagePlaceholder}>
                                <Text style={styles.imagePlaceholderText}>Front</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setImageData('back')}>
                        {documentBack ? (
                            <Image
                                source={{ uri: documentBack }}
                                style={{ width: 150, height: 150, marginTop: 10 }}
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={styles.imagePlaceholderText}>Back</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Vehicle photo</Text>
                <TouchableOpacity onPress={() => setImageData('vehicle')}>
                    {vehicleImage ? (
                        <Image
                            source={{ uri: vehicleImage }}
                            style={{ width: 150, height: 150, marginTop: 10 }}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>Vehicle</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.dataDetailContainer}>
                    {customerData && customerData.map((data, index) => (
                        <View style={styles.customerDetailsContainer} key={index}>
                            <Text style={styles.customerDetailsTitleText}>{data.title}</Text>
                            <Text style={styles.customerDetailsValueText}>{data.value}</Text>
                        </View>
                    ))}
                </View>
                <InputText placeholder={"Enter recharge amount"} value={rechargeAmount}
                    onChangeText={(text: string) => setRechargeAmount(text)}
                />

                <View style={{ marginTop: 20 }}>
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
        // padding: "5%"
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


export default TagRegistration;
