import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import RequestServiceScreen from '../screens/RequestServiceScreen';
import CheckAppointmentScreen from '../screens/CheckAppointmentScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';

const Stack = createNativeStackNavigator();

const UserStack = () => (
  <Stack.Navigator initialRouteName="UserDashboard" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="RequestService" component={RequestServiceScreen} />
    <Stack.Screen name="CheckAppointment" component={CheckAppointmentScreen} />
    <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
  </Stack.Navigator>
);

export default UserStack;
