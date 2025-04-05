import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import GardenerStack from './GardenerStack';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';

const AppNavigator = () => {
  const { user, userRole } = useAuth();

  if (!user) return <AuthStack />;

  if (!userRole) return <LoadingScreen />;

  if (userRole === 'user') return <UserStack />;
  if (userRole === 'gardener') return <GardenerStack />;

  return <LoadingScreen />;
};

export default AppNavigator;

