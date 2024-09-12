import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet,Dimensions } from 'react-native';
import Inventory from '../../screens/inventory/Inventory';
import Orders from '../../screens/order/Order';
import Home from '../../screens/home/Home';
import Wallet from '../../screens/walllet/Wallet';
import Profile from '../../screens/profile/Profile';
import ContactUs from '../../screens/contactUs/ContactUs';

// Import of tab navigation icons
import inventoryIcon from '../../assets/tabNavigation/inventory.png';
import ordersIcon from '../../assets/tabNavigation/orders.png';
import homeIcon from '../../assets/tabNavigation/home.png';
import contactusIcon from '../../assets/tabNavigation/contactUs.png';
import walletIcon from '../../assets/tabNavigation/wallet.png';
import profileIcon from '../../assets/tabNavigation/profile.png';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window')
const isTablet = width > 768;
const isSmallScreen =width<=420;

const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      initialRouteName='home'
      screenOptions={{
        tabBarStyle: {
          height:isTablet?110: 83,
        },
        tabBarShowLabel: false,
      }}
    >
      <Bottom.Screen
        name="inventory"
        component={Inventory}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={inventoryIcon} focused={focused} />
          ),
        }}
      />
      <Bottom.Screen
        name="order"
        component={Orders}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={ordersIcon} focused={focused} />
          ),
        }}
      />
      <Bottom.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={homeIcon} focused={focused} />
          ),
        }}
      />
      <Bottom.Screen
        name="contactus"
        component={ContactUs}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={contactusIcon} focused={focused} />
          ),
        }}
      />
      {/* <Bottom.Screen
        name="wallet"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={walletIcon} focused={focused} />
          ),
        }}
      /> */}
      <Bottom.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={profileIcon} focused={focused} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

const TabIcon = ({ icon, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused ? (
        <LinearGradient
          colors={['#02546D', '#142D40']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientOverlay}
        >
          <Image source={icon} style={[styles.tabIcon, styles.focusedIcon]} />
        </LinearGradient>
      ) : (
        <Image source={icon} style={styles.tabIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gradientOverlay: {
    padding: isTablet?20:15, // Add padding around the icon
    borderRadius: 50, // Adjust the border radius if needed
    alignItems: 'center', // Center the icon within the gradient
    justifyContent: 'center',
  },
  tabIcon: {
    width: isTablet?45: 30,
    height: isTablet?45:30,
    tintColor: 'black', // Default color for unfocused icons
  },
  focusedIcon: {
    tintColor: 'white', // Make the tint color white for focused icons
  },
});

export default BottomNavigator;