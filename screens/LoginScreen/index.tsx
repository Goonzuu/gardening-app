import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../utils/validationSchemas';
import styles from './styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { showToast } from '../../utils/showToast';
import { Icons } from '../../constants/icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppLoader from '../../components/common/AppLoader';
import CustomInput from '../../components/form/CustomInput';
import CustomButton from '../../components/common/CustomButton';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error: any) {
      let message = 'Ocurrió un error al iniciar sesión';
      if (error.code === 'auth/user-not-found') {
        message = 'El usuario no existe';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Contraseña incorrecta';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Correo inválido';
      }
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={Icons.laveman} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>Iniciar sesión</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <View style={{ width: '100%' }}>
              <CustomInput name="email" placeholder="Correo electronico" icon="mail" keyboardType="email-address"
                autoCapitalize="none" />
              <CustomInput name="password" placeholder="Contraseña" secure
                icon="lock"
                rightIconToggle="eye" />
              <CustomButton
                title="Iniciar Sesión"
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.secondaryAction}
        >
          <Text style={styles.secondaryText}>
            ¿No tenés cuenta? <Text style={styles.link}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <AppLoader visible={loading} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

