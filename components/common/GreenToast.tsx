import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../theme/colors';

interface Props {
    text1?: string;
    type: 'success' | 'error';
}

const GreenToast = ({ text1, type }: Props) => {
    const isSuccess = type === 'success';

    return (
        <View style={[styles.container, isSuccess ? styles.success : styles.error]}>
            <Feather
                name={isSuccess ? 'check-circle' : 'x-circle'}
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
            />
            <Text style={styles.text}>{text1}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    success: {
        backgroundColor: Colors.primary,
    },
    error: {
        backgroundColor: '#E53E3E',
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default GreenToast;
