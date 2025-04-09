import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';

const CheckAppointmentScreen = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'serviceRequests'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#38A169" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis turnos</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>
              📅 {item.date} - ⏰ {item.hour}
            </Text>
            <Text style={styles.gardener}>👨‍🌾 {item.gardener}</Text>
            <Text style={[styles.status, styles[item.status]]}>
              {item.status === 'pending' && '⏳ Pendiente'}
              {item.status === 'approved' && '✅ Aprobado'}
              {item.status === 'rejected' && '❌ Rechazado'}
            </Text>
            {item.status === 'rejected' && item.reason && (
              <Text style={styles.reason}>Motivo: {item.reason}</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Todavía no tenés turnos registrados.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default CheckAppointmentScreen;
