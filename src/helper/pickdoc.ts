import { launchImageLibrary } from 'react-native-image-picker'

const pickdoc = async () => {
    const options: any = {
        mediaType: 'photo',
    }

    return new Promise((resolve, reject) => {
        launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
                resolve(null) // Return null if the user cancels
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage)
                reject(response.errorMessage) // Handle error if needed
            } else {
                const source = {
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                }
                console.log('source', source)
                resolve(source) // Resolve the source as the file selected
            }
        })
    })
}

export default pickdoc
