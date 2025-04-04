import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { useField } from 'formik';
import Colors from '../../theme/colors';
import { Feather } from '@expo/vector-icons';

interface Props extends TextInputProps {
    name: string;
    label?: string;
    icon?: keyof typeof Feather.glyphMap;
    secure?: boolean;
    rightIconToggle?: 'eye';
}

const CustomInput: React.FC<Props> = ({
    name,
    label,
    icon,
    secure,
    rightIconToggle,
    ...props
}) => {
    const [field, meta, helpers] = useField(name);
    const [showPassword, setShowPassword] = useState(!secure);

    const hasError = meta.touched && meta.error;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[styles.inputWrapper, hasError && styles.inputError]}>
                {icon && (
                    <Feather
                        name={icon}
                        size={20}
                        color={Colors.mutedText}
                        style={{ marginRight: 8 }}
                    />
                )}

                <TextInput
                    value={field.value}
                    onChangeText={helpers.setValue}
                    onBlur={helpers.setTouched}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    placeholderTextColor="#A0AEC0"
                    {...props}
                />

                {rightIconToggle === 'eye' && (
                    <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                        <Feather
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={Colors.mutedText}
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {hasError && <Text style={styles.error}>{meta.error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        marginBottom: 6,
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderColor: '#CBD5E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
    },
    inputError: {
        borderColor: '#E53E3E',
    },
    error: {
        color: '#E53E3E',
        fontSize: 13,
        marginTop: 4,
    },
});

export default CustomInput;
