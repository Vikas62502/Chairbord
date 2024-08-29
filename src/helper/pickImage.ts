// import { Alert } from "react-native";
// import ImageCropPicker from "react-native-image-crop-picker";

// const pickImage = async () => {
//     try {
//         const image: any = await ImageCropPicker.openPicker({
//             cropping: false,
//             compressImageMaxWidth: 800,
//             compressImageMaxHeight: 800,
//             compressImageQuality: 0.8,
//             includeBase64: true
//         });
//         const base64String: string = `data:${image.mime};base64,${image.data}`;
//         if (image.size <= 300000) {
//             return base64String;
//         } else {
//             Alert.alert('Image too large', 'Please select an image smaller than 300KB');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

// export default pickImage;

import { Alert } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";

const compressImage = async () => {
    console.log('compressImage');
    try {
        let compressQuality = 1.0; // Start with the best quality
        let compressedImage;

        do {
            compressedImage = await ImageCropPicker.openPicker({
                cropping: false,
                compressImageMaxWidth: 1000, // Adjust the width
                compressImageMaxHeight: 1000, // Adjust the height
                compressImageQuality: compressQuality,
                includeBase64: true,
            });
            compressQuality -= 0.1; // Reduce the quality step by step
        } while (compressedImage.size > 500000 && compressQuality > 0);

        const base64String = `data:${compressedImage.mime};base64,${compressedImage.data}`;

        if (compressedImage.size <= 500000) {
            console.log('Image compressed', compressedImage.size);
            return base64String;
        } else {
            Alert.alert('Image too large', 'Please select a smaller image or crop it.');
        }
    } catch (error) {
        console.error(error);
    }
};

export default compressImage;
