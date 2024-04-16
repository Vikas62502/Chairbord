import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../../components/HomeScreen';
import FastTagAndGps from '../../components/FastTagAndGps';
import HistoricalData from '../../components/HistoricalData';
import SmsAlert from '../../components/SmsAlert';
import SaveFuelAndTime from '../../components/SaveFuelAndTime';
import SignIn from '../../screens/SignIn';
import OTP from '../../screens/opt/OTP';
import Register from '../../screens/register/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawer from '../Drawer/MainDrawer';
const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="dashboard" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FastTagAndGPS" component={FastTagAndGps} />
            <Stack.Screen name="HistoricalData" component={HistoricalData} />
            <Stack.Screen name="SmsAlert" component={SmsAlert} />
            <Stack.Screen name="SaveFuelAndTime" component={SaveFuelAndTime} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="drawer" component={MainDrawer} />
        </Stack.Navigator>
    )
}

export default StackNavigation