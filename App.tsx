import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MainDrawer from "./src/navigation/Drawer/MainDrawer";
import StackNavigation from "./src/navigation/Stack/StackNavigation";


function App({ }): React.JSX.Element {

  return (
    <NavigationContainer>
      <StackNavigation />
      {/* <MainDrawer /> */}
    </NavigationContainer >
  );
}

export default App;
