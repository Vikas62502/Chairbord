// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Dimensions
// } from 'react-native'
// import React, { useState } from 'react'
// import SwipperComponent from './SwipperComponent'
// import { useNavigation } from '@react-navigation/native'
// import LinearGradient from 'react-native-linear-gradient'
// const { width, height } = Dimensions.get('window')

// const DashboardCards = ({ title, subTitle, icon, router }) => {
//   const navigation = useNavigation()
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
//           style={{
//             position: 'absolute',
//             right: -10,
//             top: -11,
//             backgroundColor: '#02546D',
//             height: 60,
//             borderRadius: 20,
//             width: 50
//           }}
//         >
//           <Image
//             style={{ alignItems: 'center',justifyContent:'center', left: 10, top: 11 }}
//             source={icon}
//             />
//         </View>
//       </View>
//     </Pressable>
//   )
// }

// const Home = () => {
//   const [activeTime, setActiveTime] = useState('Today')
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       Home();
//     } catch (error) {
//       console.log(error, 'error');
//     } finally {
//       setRefreshing(false);
//     }
//   };
  
//   return (
//     <ScrollView style={styles.container} refreshControl={
//       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//     }>
//       <View style={styles.swipperContainer}>
//         <SwipperComponent />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginBottom: '5%',
//           marginHorizontal:10,
//           width:'auto'
//         }}
//       >
//         <Image source={require('../../assets/dashboard/registerTag.png')}  />
//         <Image source={require('../../assets/dashboard/tagInStock.png')} />
//       </View>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal:5, width:'auto' , justifyContent:'space-between' }}>
        
     
//         <DashboardCards
//           title={'Tag'}
//           subTitle={'Registration'}
//           icon={require('../../assets/dashboard/tagRegistration.png')}
//           router={'mobileVerification'}
//         />
//         <DashboardCards
//           title={'Tag'}
//           subTitle={'Replacement'}
//           icon={require('../../assets/dashboard/tagReplacement.png')}
//           router={'tagReplacement'}
//         />
//       </View>
//       <View style={{ alignItems: 'center', marginTop: '1%' }}>
//         <View style={styles.divider}></View>
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderRadius: 50,
//           backgroundColor: 'white',
//           marginTop: '5%',
//           marginHorizontal: 10,
//           padding: 4
//         }}
//       >
//         {['Today', 'Week', 'Month'].map((data, index) => (
//           <Pressable
//             key={index}
//             style={styles.timeFields}
//             onPress={() => setActiveTime(data)}
//           >
//             {activeTime === data ? (
//               <LinearGradient
//                 colors={['#02546D', '#142D40']}
//                 style={styles.gradient}
//               >
//                 <Text style={[styles.timeText, styles.activeTimeText]}>
//                   {data}
//                 </Text>
//               </LinearGradient>
//             ) : (
//               <View>
//                 <Text style={styles.timeText}>{data}</Text>
//               </View>
//             )}
//           </Pressable>
//         ))}
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: 'light-blue',
//   },
//   swipperContainer: {
//     height: height * 0.3,
//     padding: '5%',
//     marginBottom: '5%'
//   },
//   dashboardCard: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     width: 180,
//     height: 60,
//     borderRadius: 20,
//   margin: 5,
//     padding: 10
//   },
//   dashbordCardText: {
//     fontWeight: '600',
//     fontSize: 16,
//     lineHeight: 19,
//     color: 'black'
//   },
//   divider: {
//     width: '60%',
//     height: 1,
//     backgroundColor: '#4C6470'
//   },
//   timeFields: {
//     flex: 1,
//     alignItems: 'center'
//   },
//   gradient: {
//     borderRadius: 25
//   },
//   timeText: {
//     color: '#000000',
//     fontSize: 16,
//     lineHeight: 19,
//     fontWeight: '600',
//     margin: 15,
//   },
//   activeTimeText: {
//     color: 'white',
//     paddingHorizontal: '15%',
//     borderRadius: 50,
//     fontFamily: 'Proxima Nova'
//   }
// })


// export default Home
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SwipperComponent from './SwipperComponent'
import { useNavigation } from '@react-navigation/native'
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
      <View
        style={styles.imageRow}
      >
        <Image source={require('../../assets/dashboard/registerTag.png')}  style={styles.image}/>
        <Image source={require('../../assets/dashboard/tagInStock.png')} style={styles.image}/>
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
          router={'tagReplacement'}
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
      width: '55%',
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
    marginHorizontal:isTablet?30:15,
    width:'auto'
  },
  image: {
    width: isTablet ? width * 0.42:width*0.40, // responsive width
    height:isTablet ? height * 0.2 : height * 0.15, // responsive height
    resizeMode: 'contain',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal:isTablet?30: 15,
    marginVertical:10,
    borderRadius:25,
    padding:10,
    height:'auto',
    width: 'auto',
    // backgroundColor:'#E7E7E7',
    backgroundColor:'#E0E0E0',
    justifyContent: 'space-between'
  },
})

export default Home
