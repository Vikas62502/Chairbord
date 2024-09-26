import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Dimensions,
  BackHandler, 
  Alert 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SwipperComponent from './SwipperComponent'
import { useNavigation, useFocusEffect  } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { getCache } from '../../helper/Storage'
const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<400;
// const DashboardCards = ({ title, subTitle, icon, router }) => {
//   const navigation = useNavigation()

//   const getUserData = async () => {
//     try {
//       const value = await getCache('userData')
//       console.log(value, 'userData')
//       if (value !== null) {
//         return JSON.parse(value)
//       }
//     } catch (e) {
//       console.log('error', e)
//     }
//   }

//   useEffect(() => {
//     getUserData()
//   }, [])
//   return (
//     <Pressable
//       style={styles.dashboardCard}
//       onPress={() => navigation.navigate(router)}
//     >
//       <View style={{ position: 'relative' }}>
//         <View style={{ alignItems: 'center', width: '80%' }}>
//           <Text style={styles.dashbordCardText}>{title}</Text>
//           <Text style={styles.dashbordCardText}>{subTitle}</Text>
//         </View>
//         <View
//           style={styles.iconContainer}
//         >
//           <Image
//             style={styles.icon}
//             source={icon}
//           />
//         </View>
//       </View>
//     </Pressable>
//   )
// }
const DashboardCards2 = ({ title, subTitle, icon, router }) => {
  const navigation = useNavigation()
  return (
    <Pressable
      style={styles.dashboardCard2}
      onPress={() => navigation.navigate(router)}
    >
      <View style={styles.iconContainer2}>
        <Image style={styles.icon2} source={icon} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.dashbordCardText2}>{title}</Text>
        <Text style={styles.dashbordCardText2}>{subTitle}</Text>
      </View>
    </Pressable>
  )
}

