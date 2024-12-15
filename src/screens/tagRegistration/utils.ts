import showAlert from "../../utils/showAlert";
import { getVehicleMakerList, getVehicleModelList } from "../../utils/vechileModalAndMaker";

export const handleDateChange = (text: string, setPermitExpiryDate: any) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned?.length > 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned?.length > 5) {
        cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5);
    }
    if (cleaned?.length > 10) {
        cleaned = cleaned.slice(0, 10);
    }

    setPermitExpiryDate(cleaned);
};

export const getMakerIfVahanFails = async (sessionId: string, setListOfMakers: any) => {
    const response: any = await getVehicleMakerList(sessionId)
    setListOfMakers(response?.vehicleMakerList)
}

export const getTheVehicleModel = async (manufacturer: any, sessionId: string, setVehicleManufacturer: any, setVehicleModel: any) => {
    setVehicleManufacturer(manufacturer?.title)
    const response: any = await getVehicleModelList(sessionId, manufacturer?.title)
    setVehicleModel(response?.vehicleModelList)
}

export // error validation
    const validateFields = (chassisNo: string, vehicleManufacturer: string, vehicleModelValue: string, vehicleColor: string, npciIdData: string, vehicleFuelType: string, vehicleIscommercial: string, typeOfVehicle: string, vehicleType: string, setErrors: any) => {
        let newErrors: any = {};

        if (!chassisNo) {
            newErrors.chassisNo = 'Chassis number is required';
        }

        if (!vehicleManufacturer) {
            newErrors.vehicleManufacturer = 'Vehicle Manufacturer is required';
        }

        if (!vehicleModelValue) {
            newErrors.vehicleModel = 'Vehicle Model is required';
        }

        if (!vehicleColor) {
            newErrors.vehicleColor = 'Vehicle Color is required';
        }

        if (!npciIdData) {
            newErrors.npciIdData = 'NPCI Class is required';
        }

        if (!vehicleFuelType) {
            newErrors.vehicleFuelType = 'Fuel Type is required';
        }

        if (!vehicleIscommercial) {
            newErrors.vehicleIscommercial = 'Is Commercial is required';
        }
        if (!typeOfVehicle) {
            newErrors.typeOfVehicle = 'Type of Vehicle is required';
        }

        if (!vehicleType) {
            console.log("callend")
            newErrors.vehicleType = 'Vehicle Type is required';
        }
        setErrors(newErrors);
        // Show alert if there are errors
        if (Object.keys(newErrors)?.length > 0) {
            showAlert('Please fill in all required fields');
            return false;
        }
        return true;
    }

export const onVechileTypeSelect = (type: string, setTypeOfVehicle: any, setVehicleType: any, vehicleIscommercial: string) => {
    console.log("setTypeOfVehicle:", setTypeOfVehicle); // Check if it's undefined or a function
    console.log("Type of:", typeof setTypeOfVehicle);   // Should log "function"

    if (typeof setTypeOfVehicle !== 'function') {
        throw new Error('setTypeOfVehicle is not a function or is undefined');
    }

    setTypeOfVehicle(type);

    if (vehicleIscommercial === "false" && type === "LPV") {
        setVehicleType("Maxi Cab");
    }
    if (vehicleIscommercial === "false" && type === "LGV") {
        setVehicleType("Goods Carrier");
    }
    if (vehicleIscommercial === "true" && type === "LPV") {
        setVehicleType("Maxi Cab");
    }
    if (vehicleIscommercial === "true" && type === "LGV") {
        setVehicleType("Goods Carrier");
    }
};



export const updatevehicleType = (value: string, tagVehicleClassID: string, vehicleIscommercial: string, setVehicleType: any) => {
    if (value === 'LMV' && tagVehicleClassID === '4' && vehicleIscommercial === 'false') {
        console.log("inside LMV   ->>>!#$24324>>>>>>>>>>>", value, tagVehicleClassID, vehicleIscommercial)
        setVehicleType('Motor Car')
    } else if (value === 'LMV' && tagVehicleClassID === '4' && vehicleIscommercial === 'true') {
        setVehicleType('Maxi Cab')
    }
}

export const successResponse = (setIsModalSuccess: any, setModalVisible: any) => {
    setIsModalSuccess(true);
    setModalVisible(true);
}

export const setValueOfVehcileModal = async (model: any, setVehicleModelValue: any) => {
    console.log("model", model, "setVehicleModelValue", setVehicleModelValue)
    setVehicleModelValue(model?.title)
}

export const setNpciIdDataDropdown = async (npciId: any, setNpciIdData: any) => {
    setNpciIdData(npciId?.value)
}

export const setColorData = async (color: any, setVehicleColor: any) => {
    setVehicleColor(color?.title)
}