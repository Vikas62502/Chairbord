import ImagePicker from 'react-native-image-crop-picker';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

const pickImageFromCamera = async () => {
    return new Promise((resolve, reject) => {
        // Open the camera to capture an image with resizing and compression options
        ImagePicker.openCamera({
            width: 800,  // Resize image width to 800px
            height: 800,  // Resize image height to 800px
            compressImageMaxWidth: 800,  // Maximum width after compression
            compressImageMaxHeight: 800,  // Maximum height after compression
            compressImageQuality: 1,  // Compress quality (from 0 to 1)
            mediaType: 'photo',
            saveToPhotos: true,  // Save the photo to the gallery
        }).then((image) => {
            const { path, size, filename, mime } = image;
            console.log('Image captured:', size);

            if (size > MAX_FILE_SIZE) {
                console.log('File exceeds 2 MB. Further compressing...');
                // Further compress if the file is still larger than 2MB
                resolve({
                    uri: path,
                    name: filename,
                    type: mime,
                });
            } else {
                resolve({
                    uri: path,
                    name: filename,
                    type: mime,
                });
            }
        }).catch((err) => {
            console.log('Error capturing image:', err);
            reject(err);
        });
    });
};

export default pickImageFromCamera;
