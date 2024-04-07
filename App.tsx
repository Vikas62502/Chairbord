import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/components/HomeScreen";
import FastTagAndGps from "./src/components/FastTagAndGps";
import HistoricalData from "./src/components/HistoricalData";
import SmsAlert from "./src/components/SmsAlert";
import SaveFuelAndTime from "./src/components/SaveFuelAndTime";
import SignIn from "./src/screens/SignIn";
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    // <View>
    //   <Text>Rom Rom Bhai</Text>
    // </View>
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
      </Stack.Navigator>
    </NavigationContainer >
  );
}

// const styles = StyleSheet.create({
//   backgroundWhite: {
//     backgroundColor: 'white'
//   }
// })

export default App;
