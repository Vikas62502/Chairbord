import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Main from '../../screens/Main';
import {
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import LogoutModal from '../../screens/logout/LogoutModal';
import ContactUs from '../../screens/contactUs/ContactUs';
import DrawerHeader from '../../components/DrawerHeader';
import OverlayHeader from '../../components/OverlayHeader';
import Dashboard from '../../screens/dashboard/Dashboard';
import Wallet from '../../screens/walllet/Wallet';

const DrawerNavigation = ({ }) => {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()
    return (
        <Drawer.Navigator
            initialRouteName='dashboard'
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name="Main"
                component={Main}
                options={{ header: () => <DrawerHeader /> }}
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
            <Drawer.Screen
                name="dashboard"
                component={Dashboard}
                options={{ header: () => <DrawerHeader /> }}
            />
            <Drawer.Screen
                name="wallet"
                component={Wallet}
                options={{ header: () => <OverlayHeader title={"Wallet"} /> }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation