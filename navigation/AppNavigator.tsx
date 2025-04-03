import React from 'react';
import { useAuth } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNavigator = () => {
  const { user } = useAuth();
  
  return user ? <AppStack /> : <AuthStack />
};

export default AppNavigator;
