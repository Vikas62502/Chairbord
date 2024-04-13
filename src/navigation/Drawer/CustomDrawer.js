import { View, Text } from 'react-native'
import React from 'react'
const data = [
    {
        title: 'Dashboard',
        icon: require('../../assets/DrawerNavigation/dashboard.png'),
        screen: 'Dashboard'
    },
    {
        title: 'Wallet',
        icon: require('../../assets/DrawerNavigation/wallet.png'),
        screen: 'wallet'
    },
    {
        title: 'Inventory',
        icon: require('../../assets/DrawerNavigation/inventory.png'),
        screen: 'inventory'
    },
    {
        title: 'Orders',
        icon: require('../../assets/DrawerNavigation/orders.png'),
        screen: 'orders'
    },
    {
        title: 'Issuance Tracker',
        icon: require('../../assets/DrawerNavigation/issuence.png'),
        screen: 'issuence'
    },
    {
        title: 'Vehicle Tracking',
        icon: require('../../assets/DrawerNavigation/vehicleTracking.png'),
        screen: 'vehicleTracking'
    },
    {
        title: 'Requests',
        icon: require('../../assets/DrawerNavigation/requests.png'),
        screen: 'requests'
    },
    {
        title: 'Contact Us',
        icon: require('../../assets/DrawerNavigation/contactUs.png'),
        screen: 'contactUs'
    },
    {
        title: 'Terms & Conditions',
        icon: require('../../assets/DrawerNavigation/termsAndCondition.png'),
        screen: 'termsAndCondition'
    },
    {
        title: 'Privacy Policy',
        icon: require('../../assets/DrawerNavigation/privacyPolicy.png'),
        screen: 'privacyPolicy'
    },
    {
        title: 'Logout',
        icon: require('../../assets/DrawerNavigation/logout.png'),
        screen: 'logout'
    },
]

const CustomDrawer = () => {
    return (
        <View>
            <Text>CustomDrawer</Text>
        </View>
    )
}

export default CustomDrawer