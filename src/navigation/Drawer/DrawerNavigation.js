import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Main from '../../screens/Main';
import Screen1 from '../bottom/Screen1';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import LogoutModal from '../../screens/logout/LogoutModal';
import ContactUs from '../../screens/contactUs/ContactUs';
import DrawerHeader from '../../components/DrawerHeader';
import OverlayHeader from '../../components/OverlayHeader';

const DrawerNavigation = ({ }) => {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name="Main"
                component={Main}
                options={{ header: () => <DrawerHeader /> }}
            />
            <Drawer.Screen
                name="screen1"
                component={Screen1}
                options={{ headerShown: true }}
            />
            <Drawer.Screen
                name="logoutModal"
                component={LogoutModal}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="contactUs"
                component={ContactUs}
                options={{ header: () => <OverlayHeader title={'Contact us'} navigateTo={'dashboard'} /> }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation