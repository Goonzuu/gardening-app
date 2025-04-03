import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../theme/colors';

interface AppLoaderProps {
    visible: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ visible }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppLoader;