const Home = () => {
  const [activeTime, setActiveTime] = useState('Today')
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // If the modal is already visible or you don't want to show it:
        Alert.alert('Confirm exit', 'Do you want to exit the app?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // This prevents the default back behavior
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );


  const onRefresh = async () => {
    setRefreshing(true)
    try {
      Home()
    } catch (error) {
      console.log(error, 'error')
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.swipperContainer}>
        <SwipperComponent />
      </View>
      <View style={styles.imageRow}>
        {/* First image with text overlay */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/dashboard/registerTag.png')}
            style={styles.image}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.numberText}>55</Text>
            <Text style={styles.descriptionText}>Registered Tag</Text>
          </View>
        </View>
        {/* Second image with text overlay */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/dashboard/tagInStock.png')}
            style={styles.image}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.numberText}>12</Text>
            <Text style={styles.descriptionText}>Tag in Stock</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        {/* <DashboardCards
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
        <DashboardCards
          title={'Tag'}
          subTitle={'Registration'}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'mobileVerification'}
          // router={'tagRegistration'}
        />
        <DashboardCards
          title={'Tag'}
          subTitle={'Replacement'}
          icon={require('../../assets/dashboard/tagReplacement.png')}
          router={'tagReplacement'}
        /> */}
        <DashboardCards2
          title={'Tag'}
          subTitle={'Registration'}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'mobileVerification'}
        />
        <DashboardCards2
          title={'Tag'}
          subTitle={'Replacement'}
          icon={require('../../assets/dashboard/tagReplacement.png')}
          router={'tagReplacement'}
        />
        <DashboardCards2
          title={'Wallet'}
          // subTitle={'Replacement'}
          icon={require('../../assets/dashboard/wallet.png')}
          router={'wallet'}
        />
        <DashboardCards2
          title={'Issuance'}
          subTitle={'Tracker'}
          icon={require('../../assets/dashboard/issuance.png')}
          router={'issuanceTracker'}
        />
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider}></View>
      </View>

      {/* <View style={styles.timeSelector}>
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
      </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'light-blue'
  },
  swipperContainer: {
    height: height * 0.3,
    padding: '5%',
    // borderRadius:20
  },
  // dashboardCard: {
  //   borderWidth: isTablet?2:1,
  //   borderColor: '#000000',
  //   width:isTablet?width*0.43: width * 0.40, // responsive width
  //   height:isTablet?height*0.08: height * 0.07, // responsive height
  //   borderRadius: isTablet?30:isSmallScreen?15:20,
  //   margin:isTablet?20:10,
  //   padding: 5,
  // },
  // dashbordCardText: {
  //   fontWeight: '600',
  //   fontSize: isTablet?28:16, // responsive font size
  //   lineHeight: isTablet?32:20,
  //   color: 'black'
  // },
  // iconContainer: {
  //   position: 'absolute',
  //   right: -8,
  //   top: -6,
  //   backgroundColor: '#02546D',
  //   height:isTablet?height*0.08: height * 0.07, // responsive height
  //   borderRadius: isTablet?30:isSmallScreen?15: 20,
  //   width: width * 0.12 // responsive width
  // },
  // icon: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   left: isTablet?20:10,
  //   top: isTablet?16:isSmallScreen?10:12,
  //   width:'60%',
  //   height:isTablet?'60%':isSmallScreen?'55%':'50%'
  // },
    dashboardCard2: {
      width: width * 0.20, // responsive width
      height:height * 0.12, // adjusted height for better spacing
      // backgroundColor:'red',
      alignItems: 'center', // center the content horizontally
      justifyContent: 'flex-start', // center the content vertically
    },
    dashbordCardText2: {
      fontWeight: '400',
      fontSize: isTablet ? 24 :isSmallScreen?12: 14, // responsive font size
      lineHeight: isTablet?28:18,
      color: 'black',
      textAlign: 'center', // center the text horizontally
    },
    iconContainer2: {
      backgroundColor: '#02546D',
      height: isTablet ? 80 : 50, // responsive height
      width:isTablet?80: 50, // responsive width
      borderRadius: 50,
      alignItems: 'center', // center the icon within the container
      justifyContent: 'center', // center the icon within the container
      marginBottom:isTablet?12: 8, // space between icon and text
    },
    icon2: {
      width:'55%',
      height:'55%',
    },
    textContainer: {
      alignItems: 'center', // center text container horizontally
    },
  
  dividerContainer: {
    alignItems: 'center', 
    marginTop: '1%'
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: '#4C6470'
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    marginTop: '5%',
    marginHorizontal: isTablet?25:10,
    padding: isTablet?12:4
  },
  timeFields: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  gradient: {
    borderRadius: isTablet?50: 25
  },
  timeText: {
    color: '#000000',
    fontSize: isTablet?28:16, // responsive font size
    lineHeight:isTablet?32: 19,
    fontWeight: '600',
    margin: isTablet?20:15,
  },
  activeTimeText: {
    color: 'white',
    paddingHorizontal: isTablet?'22%':'15%',
    borderRadius: 50,
    fontFamily: 'Proxima Nova'
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:isTablet?30:isSmallScreen?12:15,
    alignItems: 'center',
    width:'auto',
    gap:4,
    // backgroundColor:'red'
  },
  imageWrapper: {
    position: 'relative', // Required to layer text on top of image
    width:isSmallScreen?170: 160, // Adjust based on your image size
    height: isSmallScreen?80:100, // Adjust based on your image size
  },
  textOverlay: {
    position: 'absolute',
    top: -5,
    left: 15,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  numberText: {
    fontSize: isSmallScreen?32:36,
    color: '#fff', // White color for better contrast
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: isSmallScreen?14:16,
    color: '#fff', // White color for better contrast
    fontWeight: '400',
  },
  image: {
    width: isTablet ? width * 0.42:width*0.39, // responsive width
    height:isTablet ? height * 0.2 : height * 0.12, // responsive height
    resizeMode: 'contain',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal:isTablet?30: 15,
    marginVertical:20,
    borderRadius:25,
    padding:isSmallScreen?8:10,
    height:isSmallScreen?110:'auto',
    width: 'auto',
    // backgroundColor:'#E7E7E7',
    backgroundColor:'#E0E0E0',
    justifyContent: 'space-between'
  },
})

export default Home
