import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useField } from 'formik';
import Colors from '../../theme/colors';
import { Feather } from '@expo/vector-icons';

interface Option {
    label: string;
    value: string;
}

interface Props {
    name: string;
    label?: string;
    options: Option[];
    placeholder?: string;
    icon?: keyof typeof Feather.glyphMap;
    disabled?: boolean;
}

const CustomSelect: React.FC<Props> = ({ name, label, options, placeholder = '', icon, disabled }) => {
    const [field, meta, helpers] = useField(name);
    const [visible, setVisible] = useState(false);

    const hasError = meta.touched && meta.error;

    const handleSelect = (value: string) => {
        helpers.setValue(value);
        helpers.setTouched(true);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={[
                    styles.select,
                    hasError && styles.errorBorder,
                    disabled && styles.disabledSelect,
                ]}
                onPress={() => !disabled && setVisible(true)}
                activeOpacity={disabled ? 1 : 0.7}
            >
                <View style={styles.iconWrapper}>
                    {icon && <Feather name={icon} size={18} color={Colors.mutedText} style={styles.icon} />}
                    <Text style={[styles.text, !field.value && styles.placeholder]}>
                        {options.find(opt => opt.value === field.value)?.label || placeholder}
                    </Text>
                </View>
                <Feather name="chevron-down" size={18} color={Colors.mutedText} />
            </TouchableOpacity>

            {hasError && <Text style={styles.errorText}>{meta.error}</Text>}

            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalBackdrop} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 6,
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderColor: '#CBD5E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontSize: 16,
        color: Colors.text,
    },
    placeholder: {
        color: '#A0AEC0',
    },
    errorText: {
        color: '#E53E3E',
        marginTop: 4,
        fontSize: 13,
    },
    errorBorder: {
        borderColor: '#E53E3E',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 8,
        maxHeight: 300,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
        color: Colors.text,
    },
    disabledSelect: {
        backgroundColor: '#EDF2F7',
        borderColor: '#CBD5E0',
    },
});

export default CustomSelect;
