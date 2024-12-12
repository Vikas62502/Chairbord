import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { client } from '../../client/Axios';
import { getCache } from '../../helper/Storage';
import useUserData from '../../helper/useUserData';
import profileIcon from '../../assets/DrawerNavigation/profile.png';
import { data } from './drawerData';
import { styles } from './styles';

const ProfileDrawerItem = ({ title, icons, navigateTo }: any) => {
  const userData = useUserData();
  const userId = userData?.userId;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerificationClick = async () => {
    const cachedUserData = await getCache('userData');
    const agentId = userId || cachedUserData?.user?.id;
    setLoading(true);

    try {
      const response = await client.post('/user/agent/mydata', { agentId });
      const profileStatus = response?.data?.verificationStatus;

      if (profileStatus === 'under-review') {
        setModalVisible(true);
      } else if (profileStatus === 'verified') {
        navigation.navigate('ProfileAndMasterInfo');
      } else if (profileStatus === 'not-verified') {
        navigation.navigate('aadharAndPanVerification');
      } else {
        Alert.alert('Unknown profile status');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleVerificationClick}>
      <View style={{ backgroundColor: '#4C6470', paddingHorizontal: '5%' }}>
        <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} />
        <View style={styles.drawerItemStyle}>
          <Image source={profileIcon} style={{ width: 35, height: 35, marginRight: -7 }} />
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF', lineHeight: 24 }}>
              {userData?.user?.name || 'User'}
            </Text>
          </View>
        </View>
        <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Pressable style={styles.closeButtonContainer} onPress={() => setModalVisible(false)}>
                <Image source={require('../../assets/close.png')} style={styles.closeButton} />
              </Pressable>
              <Image source={require('../../assets/success.png')} style={styles.checkImage} />
              <Text style={styles.modalText}>Your profile has been updated and is under review</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.okButton}>
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const getServerStatus = async (agentId: string) => {
  try {
    const response = await client.post(`/sbi/server-status`, { agentId });
    return response.data.isServerOn;
  } catch (error) {
    throw error;
  }
};

const handleNavigation = async (navigation, screen, agentId) => {
  if (screen === 'sbi') {
    try {
      const isServerOn = await getServerStatus(agentId);
      if (isServerOn) {
        navigation.navigate(screen);
      } else {
        Alert.alert('Server is down', 'Please try again later');
      }
    } catch (error) {
      Alert.alert(error.response?.data?.message || 'Something went wrong');
    }
  } else {
    navigation.navigate(screen);
  }
};

const CustomDrawerItem = ({ title, icons, navigateTo }: any) => {
  const { userId } = useUserData();
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (userId) {
      handleNavigation(navigation, navigateTo, userId);
    } else {
      console.warn('Agent ID is not available. Navigation is blocked.');
    }
  };

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View>
        <View style={styles.drawerItemStyle}>
          <Image source={icons} style={{ width: 25, height: 25, marginRight: -2, marginLeft: -2 }} />
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#FFFFFF', lineHeight: 24 }}>
              {title}
            </Text>
          </View>
        </View>
        <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} />
      </View>
    </TouchableOpacity>
  );
};

const CustomDrawer = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#02546D', '#142D40']} style={styles.DrawerStyles}>
      <DrawerContentScrollView>
        <ProfileDrawerItem icons={require('../../assets/DrawerNavigation/avatar.png')} navigateTo="profileAndMasterInfo" />

        {data.map((element, index) => (
          <CustomDrawerItem
            key={index}
            title={element.title}
            icons={element.icon}
            navigateTo={element.screen}
          />
        ))}
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default CustomDrawer;
