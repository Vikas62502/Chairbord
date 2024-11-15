import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from "./src/navigation/Stack/StackNavigation";
import { OrdersProvider } from './src/orderContext/OrderContext';
import DrawerNavigation from './src/navigation/Drawer/DrawerNavigation';
import { disconnectSocket, initializeSocket, serverURL } from './src/utils/socket';
import { useEffect, useState } from 'react';
import { getCache } from './src/helper/Storage';


function App({ }): React.JSX.Element {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState<any>();

  // Fetch user data and set it to state
  const getUserData = async () => {
    const userData = await getCache('userData');
    setUserData(userData);
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Initialize socket only when userData is available
  console.log(socket,'id..........')
  useEffect(() => {
    if (userData?.user?.id) {
      const socket: any = initializeSocket(serverURL, userData.user.id);
      setSocket(socket);

      socket.on("connect", () => {
        console.log("Connected to the server!");
      });

      // Clean up and disconnect socket on unmount
      return () => {
        disconnectSocket();
      };
    }
  }, [userData]);
  return (
    <OrdersProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer >
    </OrdersProvider>
  );
}

export default App;
