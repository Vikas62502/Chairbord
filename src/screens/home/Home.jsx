import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from 'react-native'
import dashboardCardData from './dashboardCardData'
import React, { useState } from 'react'
import SwipperComponent from './SwipperComponent'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

const DashboardCards = ({ title, subTitle, icon, router }) => {
  const navigation = useNavigation()
  return (
    <Pressable
      style={styles.dashboardCard}
      onPress={() => navigation.navigate(router)}
    >
      <View style={{ position: 'relative' }}>
        <View style={{ alignItems: 'center', width: '80%' }}>
          <Text style={styles.dashbordCardText}>{title}</Text>
          <Text style={styles.dashbordCardText}>{subTitle}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: -10,
            top: -11,
            backgroundColor: '#02546D',
            height: 60,
            borderRadius: 20,
            width: 50
          }}
        >
          <Image
            style={{ alignItems: 'center',justifyContent:'center', left: 10, top: 11 }}
            source={icon}
            />
        </View>
      </View>
    </Pressable>
  )
}

const Home = () => {
  const [activeTime, setActiveTime] = useState('Today')
  return (
    <ScrollView style={styles.container}>
      
      <View style={{ height: '20%', width: '100%', marginBottom: '10%' }}>
        <SwipperComponent />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          marginBottom: '10%'
        }}
      >
        <Image source={require('../../assets/dashboard/registerTag.png')} />
        <Image source={require('../../assets/dashboard/tagInStock.png')} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        
      <DashboardCards
          title={'BAJAJ'}
          subTitle={'Issuance'}
          icon={require('../../assets/dashboard/customerOnBoard.png')}
          router={'bajajissuance'} 
        />
        <DashboardCards
          title={'SBI'}
          subTitle={'Issuance'}
          icon={require('../../assets/dashboard/tagReplacement.png')}
          router={'sbiissuance'}
        />
        <DashboardCards
          title={'Tag'}
          subTitle={'Registration'}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'mobileVerification'}
        />
        <DashboardCards
          title={'Tag'}
          subTitle={'Replacement'}
          icon={require('../../assets/dashboard/tagReplacement.png')}
          router={'tagReplacement'}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: '1%' }}>
        <View style={styles.divider}></View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 50,
          backgroundColor: 'white',
          marginTop: '5%',
          marginHorizontal: 10,
          padding: 4
        }}
      >
        {['Today', 'Week', 'Month'].map((data, index) => (
          <Pressable
            key={index}
            style={styles.timeFields}
            onPress={() => setActiveTime(data)}
          >
            {activeTime === data ? (
              <LinearGradient
                colors={['#02546D', '#142D40']}
                style={styles.gradient}
              >
                <Text style={[styles.timeText, styles.activeTimeText]}>
                  {data}
                </Text>
              </LinearGradient>
            ) : (
              <View>
                <Text style={styles.timeText}>{data}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'light-blue',
  },
  dashboardCard: {
    borderWidth: 1,
    borderColor: '#000000',
    width: 180,
    height: 60,
    borderRadius: 20,
  margin: 5,
    padding: 10
  },
  dashbordCardText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: 'black'
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: '#4C6470'
  },
  timeFields: {
    flex: 1,
    alignItems: 'center'
  },
  gradient: {
    borderRadius: 25
  },
  timeText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    margin: 15,
  },
  activeTimeText: {
    color: 'white',
    paddingHorizontal: '15%',
    borderRadius: 50,
    fontFamily: 'Proxima Nova'
  }
})


export default Home
