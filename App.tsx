import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import GreenToast from './components/common/GreenToast';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <Toast
          config={{
            success: (props) => <GreenToast {...props} type="success" />,
            error: (props) => <GreenToast {...props} type="error" />,
          }} />
      </NavigationContainer>
    </AuthProvider>
  );
}
