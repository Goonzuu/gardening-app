import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { showToast } from '../../utils/showToast';
import { Icons } from '../../constants/icons';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { recentlyRegistered, setRecentlyRegistered } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (recentlyRegistered) {
        showToast('Cuenta creada con éxito ✅');
        setRecentlyRegistered(false);
      }
    }, [recentlyRegistered])
  );

  return (
    <View style={styles.container}>
      <Image
        source={Icons.flowerman}
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
