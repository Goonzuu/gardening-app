import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { showToast } from '../../utils/showToast';
import CustomSelect from '../../components/form/CustomSelect';
import Colors from '../../theme/colors';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import AppLoader from '../../components/common/AppLoader';

const mockGardeners = [
  { label: 'Gustavo', value: 'muzza' },
  { label: 'Gonzalo', value: 'lalo' },
];

const RequestServiceScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleServiceRequest = async (values: {
    date: string;
    hour: string;
    gardener: string;
  }) => {
    const { date, hour, gardener } = values;

    if (!date || !hour || !gardener) {
      Alert.alert('Faltan datos', 'Completá todos los campos para continuar');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        userId: user?.uid,
        date,
        hour,
        gardener,
        status: 'pending',
        reason: '',
        createdAt: serverTimestamp(),
      });

      showToast('Solicitud enviada con éxito ✅');
      setTimeout(() => {
        navigation.goBack();
      }, 300); 
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      showToast('Error al enviar solicitud 😓', 'error');
    } finally { setLoading(false); }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Solicitar servicio</Text>

      <Formik
        initialValues={{ date: '', hour: '', gardener: '' }}
        onSubmit={handleServiceRequest}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          const isDateSelected = Boolean(values.date);
          const isHourSelected = Boolean(values.hour);

          return (
            <>
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                style={styles.selector}
              >
                <Feather name="calendar" size={20} color={Colors.primary} />
                <Text style={styles.selectorText}>
                  {values.date || 'Seleccionar fecha'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.helperText}>
                Presioná para desplegar el calendario y seleccionar una fecha 📅
              </Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                display="default"
                locale="es"
                onConfirm={(date) => {
                  setFieldValue('date', date.toLocaleDateString());
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />

              <View style={{ opacity: isDateSelected ? 1 : 0.4 }}>
                <CustomSelect
                  name="hour"
                  label="Seleccionar hora"
                  placeholder="Selecciona la hora"
                  options={[
                    { label: '09:00', value: '09:00' },
                    { label: '11:00', value: '11:00' },
                    { label: '15:00', value: '15:00' },
                  ]}
                  icon="clock"
                  disabled={!isDateSelected}
                />
              </View>

              <View style={{ opacity: isHourSelected ? 1 : 0.4 }}>
                <CustomSelect
                  name="gardener"
                  label="Seleccionar jardinero"
                  placeholder="Selecciona un jardinero"
                  options={mockGardeners}
                  icon="user"
                  disabled={!isHourSelected}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Confirmar solicitud</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
      <AppLoader visible={loading} />
    </SafeAreaView>
  );
};

export default RequestServiceScreen;