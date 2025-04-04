import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useField } from 'formik';
import Colors from '../../theme/colors';

interface Props extends TextInputProps {
    name: string;
    label?: string;
}

const CustomInput: React.FC<Props> = ({ name, label, ...props }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <View style={{ marginBottom: 16 }}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                style={[styles.input, meta.touched && meta.error && styles.inputError]}
                value={field.value}
                onChangeText={helpers.setValue}
                onBlur={helpers.setTouched}
                {...props}
            />

            {meta.touched && meta.error && (
                <Text style={styles.error}>{meta.error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#F7FAFC',
        borderColor: '#CBD5E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
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
    label: {
        marginBottom: 6,
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default CustomInput;
