import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import { Details } from './src/screens/Details';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
  
    </>
  );
}
