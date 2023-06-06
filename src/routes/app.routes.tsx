import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';
import { Details } from '../screens/Details';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#32264d",
                    tabBarInactiveTintColor: "#c1bccc",
                    tabBarActiveBackgroundColor: "#ebebf5",
                    tabBarInactiveBackgroundColor: "#fafafc",
                    tabBarLabelStyle: {
                        fontSize: 13,
                        position: 'absolute',
                        top: 15,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    tabBarIconStyle: { display: "none" }
            }}
        >

            <Screen 
            name="Eventos"
            component={ Dashboard }
            />

            <Screen 
            name="Novo"
            component={ Register }
            />

            <Screen 
            name="Detalhes"
            component={ Details }
            />

        </Navigator>
    )
}