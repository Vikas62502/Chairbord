import { View, Text, SafeAreaView, ScrollView, Image, RefreshControl, } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import OverlayHeader from '../../components/OverlayHeader'
import CardAccordian from '../../components/common/CardAccordian'
import CustomInputText from '../../components/common/CustomInputText'
import useUserData from '../../helper/useUserData';
import { client } from '../../client/Axios';

const ProfileAndMasterInfo = () => {
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute(); // Get route object
  const isPartOfBottomNavigator = route.name === 'ProfileAndMasterInfo';
  const [userData, setUserData] = useState();
  console.log('userData', JSON.stringify(userData))

  const getUserDetails = async () => {
    try{
      const res = await client.get('/user/agent/mydata');
      setUserData(res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  const onRefresh = async () => {
    setRefreshing(true)
    try {
      // await getmasterDetailData()
      await getUserDetails()
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setRefreshing(false)
    }
  }

  const masterDetailData = [
    {
      title: 'Master name',
      value: userData?.master?.name || 'N/A'
    },
    {
      title: 'Mobile no.',
      value: userData?.master?.mobile_number || 'N/A'
    },
    {
      title: 'Email ID',
      value: userData?.master?.email_id || 'N/A'
    }
  ]

  const personalDetailsData = [
    {
      title: 'Agent Name',
      value: userData?.name || 'N/A'
    },
    {
      title: 'Mobile No.',
      value: userData?.mobile_number || 'N/A'
    },
    {
      title: 'Email ID',
      value: userData?.email_id || 'N/A'
    },
    {
      title: 'Date of Birth',
      value: userData?.date_of_birth || 'N/A'
    },
    {
      title: "Father's Name",
      value: userData?.father_name || 'N/A'
    },
    {
      title: 'Aadhar no.',
      value: userData?.id_proof_document_number || 'N/A'
    },
    {
      title: 'PAN no.',
      value: userData?.pan_card_number || 'N/A'
    },
    // {
    //   title: 'Address',
    //   value: userData?.address || 'N/A'
    // },
    {
      title: 'Pos Location',
      value: userData?.pos_name || 'N/A'
    },
    {
      title: 'Assigned RM',
      value: userData?.regionalManager || 'N/A'
    },
    {
      title: 'Instant commission amount',
      value: Array.isArray(userData?.TagCosts) && userData.TagCosts.length > 0 ? userData.TagCosts : 'N/A'
    },
    {
      title: 'Tag cost amount',
      value: Array.isArray(userData?.TagCosts) && userData.TagCosts.length > 0 ? userData.TagCosts : 'N/A'
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
        <CardAccordian
          title={'Master Details'}
          content={
            <View>
              {masterDetailData.map((data, index) => (
                <View key={index} style={{marginBottom:5,marginTop:-8,}} >
                  <InputSubText text={data.title} />
                  <CustomInputText value={data.value} isEditable={false}   />
                </View>
              ))}
            </View>
          }
        />
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
                  <View key={index} style={{marginBottom:5,marginTop:-8,}}>
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