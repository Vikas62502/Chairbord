import { View, Text, SafeAreaView, ScrollView, Image, RefreshControl, } from 'react-native'
import React,{useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import OverlayHeader from '../../components/OverlayHeader'
import CardAccordian from '../../components/common/CardAccordian'
import CustomInputText from '../../components/common/CustomInputText'

const ProfileAndMasterInfo = () => {
  const [refreshing, setRefreshing] = useState(false)
  const route = useRoute(); // Get route object
  const isPartOfBottomNavigator = route.name === 'ProfileAndMasterInfo';

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
      value: 'Mahakal Bussiness Solution'
    },
    {
      title: 'Mobile no.',
      value: '9988776655'
    },
    {
      title: 'Email ID',
      value: 'master@gmail.com'
    }
  ]

  const personalDetailsData = [
    {
      title: 'Agent Name',
      value: 'Agent Name'
    },
    {
      title: 'Mobile No.',
      value: '8178624530'
    },
    {
      title: 'Date of Birth',
      value: '30-09-2002'
    },
    {
      title: "Father's Name",
      value: 'XYZ'
    },
    {
      title: 'Aadhar no.',
      value: '8028-2224-2287'
    },
    {
      title: 'PAN no.',
      value: 'BEFASC8879K'
    },
    {
      title: 'Pos Location',
      value: 'Location name'
    },
    {
      title: 'Assigned RM',
      value: 'XYZ'
    },
    {
      title: 'Instant commission amount',
      value: '645'
    },
    {
      title: 'Tag cost amount',
      value: '665'
    },
    // {
    //   title: 'Address',
    //   value: 'A-40, Kardhani kalwa'
    // }
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
                <View key={index} style={{marginBottom:5,marginTop:-8}} >
                  <InputSubText text={data.title} />
                  <CustomInputText value={data.value} isEditable={false} style={{backgroundColor:'red'}} />
                </View>
              ))}
            </View>
          }
        />
        <CardAccordian
          title={'Personal Details'}
          
          content={
            <>
              <View
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
              </View>
              <View >
                {personalDetailsData.slice(1).map((data, index) => (
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
