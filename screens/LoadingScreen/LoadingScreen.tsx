import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Colors from '../../theme/colors';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.mutedText,
  },
});

export default LoadingScreen;
