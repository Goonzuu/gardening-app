import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/gardening-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido a greenTime!</Text>
      <Text style={styles.subtitle}>Tu jardín, está en buenas manos.</Text>

      <TouchableOpacity onPress={() => navigation.navigate('RequestService')} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Solicitar servicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CheckAppointment')} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>¿ Ya tenés un turno ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
