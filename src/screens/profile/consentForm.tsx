// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable, Image, Modal } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import OverlayHeader from '../../components/OverlayHeader';
// import { launchImageLibrary } from 'react-native-image-picker';
// import UploadDoc from '../../components/common/UploadDoc';
// import { client } from '../../client/Axios';
// import SecondaryButton from '../../components/common/SecondaryButton';

// const ConsentForm = (props: any) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [eSign, setESign] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   const pickImage = (typeOfImg: string) => {
//     const options = {
//       mediaType: 'photo',
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const source = {
//           uri: response.assets[0].uri,
//           name: response.assets[0].fileName,
//           type: response.assets[0].type,
//         };

//         if (typeOfImg === 'E-Sign') {
//           setESign(source); // Set E-sign image
//         }
//       }
//     });
//   };

//   const handleSendData = async () => {
//     setLoading(true);
//     setModalVisible(true); // Open modal when submitting
//     // try {
//     //   const form = new FormData();
//     //   form.append('e_sign_photo', eSign);

//     //   const response = await client.post('/cashfree/e-sign', form, {
//     //     headers: { 'Content-Type': 'multipart/form-data' },
//     //   });
//     //   console.log('E-Sign Verification success', response);
//     //   Alert.alert('Success', 'E-sign Verified Successfully', [
//     //     {
//     //       text: 'Ok',
//     //       onPress: () => {
//     //         setModalVisible(false);
//     //         props.navigation.navigate('dashboard');
//     //       },
//     //     },
//     //   ]);
//     // } catch (error) {
//     //   console.error('Something went wrong:', error);
//     //   Alert.alert('Error', 'Something went wrong');
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   const handleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleCheckBox = () => {
//     setIsChecked(!isChecked);
//   };

//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <OverlayHeader title={'Consent Form'} />
//       <View style={styles.container}>
//         <View style={{ flex: 1, flexDirection: 'row' }}>
//           <Text style={styles.heading}>Name:</Text>
//           <Text style={styles.name}> Mohit Kumar</Text>
//         </View>
//         <View style={{ flex: 1, flexDirection: 'row' }}>
//           <Text style={styles.heading}>Aadhar Number:</Text>
//           <Text style={styles.aadhar}> XXXX-XXXX-XXXX</Text>
//         </View>

//         <View style={styles.consent}>
//           <View style={{ flex: 1, flexDirection: 'row' }}>
//             <Text style={styles.heading}>Consent:</Text>
//             <Text style={styles.consentHeading}>
//               Acknowledgement of Terms regarding employment with Chairbord Pvt. Ltd.
//             </Text>
//           </View>

//           {isExpanded && (
//             <View style={styles.consentList}>
//               <Text style={styles.consentItem}>
//                 1. I affirm that all the information and authorizations provided by me are accurate.
//               </Text>
//               <Text style={styles.consentItem}>
//                 2. I commit to performing my duties with integrity and accept full responsibility for any issues caused
//                 to customers due to my mistakes.
//               </Text>
//               <Text style={styles.consentItem}>
//                 3. I shall provide accurate and truthful information and will ensure that all required documents are
//                 submitted appropriately throughout the work process for all products.
//               </Text>
//               <Text style={styles.consentItem}>
//                 4. I accept full responsibility for any products distributed to me by the company and will compensate the
//                 company for any losses incurred due to damage or loss of products (with the office-issued voucher serving
//                 as proof).
//               </Text>
//               <Text style={styles.consentItem}>
//                 5. I acknowledge that I am responsible for any unauthorized transactions and will bear the penalties
//                 imposed by the company.
//               </Text>
//               <Text style={styles.consentItem}>
//                 6. I agree to follow the company’s commission plan and procedures. In the event of any discrepancies
//                 related to the commission plan, I understand that I may raise a formal complaint only within 15 days from
//                 the date of the commission issuance.
//               </Text>
//               <Text style={styles.consentItem}>
//                 7. I understand that the company reserves the right to impose valid penalties on me at any time.
//               </Text>
//               <Text style={styles.consentItem}>
//                 8. I will comply with all the company’s terms and conditions, as well as its privacy policy. Any breach
//                 on my part may result in strict legal actions being taken against me by the company.
//               </Text>
//             </View>
//           )}
//         </View>
//         <TouchableOpacity onPress={handleExpand}>
//           <Text style={styles.readMore}>{isExpanded ? 'Read Less' : 'Read More'}</Text>
//         </TouchableOpacity>

//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             value={isChecked}
//             onValueChange={handleCheckBox}
//             style={styles.checkbox}
//             tintColors={{ true: '#0066cc', false: '#999999' }}
//           />
//           <Text style={styles.checkboxText}>
//             By signing this document, I hereby declare my commitment to adhering to all rules and regulations while
//             working with Chairbord Pvt. Ltd. and acknowledge that any violation of these terms may result in legal action
//             by the company.
//           </Text>
//         </View>

//         <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
//           {eSign ? (
//             <Pressable onPress={() => setESign(null)}>
//               <Image source={{ uri: eSign.uri }} style={{ height: 100, width: '100%' }} />
//             </Pressable>
//           ) : (
//             <UploadDoc
//               text={'Upload E-sign'}
//               setUploadFile={() => pickImage('E-Sign')}
//               backgroundType={'E-Sign'}
//             />
//           )}
//         </View>
//       </View>

//       <View style={styles.bottomContainer}>
//         <SecondaryButton title={'Submit'} onPress={handleSendData} />
//       </View>

//       {/* Modal for Success */}
//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContent}>
//             <Image source={require('../../assets/success.png')} style={styles.checkImage} />
//             <Text style={styles.modalText}>Pending...</Text>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   name: {
//     fontSize: 16,
//     marginLeft: 5,
//     textAlign: 'justify',
//     color: 'black',
//   },
//   aadhar: {
//     fontSize: 16,
//     marginLeft: 5,
//     textAlign: 'justify',
//     color: 'black',
//   },
//   consentHeading: {
//     fontSize: 16,
//     marginLeft: 5,
//     textAlign: 'justify',
//     color: 'black',
//     width: '80%',
//   },
//   consent: {
//     marginBottom: 10,
//     color: 'black',
//   },
//   heading: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   readMore: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   consentList: {
//     marginTop: 10,
//   },
//   consentItem: {
//     fontSize: 14,
//     lineHeight: 24,
//     marginVertical: 5,
//     color: 'black',
//     textAlign: 'justify',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     flexWrap: 'wrap',
//     marginVertical: 10,
//   },
//   checkbox: {
//     marginRight: 10,
//     transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
//   },
//   checkboxText: {
//     fontSize: 14,
//     color: 'black',
//     flex: 1,
//     flexWrap: 'wrap',
//     textAlign: 'justify',
//   },
//   bottomContainer: {
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     height: '50%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkImage: {
//     width: 100,
//     height: 100,
//   },
//   modalText: {
//     fontSize: 18,
//     color: 'black',
//     marginTop: 10,
//   },
// });

// export default ConsentForm;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable, Image, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import OverlayHeader from '../../components/OverlayHeader';
import { launchImageLibrary } from 'react-native-image-picker';
import UploadDoc from '../../components/common/UploadDoc';
import { client } from '../../client/Axios';
import SecondaryButton from '../../components/common/SecondaryButton';

const ConsentForm = (props: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [eSign, setESign] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = (typeOfImg: string) => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };

        if (typeOfImg === 'E-Sign') {
          setESign(source); // Set E-sign image
        }
      }
    });
  };

  const handleSendData = async () => {
    setLoading(true);
    setModalVisible(true); // Open modal when submitting
    try {
      const form = new FormData();
      form.append('e_sign_photo', eSign);

      const response = await client.post('/cashfree/e-sign', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('E-Sign Verification success', response);
      Alert.alert('Success', 'E-sign Verified Successfully', [
        {
          text: 'Ok',
          onPress: () => {
            setModalVisible(false);
            props.navigation.navigate('dashboard');
          },
        },
      ]);
    } catch (error) {
      console.error('Something went wrong:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <OverlayHeader title={'Consent Form'} />
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.heading}>Name:</Text>
          <Text style={styles.name}> Mohit Kumar</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.heading}>Aadhar Number:</Text>
          <Text style={styles.aadhar}> XXXX-XXXX-XXXX</Text>
        </View>

        <View style={styles.consent}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.heading}>Consent:</Text>
            <Text style={styles.consentHeading}>
              Acknowledgement of Terms regarding employment with Chairbord Pvt. Ltd.
            </Text>
          </View>

          {isExpanded && (
            <View style={styles.consentList}>
              <Text style={styles.consentItem}>
                1. I affirm that all the information and authorizations provided by me are accurate.
              </Text>
              <Text style={styles.consentItem}>
                2. I commit to performing my duties with integrity and accept full responsibility for any issues caused
                to customers due to my mistakes.
              </Text>
              <Text style={styles.consentItem}>
                3. I shall provide accurate and truthful information and will ensure that all required documents are
                submitted appropriately throughout the work process for all products.
              </Text>
              <Text style={styles.consentItem}>
                4. I accept full responsibility for any products distributed to me by the company and will compensate the
                company for any losses incurred due to damage or loss of products (with the office-issued voucher serving
                as proof).
              </Text>
              <Text style={styles.consentItem}>
                5. I acknowledge that I am responsible for any unauthorized transactions and will bear the penalties
                imposed by the company.
              </Text>
              <Text style={styles.consentItem}>
                6. I agree to follow the company’s commission plan and procedures. In the event of any discrepancies
                related to the commission plan, I understand that I may raise a formal complaint only within 15 days from
                the date of the commission issuance.
              </Text>
              <Text style={styles.consentItem}>
                7. I understand that the company reserves the right to impose valid penalties on me at any time.
              </Text>
              <Text style={styles.consentItem}>
                8. I will comply with all the company’s terms and conditions, as well as its privacy policy. Any breach
                on my part may result in strict legal actions being taken against me by the company.
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleExpand}>
          <Text style={styles.readMore}>{isExpanded ? 'Read Less' : 'Read More'}</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={handleCheckBox}
            style={styles.checkbox}
            tintColors={{ true: '#0066cc', false: '#999999' }}
          />
          <Text style={styles.checkboxText}>
            By signing this document, I hereby declare my commitment to adhering to all rules and regulations while
            working with Chairbord Pvt. Ltd. and acknowledge that any violation of these terms may result in legal action
            by the company.
          </Text>
        </View>

        <View style={{ height: 200, width: '100%', marginVertical: 5 }}>
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
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SecondaryButton title={'Submit'} onPress={handleSendData} />
      </View>

      {/* Modal for Success */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* Cross Icon */}
            <Pressable style={styles.closeButtonContainer} onPress={() => setModalVisible(false)}>
            <Image source={require('../../assets/close.png')} style={styles.closeButton} />
            </Pressable>
            {/* Green Tick and Text */}
            <Image source={require('../../assets/success.png')} style={styles.checkImage} />
            <Text style={styles.modalText}>Verified</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'justify',
    color: 'black',
  },
  aadhar: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'justify',
    color: 'black',
  },
  consentHeading: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'justify',
    color: 'black',
    width: '80%',
  },
  consent: {
    marginBottom: 10,
    color: 'black',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  readMore: {
    color: 'blue',
    fontSize: 16,
  },
  consentList: {
    marginTop: 10,
  },
  consentItem: {
    fontSize: 14,
    lineHeight: 24,
    marginVertical: 5,
    color: 'black',
    textAlign: 'justify',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  checkboxText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkImage: {
    width: 100,
    height: 100,
  },
  modalText: {
    fontWeight:'400',
    fontSize: 22,
    color: 'black',
    marginTop: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButton:{
    width:20,
    height:20,
  }
});

export default ConsentForm;
