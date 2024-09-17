import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  Pressable,
  Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import OverlayHeader from '../../components/OverlayHeader'
import PrimaryBtn from '../../components/common/PrimaryBtn'
import InputText from '../../components/common/InputText'
import { launchImageLibrary } from 'react-native-image-picker'
import LocationBtn from '../../components/common/LocationBtn'
import UploadDoc from '../../components/common/UploadDoc'
import { client } from '../../client/Axios'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768

const AdditionalDetails = (props: any) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [contactPersonData, setContactPersonData] = useState<any>({
    contactPersonName: '',
    contactPersonNumber: ''
  })

  // State for storing images
  const [posLocationImage, setPosLocationImage] = useState<any>(null)
  const [eSign, setESign] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('POS Location Image:', posLocationImage)
  }, [posLocationImage])

  useEffect(() => {
    console.log('E-Sign Image:', eSign)
  }, [eSign])

  const formDataHandler = (key: string, value: string) => {
    setContactPersonData({
      ...contactPersonData,
      [key]: value
    })
  }

  const requestLocationPermission = async () => {
    try {
      let permissionResult
      if (Platform.OS === 'android') {
        permissionResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      } else {
        permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      }

      if (permissionResult === RESULTS.GRANTED) {
        getCurrentLocation()
      } else {
        Alert.alert('Permission Denied', 'Location permission is needed to access your location.')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        setLocationError(error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  // Image Picker function for POS Location or E-sign
  const pickImage = (typeOfImg: string) => {
    const options = {
      mediaType: 'photo'
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type
        }

        if (typeOfImg === 'POS Location') {
          setPosLocationImage(source) // Set POS Location image
        } else if (typeOfImg === 'E-Sign') {
          setESign(source) // Set E-sign image
        }
      }
    })
  }

  const handleSendData = async () => {
    setLoading(true);
    try {
      const form = new FormData()

      form.append('contact_person_name', contactPersonData?.contactPersonName)
      form.append('contact_person_mobile_number', contactPersonData?.contactPersonNumber)
      form.append('latitude', location?.latitude)
      form.append('longitude', location?.longitude)
      form.append('e_sign_photo', eSign);
      form.append('pos_proof_photo', posLocationImage)

      const response = await client.post('/cashfree/e-sign', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('E-Sign Verification success', response)
      Alert.alert('Success', 'E-sign Verified Successfully', [
        {
          text: 'Ok',
          onPress: () => props.navigation.navigate('dashboard')
        }
      ])

    } catch(error) {
      console.error('Something went wrong:', error)
      Alert.alert('Error', 'Something went wrong')
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader title={'Additional Details'} />
      <View style={styles.container}>
        <View style={{ marginBottom: 2 }}>
          <InputText
            value={contactPersonData.contactPersonName}
            placeholder={'Enter contact person name'}
            onChangeText={(text: string) => formDataHandler('contactPersonName', text)}
          />
        </View>
        <View style={{ marginBottom: 2 }}>
          <InputText
            placeholder={'Enter contact person number'}
            onChangeText={(text: string) => formDataHandler('contactPersonNumber', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={{ margin: 5 }}>
          <LocationBtn title={'Get POS Location'} onPress={requestLocationPermission} />
          {location && (
            <Text style={{ color: 'black', margin: 10 }}>
              Your Current location: Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          )}
          {locationError && <Text style={styles.errorText}>{locationError}</Text>}
        </View>

        {/* POS Location Image Upload */}
        <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
          {posLocationImage ? (
            <Pressable onPress={() => setPosLocationImage(null)}>
              <Image source={{ uri: posLocationImage.uri }} style={{ height: 100, width: '100%' }} />
            </Pressable>
          ) : (
            <UploadDoc
              text={'Upload POS Location Image'}
              setUploadFile={() => pickImage('POS Location')}
              backgroundType={'POS'}
            />
          )}
        </View>

        {/* E-sign Image Upload */}
        {/* <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
          {eSign ? (
            <Pressable onPress={() => setESign(null)}>
              <Image source={{ uri: eSign.uri }} style={{ height: 100, width: '100%' }} />
            </Pressable>
          ) : (
            <UploadDoc
              text={'Upload E-sign'}
              setUploadFile={() => pickImage('E-Sign')}
              backgroundType={'E-Sign'}
            />
          )}
        </View> */}
      </View>

      <View style={styles.bottomContainer}>
        <PrimaryBtn 
        title={'Next'}
        // onPress={() => handleSendData()}
        onPress={() => props.navigation.navigate('consentForm')}
         />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%'
  },
  label: {
    fontWeight: '400',
    fontSize: isTablet ? 20 : 16,
    lineHeight: 19,
    color: '#000000',
    marginBottom: 10
  },
  errorText: {
    padding: '0%',
    paddingHorizontal: '2%',
    color: '#FF0000'
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    height: '40%',
    padding: '5%'
  }
})

export default AdditionalDetails

// import { View, Text, SafeAreaView, StyleSheet, Alert, Dimensions, PermissionsAndroid, Platform } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';
// import { useNavigation } from '@react-navigation/native'
// import { getCache, setCache } from '../../helper/Storage'
// import OverlayHeader from '../../components/OverlayHeader'
// import CustomInputText from '../../components/common/CustomInputText'
// import PrimaryBtn from '../../components/common/PrimaryBtn'
// import SelectField from '../../components/common/SelectFieldBig'
// import InputText from '../../components/common/InputText'
// const { width, height } = Dimensions.get('window')
// const isTablet = width > 768;
// const isSmallScreen = width <= 420;
// import { client } from '../../client/Axios'
// import Loader from '../../components/ui/Loader'
// import LocationBtn from '../../components/common/LocationBtn';
// const AdditionalDetails = (props: any) => {
//     const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [address, setAddress] = useState({ city: '', state: '' });
//     const [locationError, setLocationError] = useState<string | null>(null);
//     console.log(location, 'location')
//     // const [userData, setUserData] = React.useState<any>()
//     // const [loading, setLoading] = React.useState(false)
//     // const [replacementOtpData, setReplacementOtpData] = React.useState<any>({
//     //     mobileNumber: '',
//     //     vehicleNumber: '',
//     //     engineNumber: ''
//     // })

//     // const formDatahandler = (key: string, value: string) => {
//     //     setReplacementOtpData({
//     //         ...replacementOtpData,
//     //         [key]: value
//     //     })
//     // }

//     // const sendOTP = async () => {
//     //     setLoading(true)
//     //     try {
//     //         const res = await client.post('/bajaj/sendOtp', {
//     //             requestId: '',
//     //             channel: '',
//     //             agentId: userData?.user?.id,
//     //             vehicleNo: replacementOtpData.vehicleNumber?.toUpperCase(),
//     //             chassisNo: '',
//     //             engineNo: replacementOtpData.engineNumber?.toUpperCase(),
//     //             mobileNo: replacementOtpData.mobileNumber,
//     //             reqType: 'REP',
//     //             resend: 0,
//     //             isChassis: 0,
//     //             udf1: '',
//     //             udf2: '',
//     //             udf3: '',
//     //             udf4: '',
//     //             udf5: '',
//     //         })
//     //         console.log(JSON.stringify(res), "otp response")

//     //         await setCache('session', res?.data?.validateCustResp?.sessionId)
//     //         props.navigation.navigate("OTP", {
//     //             otpData: res.data,
//     //             sessionId: res?.data?.validateCustResp?.sessionId,
//     //             VerificationFormData: replacementOtpData,
//     //             type: 'tagReplacement'
//     //         })
//     //         console.log(res, "otp response")
//     //     } catch (error) {
//     //         console.log(JSON.stringify(error), "error")
//     //     } finally {
//     //         setLoading(false)
//     //     }
//     // }
//     const requestLocationPermission = async () => {
//         try {
//             if (Platform.OS === 'android') {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                     {
//                         title: 'Location Access Required',
//                         message: 'This app needs to access your location',
//                         buttonNeutral: 'Ask Me Later',
//                         buttonNegative: 'Cancel',
//                         buttonPositive: 'OK',
//                     }
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     getCurrentLocation();
//                 } else {
//                     Alert.alert('Permission Denied', 'Location permission is needed to access your location.');
//                 }
//             } else {
//                 // For iOS
//                 getCurrentLocation();
//             }
//         } catch (err) {
//             console.warn(err);
//         }
//     };

//     const getCurrentLocation = () => {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setLocation({ latitude, longitude });
//             fetchCityAndState(latitude, longitude);
//           },
//           (error) => {
//             setLocationError(error.message);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       };
//     console.log(getCurrentLocation)
//     const fetchCityAndState = async (latitude, longitude) => {
//         const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

//         try {
//           const response = await axios.get(url, {
//             headers: {
//               'User-Agent': 'MyApp (myemail@example.com)', // Replace with your app name and email
//               'Referer': 'http://yourwebsite.com/' // Replace with your domain or app URL
//             }
//           });

//           if (response.data && response.data.address) {
//             const city = response.data.address.city || response.data.address.town || response.data.address.village || '';
//             const state = response.data.address.state || '';
//             setAddress({ city, state });
//           } else {
//             setLocationError('No results found for the provided coordinates.');
//           }
//         } catch (error) {
//           setLocationError('Error fetching location details.');
//           console.error('Error fetching location details:', error);
//         }
//       };
//     useEffect(() => {
//         requestLocationPermission();
//     }, []);

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <OverlayHeader title={"Additional Details"} />
//             <View style={styles.container}>
//                 <View style={{ marginBottom: 2 }}>

//                     <InputText
//                         // value={replacementOtpData.mobileNumber}
//                         placeholder={"Enter relative name"}
//                     // onChangeText={(text: string) => formDatahandler('mobileNumber', text)}
//                     />
//                 </View>
//                 <View style={{ marginBottom: 2 }}>

//                     <InputText
//                         // value={replacementOtpData.mobileNumber}
//                         placeholder={"Enter relative number"}
//                         // onChangeText={(text: string) => formDatahandler('mobileNumber', text)}
//                         keyboardType='numeric'
//                     />
//                 </View>
//                 <View style={{ marginVertical: 5}}>
//                     <LocationBtn title={'Get Current Location'} onPress={getCurrentLocation}/>
//                     {location.latitude && location.longitude ?  (
//                         <Text style={{ color: "black", margin: 10 }}>
//                             Your Current location: Latitude: {location.latitude}, Longitude: {location.longitude}
//                         </Text>
//                     ):(<Text style={styles.errorText}>{locationError}</Text>) }
//                     {address.city && address.state ? (
//           <Text style={{ color: "black", margin: 10 }}>
//             City: {address.city}, State: {address.state}
//           </Text>
//         ) : (<Text style={styles.errorText}>{locationError}</Text>) }
//                 </View>
//             </View>

//             <View style={styles.bottomContainer}>
//                 <PrimaryBtn title={"Next"} />
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: "5%",
//     },
//     label: {
//         fontWeight: '400',
//         fontSize: isTablet ? 20 : 16,
//         lineHeight: 19,
//         color: "#000000",
//         marginBottom: 10
//     },
//     errorText: {
//         padding: "0%",
//         paddingHorizontal: "2%",
//         color: "#FF0000",
//     },
//     bottomContainer: {
//         justifyContent: 'flex-end',
//         height: "40%",
//         padding: "5%",
//     },
// })

// export default AdditionalDetails
