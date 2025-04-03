import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={{ width: '100%' }}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#A0AEC0"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
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

