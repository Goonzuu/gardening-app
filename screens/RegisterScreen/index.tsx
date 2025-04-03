import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icons } from '../../constants/icons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { Alert } from 'react-native';


const RegisterScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            Alert.alert('Error', 'Por favor completá todos los campos');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: fullName,
            });

            Alert.alert('Registro exitoso', '¡Bienvenido a GreenTime!');
        } catch (error: any) {
            let errorMessage = 'Ocurrió un error al crear la cuenta';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este correo ya está en uso';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Correo inválido';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'La contraseña debe tener al menos 6 caracteres';
            }

            Alert.alert('Error', errorMessage);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <Image
                    source={Icons.flowerman}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Text style={styles.title}>¡Registrate en GreenTime!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#A0AEC0"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#A0AEC0"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.secondaryAction}>
                    <Text style={styles.secondaryText}>
                        ¿Ya tenés cuenta? <Text style={styles.link}>Iniciar sesión</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
