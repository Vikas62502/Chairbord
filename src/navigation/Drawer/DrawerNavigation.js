import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Main from '../../screens/Main';
import Screen1 from '../bottom/Screen1';


const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator >
            <Drawer.Screen
                name="Main"
                component={Main}
                options={{ headerShown: true }}
            />
            <Drawer.Screen
                name="screen1"
                component={Screen1}
                options={{ headerShown: true }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation