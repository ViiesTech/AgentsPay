/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { Dimensions, FlatList, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from '../utils/Colors';
import { ArrowDown2, ArrowRight2 } from 'iconsax-react-native';
import { Pera, Small } from '../utils/Text';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('screen');
const Dropdown = ({ selectedData, multiple, defaultValue, style, data, selectedValue, onValueChange, defaultStyle, label, icon }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (item) => {
        onValueChange(item);
        if (!multiple) {
            setIsVisible(false);
        }
    };

    const defaulDropdownButton = defaultStyle ? {
        borderColor: Color('gray'),
        borderWidth: 1,
        minHeight: Platform.OS === 'ios' ? 60 : height * 0.065,
        borderRadius: 10,
    } : {};
    const defaultDropdownButtonText = defaultStyle ? {
        color: Color('darkTheme'),
        fontSize: RFValue(15, height),
        paddingLeft: width * 0.03,
    } : {};

    return (
        <View style={style}>
            <TouchableOpacity style={[styles.dropdownButton, defaulDropdownButton]} onPress={() => setIsVisible(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Pera style={[styles.dropdownButtonText, defaultDropdownButtonText]}>{selectedValue || defaultValue || 'Select an option'}</Pera>
                </View>
                <ArrowDown2
                    size="15"
                    color="#FFF"
                    style={{ right: 10 }}
                />
            </TouchableOpacity>
            <Modal visible={isVisible} transparent={true} animationType="slide">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
                    <View style={styles.dropdown}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item.value || item.label)}>
                                    {/* {multiple && selectedData.includes(item.value || item.label) && <ArrowRight2 size={height * 0.015} color={Color('btnText')} style={{marginBottom: height * 0.003}} />} */}
                                    <Pera style={styles.dropdownItemText}>{item.label}</Pera>
                                    {multiple && selectedData.includes(item.value || item.label) && <Small style={[styles.dropdownItemText, { color: Color('navigationBackground') }]}>(Selected)</Small>}
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
    dropdownButton: {
        paddingVertical: width * 0.04,
        paddingLeft: width * 0.02,
        borderBottomColor: Color('btnOutline'),
        borderBottomWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownButtonText: {
        color:  Color("textLight"),
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color('modalBackground'),
        zIndex: 1,
    },
    dropdown: {
        width: width * 0.9,
        backgroundColor: Color('textColor'),
        borderWidth: 1,
        borderColor: Color('gray'),
        borderRadius: 5,
        maxHeight: height * 0.5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color('gray'),
        flexDirection: 'row',
        alignItems: 'center',
        gap: height * 0.007,
    },
    dropdownItemText: {
        color: Color('btnText'),
    },
});

export default Dropdown;
