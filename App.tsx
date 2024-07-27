import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from "./src/navigation/Stack/StackNavigation";
import { getCache } from './src/helper/Storage';


function App({ }): React.JSX.Element {

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer >
  );
}

export default App;
