import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../config/colors"

const HealthItems = [
    { id: 1, name: 'Dead', color: colors.Red },
    { id: 2, name: 'Poor', color: colors.Orange },
    { id: 3, name: 'Fair', color: colors.Yellow },
    { id: 4, name: 'Good', color: colors.LightGreen },
    { id: 5, name: 'Great', color: colors.Full },
];

const HealthRate = ({ onHealthSelect, selectedHealth }) => {
    // const [selectedHealth, setSelectedHealth] = useState('5');

    const handleHealthPress = (id) => {
        if (selectedHealth === id) {
            // deselect if already selected
            onHealthSelect('5');
        }
        else {
            onHealthSelect(id);

        }
    };
    const renderHealthItems = () =>
        HealthItems.map((health) => (
            <TouchableOpacity
                key={health.id}
                onPress={() => handleHealthPress(health.id)}
                style={[
                    styles.healthItem,
                    selectedHealth === health.id && styles.activeHealthItem,
                ]}
            >
                <MaterialCommunityIcons
                    name="leaf-circle-outline"
                    size={30}
                    color={health.color}
                    style={styles.healthIcon}
                />
                <Text style={{ color: health.color }}>{health.name}</Text>
            </TouchableOpacity>
        ));
    return (
        <View style={styles.container}>
            <View style={styles.healthItemsContainer}>{renderHealthItems()}</View>
            {selectedHealth && (
                <View style={styles.BottomContainer}>

                </View>
            )}
        </View>
    )
}

export default HealthRate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    healthItemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    healthItem: {
        alignItems: 'center',
        height: 65,
        borderBottomColor: 'transparent',
        borderBottomWidth: 4,

    },

    activeHealthItem: {
        alignItems: 'center',
        height: 65,
        borderBottomColor: colors.Accent,
        borderBottomWidth: 4,

    },

    BottomContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
})