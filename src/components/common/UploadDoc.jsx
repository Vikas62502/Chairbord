// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground
// } from 'react-native'
// import React from 'react'
// import pickImage from '../../helper/pickImage'
// import pickdoc from '../../helper/pickdoc'

// const UploadDoc = ({
//   text,
//   setUploadFile,
//   backgroundType,
//   uploadDoc = false
// }) => {
//   const pickData = async (uploadDocType) => {
//     if (uploadDocType) {
//       const file = await pickdoc()
//       if (file) {
//         console.log('Document selected:', file)
//         setUploadFile(file)
//       }
//     } else {
//       const file = await pickImage()
//       if (file) {
//         console.log('Image selected:', file)
//         setUploadFile(file)
//       }
//     }
//   }

//   // Define the background image based on the component type
//   const getBackgroundImage = () => {
//     switch (backgroundType) {
//       case 'RC':
//         return require('../../assets/Background/rc.webp') // Path to RC background image
//       case 'FASTAG':
//         return require('../../assets/Background/fastag-1.png') // Path to FASTag background image
//       case 'Vehicle-Front':
//         return require('../../assets/Background/bgremove-front.png')
//       case 'Vehicle-Side':
//         return require('../../assets/Background/bgremove-side.png')
//       case 'Pan-Card':
//         return require('../../assets/Background/pan.jpg')
//       case 'Aadhar-Card':
//         return require('../../assets/Background/aadhar.png')
//       case 'POS':
//         return require('../../assets/Background/pos.jpg')
//       case 'E-Sign':
//         return require('../../assets/Background/e-sign.jpg')
//       default:
//         return require('../../assets/uploadLogo.png') // Default background image
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.buttonContainer}
//         onPress={() => pickData(uploadDoc)}
//       >
//         <ImageBackground
//           source={getBackgroundImage()}
//           style={styles.backgroundImage}
//           imageStyle={{ borderRadius: 20 }} // Add border radius to the background image
//         >
//           {/* Overlay to enhance logo visibility */}
//           <View style={styles.overlay}>
//             <View style={styles.content}>
//               <Image
//                 source={require('../../assets/uploadLogo.png')}
//                 style={styles.uploadLogo}
//               />
//               <Text style={styles.text}>{text}</Text>
//             </View>
//           </View>
//         </ImageBackground>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//     borderColor: 'black',
//     height: 100,
//     width: 'auto',
//     borderWidth: 1
//   },
//   buttonContainer: {
//     flex: 1,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F3F3F3',
//     width: '99%',
//     height: '97%',
//     margin: 1,
//     borderRadius: 20
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//     borderRadius: 20
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 255, 255, .8)', // Semi-transparent white overlay
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20
//   },
//   content: {
//     alignItems: 'center'
//   },
//   uploadLogo: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain'
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: 'black',
//     textAlign: 'center'
//   }
// })

// export default UploadDoc


import React, { useRef } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import pickImage from '../../helper/pickImage'
import pickdoc from '../../helper/pickdoc'

