import { View, Text, SafeAreaView, ScrollView, Image, RefreshControl, } from 'react-native'
import React,{useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import OverlayHeader from '../../components/OverlayHeader'
import CardAccordian from '../../components/common/CardAccordian'
import CustomInputText from '../../components/common/CustomInputText'
import useUserData from '../../helper/useUserData';

const ProfileAndMasterInfo = () => {
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute(); // Get route object
  const isPartOfBottomNavigator = route.name === 'ProfileAndMasterInfo';
  const userData = useUserData();
console.log(userData,'User Data')
  const onRefresh = async () => {
    setRefreshing(true)
    try {
      // await getmasterDetailData()
      // await getpersonalDetailData()
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setRefreshing(false)
    }
  }

  const masterDetailData = [
    {
      title: 'Master name',
      value: 'Chairbord private limited'
    },
    {
      title: 'Mobile no.',
      value: '926966646'
    },
    {
      title: 'Email ID',
      value: 'ceo@chairbord.com'
    }
  ]

  const personalDetailsData = [
    {
      title: 'Agent Name',
      value: userData?.user?.name || 'N/A'
    },
    {
      title: 'Mobile No.',
      value: userData?.user?.mobile_number || 'N/A'
    },
    {
      title: 'Email ID',
      value: userData?.user?.email_id || 'N/A'
    },
    {
      title: 'Date of Birth',
      value: userData?.user?.date_of_birth || 'N/A'
    },
    {
      title: "Father's Name",
      value: userData?.user?.father_name || 'N/A'
    },
    {
      title: 'Aadhar no.',
      value: userData?.user?.id_proof_document_number || 'N/A'
    },
    {
      title: 'PAN no.',
      value: userData?.user?.pan_card_number || 'N/A'
    },
    // {
    //   title: 'Address',
    //   value: userData?.user?.address || 'N/A'
    // },
    {
      title: 'Pos Location',
      value: userData?.user?.pos_name || 'N/A'
    },
    {
      title: 'Assigned RM',
      value: userData?.user?.regionalManager || 'N/A'
    },
    {
      title: 'Instant commission amount',
      value: 'N/A'
    },
    {
      title: 'Tag cost amount',
      value: 'N/A'
    },
    
  ]

  return (
    <SafeAreaView style={{ flex: 1, }}>
      {!isPartOfBottomNavigator && (
        <OverlayHeader
          title={'Profile'}
          showBackButton={true}
        />
      )}

      <ScrollView style={{padding: '5%' }} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        {/* <CardAccordian
          title={'Master Details'}
          content={
            <View>
              {masterDetailData.map((data, index) => (
                <View key={index} style={{marginBottom:5,marginTop:-8}} >
                  <InputSubText text={data.title} />
                  <CustomInputText value={data.value} isEditable={false} style={{backgroundColor:'red'}} />
                </View>
              ))}
            </View>
          }
        /> */}
        <CardAccordian
          title={'Personal Details'}
          
          content={
            <>
              {/* <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 ,}}
              >
                <Image
                  source={require('../../assets/screens/profilePic.png')}
                />
                <View style={{ width: '70%',marginTop:-18 }}>
                  <InputSubText text={personalDetailsData[0].title} />
                  <CustomInputText
                    value={personalDetailsData[0].value}
                    isEditable={false}
                  />
                </View>
              </View> */}
              <View >
                {personalDetailsData.map((data, index) => (
                  <View key={index} style={{marginBottom:5}}>
                    <InputSubText text={data.title} />
                    <CustomInputText value={data.value} isEditable={false} />
                  </View>
                ))}
              </View>
            </>
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileAndMasterInfo

const InputSubText = ({ text }) => {
  return (
    <View>
      <Text
        style={{
          color: '#828282',
          fontSize: 14,
          fontWeight: '400',
          marginVertical: 10,
          marginLeft: '2%'
        }}
      >
        {text}
      </Text>
    </View>
  )
}