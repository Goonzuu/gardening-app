import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../theme/colors';
import styles from './styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

const UserDashboardScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { user } = useAuth();

    const displayName = user?.displayName?.split(' ')[0] || 'Usuario';

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.greeting}>Hola, {displayName} 👋</Text>
            <Text style={styles.subtitle}>¿Qué querés hacer hoy?</Text>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('RequestService')}
            >
                <Feather name="calendar" size={24} color={Colors.primary} />
                <Text style={styles.cardText}>Solicitar servicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('CheckAppointment')}
            >
                <Feather name="clock" size={24} color={Colors.primary} />
                <Text style={styles.cardText}>Ver mis turnos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ManageAddress')}
            >
                <Feather name="map-pin" size={24} color={Colors.primary} />
                <Text style={styles.cardText}>Dirección de domicilio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Feather name="log-out" size={20} color={Colors.error} />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

export default UserDashboardScreen;
