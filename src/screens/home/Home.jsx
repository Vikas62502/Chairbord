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
            backgroundColor: '#4C6470',
            height: 61,
            borderRadius: 20,
            width: 50
          }}
        >
          <Image
            style={{ alignItems: 'center', left: 10, top: 11 }}
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
      <View style={{ flexDirection: 'row' }}>
        <View>
          {dashboardCardData.slice(0, 3).map((data, index) => (
            <View key={index}>
              <DashboardCards
                title={data.title}
                subTitle={data.subTitle}
                icon={data.icon}
                router={data.router}
              />
            </View>
          ))}
        </View>
        <View>
          {dashboardCardData.slice(3, 6).map((data, index) => (
            <View key={index}>
              <DashboardCards
                title={data.title}
                subTitle={data.subTitle}
                icon={data.icon}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: '1%' }}>
        <View style={styles.divider}></View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 25,
          backgroundColor: 'white',
          marginTop: '5%',
          marginHorizontal: 10,
          padding: 3
        }}
      >
        {['Today', 'This Week', 'This Month'].map((data, index) => (
          <Pressable
            key={index}
            style={styles.timeFields}
            onPress={() => setActiveTime(data)}
          >
            <View>
              <Text
                style={[
                  styles.timeText,
                  activeTime === data && styles.activeTimeText
                ]}
              >
                {data}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'light-blue'
  },
  dashboardCard: {
    borderWidth: 1,
    borderColor: '#000000',
    width: 180,
    height: 61,
    borderRadius: 20,
    margin: 10,
    padding: 10
  },
  dashbordCardText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#4C6470'
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
  timeText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    padding: 15
  },
  activeTimeText: {
    color: 'white',
    backgroundColor: '#263238',
    paddingHorizontal: '15%',
    borderRadius: 25,
    fontFamily: 'Proxima Nova'
  }
})

export default Home
