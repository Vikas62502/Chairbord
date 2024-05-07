import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet } from 'react-native';
import Inventory from '../../screens/inventory/Inventory';
import Orders from '../../screens/order/Order';
import Home from '../../screens/home/Home';
import Wallet from '../../screens/walllet/Wallet';
import Profile from '../../screens/profile/Profile';

// Import of tab navigation icons
import inventoryIcon from '../../assets/tabNavigation/inventory.png';
import ordersIcon from '../../assets/tabNavigation/orders.png';
import homeIcon from '../../assets/tabNavigation/home.png';
import walletIcon from '../../assets/tabNavigation/wallet.png';
import profileIcon from '../../assets/tabNavigation/profile.png';

const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      initialRouteName='home'
      screenOptions={{
        tabBarStyle: {
          height: 83
        },
        tabBarShowLabel: false
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
        name="wallet"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={walletIcon} focused={focused} />
          ),
        }}
      />
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
      {focused && <View style={styles.focusIndicator} />}
      <Image
        source={icon}
        style={[styles.tabIcon, { tintColor: focused ? 'white' : 'black' }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
  },
  focusIndicator: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'black',
    bottom: -15,
  },
});


export default BottomNavigator;
