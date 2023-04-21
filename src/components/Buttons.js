import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from "../config/colors"

const Buttons = ({ cancelPress, actionPress, actionName }) => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelPress}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectButton} onPress={actionPress}>
                <Text style={styles.selectButtonText}>{actionName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Buttons

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,

    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 16,
    },
    cancelButtonText: {
        fontSize: 24,
        color: colors.Accent,
        fontStyle: "italic",
        fontWeight: "300",
        letterSpacing: 4,
        lineHeight: 24,
        textDecorationLine: "underline",
        textDecorationColor: colors.Accent
    },
    selectButton: {
        justifyContent: "center",
        paddingHorizontal: 28,
        borderColor: "rgba(217, 217, 217, 0.5)",
        borderWidth: 1,
        borderRadius: 32,
        backgroundColor: "rgba(28,47,37,0.7)",

    },
    selectButtonText: {
        textAlign: "center",
        fontSize: 24,
        letterSpacing: 4,
        lineHeight: 26,
        color: 'white',
    },
})