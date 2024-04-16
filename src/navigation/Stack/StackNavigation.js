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
import Dashboard from '../../screens/dashboard/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawer from '../Drawer/MainDrawer';
const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
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
            {/* <Stack.Screen name="dashboard" component={Dashboard} options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#263238",
                },
                headerBackVisible: false,
                headerTitleAlign: "center",
                headerTitle: () => (
                    <View>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 15, minHeight: 100 }}>
                            <Image source={require("../../assets/avatar.png")} />
                            <Text style={{
                                fontWeight: "700",
                                fontSize: 16,
                                lineHeight: 18,
                                color: "#FFFFFF",
                                textAlign: "center",
                            }}>Alex</Text>
                        </TouchableOpacity>
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity>
                        <Image source={require("../../assets/notificationBell.png")} />
                    </TouchableOpacity>
                ),
                headerLeft: () => (
                    <TouchableOpacity onPress={() => console.log("called")}>
                        <Image source={require("../../assets/DrawerTripleLine.png")} />
                    </TouchableOpacity>
                )
            }} /> */}
            <Stack.Screen name="dashboard" component={MainDrawer} />
        </Stack.Navigator>
    )
}

export default StackNavigation