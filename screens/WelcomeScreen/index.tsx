import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/gardening-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido a greenTime!</Text>
      <Text style={styles.subtitle}>Tu jardín, está en buenas manos.</Text>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Solicitar servicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>¿ Ya tenés un turno ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
