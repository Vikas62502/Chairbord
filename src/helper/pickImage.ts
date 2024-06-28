import { Alert } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";

const pickImage = async () => {
    try {
        const image: any = await ImageCropPicker.openPicker({
            cropping: false,
            compressImageMaxWidth: 800,
            compressImageMaxHeight: 800,
            compressImageQuality: 0.8,
            includeBase64: true
        });
        const base64String: string = `data:${image.mime};base64,${image.data}`;
        if (image.size <= 300000) {
            return base64String;
        } else {
            Alert.alert('Image too large', 'Please select an image smaller than 300KB');
        }
    } catch (error) {
        console.error(error);
    }
};

export default pickImage;