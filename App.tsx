import { Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/components/HomeScreen";
import FastTagAndGps from "./src/components/FastTagAndGps";
import HistoricalData from "./src/components/HistoricalData";
import SmsAlert from "./src/components/SmsAlert";
import SaveFuelAndTime from "./src/components/SaveFuelAndTime";
import SignIn from "./src/screens/SignIn";
import OTP from "./src/screens/opt/OTP";
import Register from "./src/screens/register/Register";
import Dashboard from "./src/screens/dashboard/Dashboard";
import 'react-native-gesture-handler';
import DrawerNavigation from "./src/navigation/Drawer/DrawerNavigation";
import MainDrawer from "./src/navigation/Drawer/MainDrawer";
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="dashboard" component={Dashboard} options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#263238",
          },
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 15, minHeight: 100 }}>
                <Image source={require("../Chairbord/src/assets/avatar.png")} />
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
              <Image source={require("../Chairbord/src/assets/notificationBell.png")} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => console.log("open Drawer")}>
              <Image source={require("../Chairbord/src/assets/DrawerTripleLine.png")} />
            </TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Drawer" component={MainDrawer} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;
