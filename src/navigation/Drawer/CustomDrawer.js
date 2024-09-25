import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import LogoutModal from '../../screens/logout/LogoutModal';
import useUserData from '../../helper/useUserData';
import profileIcon from '../../assets/DrawerNavigation/profile.png';
// const profileData = [
//     {
//         title: "User",
//         icon: require('../../assets/DrawerNavigation/avatar.png'),
//         screen: "profileAndMasterInfo",
//     }
// ]

const ProfileDraweritem = ({ title, icons, navigateTo }) => {
    const userData = useUserData();
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
            <View style={{ backgroundColor: "#4C6470", paddingHorizontal: "5%" }}>
                <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} alt='borderBottom' />
                <View style={styles.drawerItemStyle}>
                    <Image source={profileIcon} alt='profileLogo' style={{width:40 ,height:40,marginRight:-7}}/>
                    <View style={{ width: "80%", }}>
                        <Text style={{ fontSize: 22, fontWeight: 600, color: "#FFFFFF", lineHeight: 24, }}>
                            {userData?.user?.name || 'User'}
                        </Text>
                    </View>
                </View>
                <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} alt='borderBottom' />
            </View>
        </TouchableOpacity>
    )
}

const data = [
    {
        title: 'Dashboard',
        icon: require('../../assets/DrawerNavigation/dashboard.png'),
        screen: 'dashboard'
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
        icon: require('../../assets/DrawerNavigation/issuance.png'),
        screen: 'issuanceTracker'
    },
    // {
    //     title: 'Vehicle Tracking',
    //     icon: require('../../assets/DrawerNavigation/vehicleTracking.png'),
    //     screen: 'vehicleTracking'
    // },
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
        screen: 'logoutModal'
    },
]

const logoutData =
{
    title: 'Logout',
    icon: require('../../assets/DrawerNavigation/logout.png'),
    screen: 'logoutModal'
}


const CustomDrawerItems = ({ title, icons, navigateTo }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
            <View>
                <View style={styles.drawerItemStyle}>
                    <Image source={icons} alt={`${title}`} style={{width:32 ,height:32,marginRight:-2,marginLeft:-2}} />
                    <View style={{ width: "70%" }}>
                        <Text style={{ fontSize: 20, fontWeight: 500, color: "#FFFFFF", lineHeight: 24, }}>
                            {title}
                        </Text>
                    </View>
                </View>
                <Image source={require("../../assets/DrawerNavigation/borderBottom.png")} alt='borderBottom' />
            </View>
        </TouchableOpacity>
    )
}

const CustomDrawer = () => {
    const navigation = useNavigation();
    const [logoutModal, setLogoutModal] = useState(false);
    return (
        <LinearGradient colors={['#02546D', '#142D40']} style={styles.DrawerStyles}>
            <DrawerContentScrollView>
                <View>
                    <ProfileDraweritem
                        icons={require('../../assets/DrawerNavigation/avatar.png')}
                        navigateTo="profileAndMasterInfo"
                    />
                </View>

                {data.map((element, index) => (
                    <CustomDrawerItems
                        key={index}
                        title={element.title}
                        icons={element.icon}
                        navigateTo={element.screen}
                    />
                ))}
                {/* <Pressable onPress={() => setModalVisible(true)}
                >
                    <CustomDrawerItems
                        key={logoutData.title}
                        title={logoutData.title}
                        icons={logoutData.icon}
                        navigateTo={logoutData.screen}
                    />
                </Pressable> */}
            </DrawerContentScrollView>
            {/* <LogoutModal modalVisible={logoutModal} setModalVisible={setLogoutModal} /> */}
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    DrawerStyles: {
        backgroundColor: "#2F414A",
        flex: 1,
    },
    drawerItemStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "7%",
        gap: 20,
    },
})

export default CustomDrawer