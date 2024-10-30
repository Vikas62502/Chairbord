import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from "./src/navigation/Stack/StackNavigation";
import { OrdersProvider } from './src/orderContext/OrderContext';
import DrawerNavigation from './src/navigation/Drawer/DrawerNavigation';
const punycode = require('punycode');

function App({ }): React.JSX.Element {

  return (
    <OrdersProvider>
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer >
    </OrdersProvider>
  );
}

export default App;
