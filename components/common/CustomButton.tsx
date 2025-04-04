import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import Colors from '../../theme/colors';

type ButtonVariant = 'primary' | 'outline';

interface Props {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    style?: ViewStyle;
}

const CustomButton: React.FC<Props> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary',
    style,
}) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.base,
                isPrimary ? styles.primary : styles.outline,
                (disabled || loading) && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? '#fff' : Colors.primary} />
            ) : (
                <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textOutline]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        marginTop: 8,
    },
    primary: {
        backgroundColor: Colors.primary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textPrimary: {
        color: '#fff',
    },
    textOutline: {
        color: Colors.primary,
    },
    disabled: {
        opacity: 0.5,
    },
});

export default CustomButton;
