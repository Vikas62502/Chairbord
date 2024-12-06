import { launchCamera } from 'react-native-image-picker';

const pickImageFromCamera = async () => {
    const options: any = {
        mediaType: 'photo', // You can also use 'video' or 'mixed' if needed
        cameraType: 'back', // Use 'front' for the front-facing camera
        saveToPhotos: true, // Saves the photo to the user's gallery
    };

    return new Promise((resolve, reject) => {
        launchCamera(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
                resolve(null); // Return null if the user cancels
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                reject(response.errorMessage); // Handle error if needed
            } else {
                const source = {
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                };
                console.log('Captured Image Source:', source);
                resolve(source); // Resolve the source as the captured image
            }
        });
    });
};

export default pickImageFromCamera;
