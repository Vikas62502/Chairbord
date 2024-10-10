import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from "./src/navigation/Stack/StackNavigation";
import { OrdersProvider } from './src/orderContext/OrderContext';


function App({ }): React.JSX.Element {

  return (
    <OrdersProvider>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer >
    </OrdersProvider>
  );
}

export default App;
