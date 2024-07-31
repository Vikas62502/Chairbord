import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { getCache } from '../../helper/Storage';
import OverlayHeader from '../../components/OverlayHeader';
import InputText from '../../components/common/InputText';
import SelectField from '../../components/common/SelectField';
import PrimaryBtn from '../../components/common/PrimaryBtn';
import CustomInputText from '../../components/common/CustomInputText';

const CustomerRegistration = (props: any) => {
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [validateOtpResp] = useState(props.route.params);
  const [mobile, setMobile] = useState(validateOtpResp?.custDetails?.mobileNo);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [documentType, setDocumentType] = useState({
    docType: 1,
    docNo: '',
  });

  const handleDateChange = (text: string, field: string) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned?.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2);
    }
    if (cleaned?.length >= 5) {
      cleaned = cleaned.slice(0, 5) + '-' + cleaned.slice(5);
    }
    if (field === "dateOfBirth") {
      setDateOfBirth(cleaned);
    } else if (field === "expiryDate") {
      setExpiryDate(cleaned);
    }
  };

  const requestTypeDropdownData = [
    { title: 'Pancard', docType: 1 },
    { title: 'Driving License', docType: 2 },
    { title: 'Voter Id Card', docType: 3 },
  ];

  const setDocumentDetails = (newDocType: number) => {
    setDocumentType(prevState => ({
      ...prevState,
      docType: newDocType
    }));
  };

  const getSessionId = async () => {
    const session = await getCache('session');
    setSessionId(session);
  };

  useEffect(() => {
    getSessionId();
  }, [sessionId]);

  const cusRegApi = async () => {
    props.navigation.navigate('imageGallary')
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Customer Registration'}
        navigateTo={() => props.navigation.goBack()}
      />
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.mobileInputField}>
          <View>
            <CustomInputText
              style={styles.countryCodeInput}
              placeholder={'+91'}
              placeholderTextColor={'#000'}
              maxLength={3}
            />
          </View>
          <View style={{ flex: 8 }}>
            <CustomInputText
              placeholder={'Enter mobile number'}
              value={mobile}
              onChangeText={(txt: string) => setMobile(txt)}
              secure={false}
            />
          </View>
        </View>
        <View style={{ padding: "5%" }}>
          <View style={{ marginBottom: "5%" }}>
            <CustomInputText
              placeholder={'First Name'}
              value={customerFirstName}
              onChangeText={(txt: string) => setCustomerFirstName(txt?.toUpperCase())}
              secure={false}
            />
          </View>
          <CustomInputText
            placeholder={'Surname'}
            value={customerLastName}
            onChangeText={(txt: string) => setCustomerLastName(txt?.toUpperCase())}
            secure={false}
          />

          <>
            <Text style={styles.label}>Enter date of birth</Text>
            <View >
              <CustomInputText
                placeholder='DD-MM-YYYY'
                placeholderTextColor='#263238'
                style={styles.dateInput}
                value={dateOfBirth}
                onChangeText={(text) => handleDateChange(text, 'dateOfBirth')}
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
          </>
        </View>

        <Text style={styles.label}>Document type</Text>
        <View style={{ paddingHorizontal: "5%" }}>
          <SelectField dataToRender={requestTypeDropdownData} title={"Select request type"} selectedValue={(data: any) => setDocumentDetails(data.docType)} />
        </View>
        <View style={{ padding: "5%" }}>
          <CustomInputText
            placeholder={'Enter document number'}
            value={documentType.docNo}
            onChangeText={(text: string) => setDocumentType(prevState => ({
              ...prevState,
              docNo: text?.toUpperCase()
            }))}
            secure={false}
          />
        </View>
        {documentType.docType === 2 || documentType.docType === 4 ? (
          <>
            <Text style={styles.label}>Enter Expiry Date</Text>
            <View style={{ alignItems: 'center' }}>
              <CustomInputText
                placeholder='DD-MM-YYYY'
                placeholderTextColor='#263238'
                style={styles.dateInput}
                value={expiryDate}
                onChangeText={(text) => handleDateChange(text, 'expiryDate')}
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
          </>
        ) : null}

        <View style={{ alignItems: "center", paddingBottom: "5%" }}>
          <PrimaryBtn
            title={'Next'}
            onPress={() => cusRegApi()}
            disabled={undefined}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: '5%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
  mobileInputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1,
    padding: "5%"
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
    marginTop: '5%',
    marginBottom: '3%',
    paddingHorizontal: '5%',
  },
  dateInput: {
    borderColor: '#263238',
    borderWidth: 1,
    color: '#000000',
    width: '70%',
    fontSize: 16,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: '5%',
    backgroundColor: '#F3F3F3',
    textAlign: 'center'
  },
  countryCodeInput: {
    borderWidth: 1,
    borderColor: '#263238',
    padding: '4%',
    marginTop: '30%',
    textAlign: 'center',
    borderRadius: 15,
    color: '#263238'
  },
});

export default CustomerRegistration;
