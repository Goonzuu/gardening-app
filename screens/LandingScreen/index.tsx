import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icons } from '../../constants/icons';

const LandingScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={styles.container}>
            <Image
                source={Icons.plant}
                style={styles.icon}
                resizeMode="contain"
            />

            <Text style={styles.title}>Bienvenido a GreenTime</Text>
            <Text style={styles.subtitle}>Organizá la atención a tu jardín con facilidad</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.secondaryText}>Ya tengo cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LandingScreen;
