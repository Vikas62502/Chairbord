import {
  View,
  Text,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import SwipperComponent from './SwipperComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { client } from '../../client/Axios';
import Loader from '../../components/ui/Loader';
import showAlert from '../../utils/showAlert';
import useUserData from '../../helper/useUserData';
import { styles } from './styles';

const DashboardCards2 = ({ title, subTitle, icon, router, reqType, setLoading }) => {
  const navigation = useNavigation();
  const { userId } = useUserData();

  const handleCheckBalance = async (reqType) => {
    if (!reqType) {
      navigation.navigate(router);
      return;
    }
    setLoading(true);
    try {
      const response = await client.post('/bajaj/check-min-balance', {
        reqType: reqType,
        userId: userId
      });
      console.log(response.data, 'response');
      navigation.navigate(router);
    } catch (error) {
      showAlert(error.response?.data?.message || error.message);
      console.log(error.respose.data, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      style={styles.dashboardCard2}
      onPress={() => handleCheckBalance(reqType)}
    >
      <View style={styles.iconContainer2}>
        <Image style={styles.icon2} source={icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dashbordCardText2}>{title}</Text>
        <Text style={styles.dashbordCardText2}>{subTitle}</Text>
      </View>
    </Pressable>
  );
};

const Home = () => {
  const [activeTime, setActiveTime] = useState('Today');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // const checkToken = async () => {
      //   try {
      //     const response = await client.get('/user/token-expired-check'); // Replace with your actual API endpoint
      //     if (response.status === 200) {
      //       console.log('Token is valid:', response.data);
      //     }
      //   } catch (error) {
      //     console.error(
      //       'Token verification failed:',
      //       error.response?.data || error.message
      //     );
      //     // Handle logout logic here
      //     await AsyncStorage.clear();
      //     navigation.navigate('SignIn');
      //   }
      // };

      // checkToken();

      const onBackPress = () => {
        Alert.alert('Confirm exit', 'Do you want to exit the app?', [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          { text: 'OK', onPress: () => BackHandler.exitApp() }
        ]);
        return true; // This prevents the default back behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        backHandler.remove();
      };
    }, [navigation]) // Include navigation in the dependency array
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Refresh logic here
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading && <Loader loading={loading} />}

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
        <DashboardCards2
          title={'Tag'}
          subTitle={'Registration'}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'mobileVerification'}
          reqType={'REG'}
          setLoading={setLoading}
        />
        <DashboardCards2
          title={'Tag'}
          subTitle={'Replacement'}
          icon={require('../../assets/dashboard/tagReplacement.png')}
          router={'tagReplacement'}
          reqType={'REP'}
          setLoading={setLoading}
        />

        <DashboardCards2
          title={'Order'}
          subTitle={''}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'orders'}
          reqType={'REG'}
          setLoading={setLoading}
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
      <View style={styles.cardsContainer}>
        <DashboardCards2
          title={'SBI'}
          subTitle={'Portal'}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'sbi'}
          setLoading={setLoading}
        />
        <DashboardCards2
          title={'Wallet'}
          icon={require('../../assets/dashboard/wallet.png')}
          router={'wallet'}
        />
        <DashboardCards2
          title={'Inventory'}
          subTitle={''}
          icon={require('../../assets/dashboard/tagRegistration.png')}
          router={'inventory'}
          setLoading={setLoading}
        />
        <DashboardCards2
          title={'SBI Pending'}
          subTitle={' Request'}
          icon={require('../../assets/dashboard/issuance.png')}
          router={'sbi4'}
        />
      </View>
    </ScrollView>
  );
};



export default Home;
