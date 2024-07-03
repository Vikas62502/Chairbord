import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import OverlayHeader from '../../components/OverlayHeader'
import CardAccordian from '../../components/common/CardAccordian'
import CustomInputText from '../../components/common/CustomInputText'

const ProfileAndMasterInfo = () => {
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
      title: 'Pos Location',
      value: 'Location name'
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
      title: 'Address',
      value: 'A-40, Kardhani kalwa'
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayHeader
        title={'Profile & Master Info'}
        showBackButton={true}
        navigateTo={'drawer'}
      />

      <ScrollView style={{ padding: '5%' }} >
        <CardAccordian
          title={'Master Details'}
          content={
            <View>
              {masterDetailData.map((data, index) => (
                <View key={index}>
                  <InputSubText text={data.title} />
                  <CustomInputText value={data.value} isEditable={false} />
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
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <Image
                  source={require('../../assets/screens/profilePic.png')}
                />
                <View style={{ width: '70%' }}>
                  <InputSubText text={personalDetailsData[0].title} />
                  <CustomInputText
                    value={personalDetailsData[0].value}
                    isEditable={false}
                  />
                </View>
              </View>
              <View>
                {personalDetailsData.slice(1).map((data, index) => (
                  <View key={index}>
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
          marginVertical: '3%',
          marginLeft: '2%'
        }}
      >
        {text}
      </Text>
    </View>
  )
}