const UploadDoc = ({
  text,
  setUploadFile,
  backgroundType,
  uploadDoc = false
}) => {
  const actionSheetRef = useRef()

  const handleActionSheet = (index) => {
    if (index === 0) {
      launchCamera({
        mediaType: uploadDoc ? 'mixed' : 'photo',
        quality: 1,
      }).then(result => {
        if (result.assets && result.assets.length > 0) {
          setUploadFile(result.assets[0])
        }
      })
    } else if (index === 1) {
      launchImageLibrary({
        mediaType: uploadDoc ? 'mixed' : 'photo',
        quality: 1,
      }).then(result => {
        if (result.assets && result.assets.length > 0) {
          setUploadFile(result.assets[0])
        }
      })
    }
  }

  // const pickData = async () => {
  //   Alert.alert(
  //     'Select Option',
  //     'Choose an option to upload your document:',
  //     [
  //       {
  //         text: 'Camera',
  //         onPress: async () => {
  //           const result = await launchCamera({
  //             mediaType: uploadDoc ? 'mixed' : 'photo', // Change this based on your needs
  //             quality: 1, // Adjust quality as needed
  //           })
  //           if (result.assets && result.assets.length > 0) {
  //             const file = result.assets[0]
  //             console.log('Image taken:', file)
  //             setUploadFile(file)
  //           }
  //         },
  //       },
  //       {
  //         text: 'Gallery',
  //         onPress: async () => {
  //           const result = await launchImageLibrary({
  //             mediaType: uploadDoc ? 'mixed' : 'photo',
  //             quality: 1,
  //           })
  //           if (result.assets && result.assets.length > 0) {
  //             const file = result.assets[0]
  //             console.log('Image selected from gallery:', file)
  //             setUploadFile(file)
  //           }
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: true }
  //   )
  // }



  // Define the background image based on the component type
  const getBackgroundImage = () => {
    switch (backgroundType) {
      case 'RC':
        return require('../../assets/Background/rc.webp') // Path to RC background image
      case 'FASTAG':
        return require('../../assets/Background/fastag-1.png') // Path to FASTag background image
      case 'Vehicle-Front':
        return require('../../assets/Background/bgremove-front.png')
      case 'Vehicle-Side':
        return require('../../assets/Background/bgremove-side.png')
      case 'Pan-Card':
        return require('../../assets/Background/pan.jpg')
      case 'Aadhar-Card':
        return require('../../assets/Background/aadhar.png')
      case 'POS':
        return require('../../assets/Background/pos.jpg')
      case 'E-Sign':
        return require('../../assets/Background/e-sign.jpg')
      default:
        return require('../../assets/uploadLogo.png') // Default background image
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        // onPress={pickData}
        onPress={() => actionSheetRef.current.show()}
      >
        <ImageBackground
          source={getBackgroundImage()}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 20 }} // Add border radius to the background image
        >
          {/* Overlay to enhance logo visibility */}
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Image
                source={require('../../assets/uploadLogo.png')}
                style={styles.uploadLogo}
              />
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title={'Choose Option'}
        options={['Take a Photo', 'Choose from Gallery', 'Cancel']}
        cancelButtonIndex={2}
        onPress={handleActionSheet}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    height: 100,
    width: 'auto',
    borderWidth: 1
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    width: '99%',
    height: '97%',
    margin: 1,
    borderRadius: 20
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, .8)', // Semi-transparent white overlay
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  content: {
    alignItems: 'center'
  },
  uploadLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center'
  }
})

export default UploadDoc


// import React, { useRef } from 'react'
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground
// } from 'react-native'
// import ActionSheet from 'react-native-actionsheet'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
// import pickdoc from '../../helper/pickdoc'

// const UploadDoc = ({
//   text,
//   setUploadFile,
//   backgroundType,
//   uploadDoc = false
// }) => {
  // const actionSheetRef = useRef()

  // const handleActionSheet = (index) => {
  //   if (index === 0) {
  //     launchCamera({
  //       mediaType: uploadDoc ? 'mixed' : 'photo',
  //       quality: 1,
  //     }).then(result => {
  //       if (result.assets && result.assets.length > 0) {
  //         setUploadFile(result.assets[0])
  //       }
  //     })
  //   } else if (index === 1) {
  //     launchImageLibrary({
  //       mediaType: uploadDoc ? 'mixed' : 'photo',
  //       quality: 1,
  //     }).then(result => {
  //       if (result.assets && result.assets.length > 0) {
  //         setUploadFile(result.assets[0])
  //       }
  //     })
  //   }
  // }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.buttonContainer}
//         onPress={() => actionSheetRef.current.show()} // Show ActionSheet on press
//       >
//         <ImageBackground
//           // source={getBackgroundImage()}
//           style={styles.backgroundImage}
//           imageStyle={{ borderRadius: 20 }}
//         >
//           <View style={styles.overlay}>
//             <View style={styles.content}>
//               <Image
//                 source={require('../../assets/uploadLogo.png')}
//                 style={styles.uploadLogo}
//               />
//               <Text style={styles.text}>{text}</Text>
//             </View>
//           </View>
//         </ImageBackground>
//       </TouchableOpacity>

      // <ActionSheet
      //   ref={actionSheetRef}
      //   title={'Choose Option'}
      //   options={['Take a Photo', 'Choose from Gallery', 'Cancel']}
      //   cancelButtonIndex={2}
      //   onPress={handleActionSheet}
      // />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   /* Same styles as before */
// })

// export default UploadDoc
