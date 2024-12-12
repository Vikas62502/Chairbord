import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions
} from 'react-native'
import VerticalDivider from '../../components/common/VerticalDivider'
import axios from 'axios'
import { Buffer } from 'buffer';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { formatDate, formatTime } from './utils';
import { styles } from './styles';
import DetailsModal from './DetailsModal';
const pendingCommisionIcon = require('../../assets/commision/commissionPending.png')
const commisionDeniedIcon = require('../../assets/commision/commissionDenied.png')
const commisionApprovedIcon = require('../../assets/commision/commsionApprove.png')
const commisionPartaillyPaidIcon = require('../../assets/commision/partialCommission.png')
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isSmallScreen = width < 400;
const IssuanceCards = ({ data }) => {
  // commision icons
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [singleReportData, setSingleReportData] = useState(data)
  console.log(singleReportData, 'singleReportData')

  const reportDetailsData = [
    { title: 'Customer Name', value: singleReportData?.customerName || 'N/A' },
    { title: 'Customer ID', value: singleReportData?.BajajCustomerDetailId || 'N/A' },
    { title: 'Vehicle Number', value: singleReportData?.BajajVehicleDetailsId || 'N/A' },
    { title: 'Tag Serial Number', value: singleReportData?.tagSerialNumber || 'N/A' },
    { title: 'Vehicle Class', value: singleReportData?.vehicleDetail?.npciVehicleClassID || 'N/A' },
    { title: 'Engine Number', value: singleReportData?.vehicleDetail?.engineNo || 'N/A' },
    { title: 'Commercial Status', value: JSON.stringify(singleReportData?.vehicleDetail?.isCommercial) || 'N/A' },
    { title: 'Chassis Number', value: singleReportData?.vehicleDetail?.chassisNo || 'N/A' },
  ]

  async function modifyImage(imageURL) {
    console.log(imageURL, "< ---- imageURL here")
    try {
      // Fetch the image as an array buffer
      const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
      const fileBuffer = Buffer.from(response && response?.data, 'binary');

      // Convert to base64
      let base64Data = fileBuffer?.toString('base64');
      base64Data = base64Data.replace("dataimage/jpegbase64", '');
      // Construct the full data URL
      const dataURL = `data:image/png;base64,${base64Data}`;
      return dataURL;
    } catch (error) {
      console.error('Error processing the image:', error);
      return null;
    }
  }

  const images = singleReportData?.customerDetail?.vehicles[0]?.fastTags[0];
  const processImages = async () => {
    if (images.TAGaFixImage) {
      images.TAGaFixImage = await modifyImage(images.TAGaFixImage);
    }

    if (images.rcImageBack) {
      images.rcImageBack = await modifyImage(images.rcImageBack);
    }

    if (images.rcImageFront) {
      images.rcImageFront = await modifyImage(images.rcImageFront);
    }

    if (images.vehicleImageFront) {
      images.vehicleImageFront = await modifyImage(images.vehicleImageFront);
    }

    if (images.vehicleImageSide) {
      images.vehicleImageSide = await modifyImage(images.vehicleImageSide);
    }
  };

  useEffect(() => {
    if (data) {
      processImages();
    }
  }, [])


  // const requestStoragePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission',
  //           message: 'App needs access to your storage to download images',
  //         }
  //       );
  //       console.log(granted, "permission granted");
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       console.log("error in permission")
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   console.log("permisssion called _________")
  //   requestStoragePermission();
  // }, []);

  const downloadImage = async () => {

    if (!hasPermission) {
      Alert.alert('Error', 'Storage permission is required.');
      return;
    }

    if (images?.rcImageFront) {
      const imageURI = images.rcImageFront;
      const fileName = imageURI.split('/').pop(); // Get the image name from the URI
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`; // Path to save the image

      try {
        const result = await RNFS.downloadFile({
          fromUrl: imageURI,
          toFile: downloadDest,
        }).promise;

        if (result && result.statusCode === 200) {
          Alert.alert('Success', 'Image downloaded successfully!');
        } else {
          Alert.alert('Error', 'Failed to download the image.');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred while downloading the image.');
      }
    } else {
      Alert.alert('Error', 'No image URI found.');
    }
  };


  if (singleReportData?.commercialStatus === true) {
    console.log(singleReportData?.customerName)
  }


  const tagComm = singleReportData?.agent?.TagCommissions[0]
  const verificationStatus = singleReportData?.agent?.verificationStatus

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: `${data.ribbonBgColor}`,
          backgroundColor:
            singleReportData?.commercialStatus === true ? 'yellow' : 'white',
          padding: '4%',
          borderRadius: 10
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              // backgroundColor: `${'data.color'}`,
              backgroundColor: '#ff5733', // Example custom color (hex value)
              borderRadius: 50,
              marginRight: '5%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              width: 30
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 19
              }}
            >
              {singleReportData?.vehicleClass}
            </Text>
          </View>


          <View>
            <Text style={styles.idText}>
              {singleReportData?.tagSerialNumber}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>
                {formatDate(singleReportData?.createdAt)}
              </Text>
              <VerticalDivider />
              <Text style={styles.dateAndTimeText}>
                {formatTime(singleReportData?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        {/* 
        <View>
          <Text style={styles.amount}>
            {verificationStatus === 'verified' ? `₹ ${tagComm?.VC4}` : `₹0`}
          </Text>
        </View> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: '5%'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ gap: 2 }}>
            <Text style={styles.nametext}>
              {singleReportData?.customerName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                borderWidth: 3,
                borderColor: '#000000',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 10,
                marginTop: '3%',
                backgroundColor: `${data.isCommercial ? '#FAFF00' : '#FFFFFF'}`,
                alignSelf: 'flex-start' // Allows the container to wrap around the content
              }}
            >
              <Image
                source={require('../../assets/commision/indNamePlate.png')}
              />
              <Text style={styles.vehicletext}>
                {singleReportData?.BajajVehicleDetailsId}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 12, justifyContent: 'flex-end' }}>
          {/* <Text style={styles.mobiletext}>9158628546</Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: '3%'
            }}
          >
            <Image source={require('../../assets/bankIcon.png')} style={{ width: 24, height: 22 }} />
            <Text style={styles.bankText}> Bajaj </Text>
          </View>
        </View>
      </View>
      <View
        style={{ height: '0.3%', width: '100%', backgroundColor: '#959595' }}
      ></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '4%'
        }}
      >
        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/eyeIcon.png')}
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Image
          source={
            data.status === 'Declined'
              ? commisionDeniedIcon
              : data.status === 'Pending'
                ? pendingCommisionIcon
                : data.status === 'Approved'
                  ? commisionApprovedIcon
                  : commisionPartaillyPaidIcon
          }
        />
        <Image source={require('../../assets/dangerPalm.png')} style={{ width: 25, height: 25 }} />
      </View>
      <DetailsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        reportDetailsData={reportDetailsData}
        images={images}
        downloadImage={downloadImage}
      />
    </View>
  )
}

export default IssuanceCards