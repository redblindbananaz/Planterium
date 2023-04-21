import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../config/colors";
import { AntDesign } from '@expo/vector-icons';

const Watering = ({ initialValue, onValueChange }) => {

    const [value, setValue] = useState(initialValue || 4);

    useEffect(() => {
        // Call the onValueChange callback with the updated value whenever the value changes
        onValueChange(value);
    }, [value]);

    const handleIncrement = () => {
        // Check if value is greater than 31 before incrementing
        if (value < 31) {
            setValue(value + 1);
        }
    };

    const handleDecrement = () => {
        // Check if value is greater than 0 before decrementing
        if (value > 0) {
            setValue(value - 1);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.waterContainer}>
                <Ionicons name="water-sharp" size={24} color="white" style={styles.icon} />
                <Text style={styles.wateringSub}>Water Every :</Text>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={handleDecrement}>
                        <AntDesign name="minuscircleo" size={24} color="white" style={styles.operatorContainer} />
                    </TouchableOpacity>
                    <Text style={styles.countText}>{value}</Text>
                    <TouchableOpacity onPress={handleIncrement}>
                        <AntDesign name="pluscircleo" size={24} color="white" style={styles.operatorContainer} />
                    </TouchableOpacity>
                    <Text style={styles.dayText}>Days</Text>

                </View>
            </View>

        </View>
    )
}

export default Watering

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
    },
    waterContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    wateringSub: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.White,
        letterSpacing: 2,
        textAlignVertical: 'center',
    },
    dayText: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.White,
        letterSpacing: 2,
        textAlignVertical: 'center',
        marginLeft: 16,
    },
    counterContainer: {
        flexDirection: 'row',
        marginLeft: 16,
    },
    countText: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: colors.FadedGreen,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: colors.White,
    },
    operatorContainer: {
        padding: 8,
    },
    icon: {
        paddingVertical: 8,
        paddingRight: 8,
    },
})