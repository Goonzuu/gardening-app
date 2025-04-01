import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import RequestServiceScreen from '../screens/RequestServiceScreen';
import CheckAppointmentScreen from '../screens/CheckAppointmentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RequestService" component={RequestServiceScreen} />
        <Stack.Screen name="CheckAppointment" component={CheckAppointmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
