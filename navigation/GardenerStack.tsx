import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const Placeholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Panel del jardinero 🌿</Text>
  </View>
);

const GardenerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GardenerDashboard" component={Placeholder} />
  </Stack.Navigator>
);

export default GardenerStack;
