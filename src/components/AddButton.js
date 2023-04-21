import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../config/colors";

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.circle}>
                <Text style={styles.plus}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "transparent",
        bottom: 20,
        right: 28,
    },
    circle: {
        borderColor: colors.Accent,
        borderWidth: 1.5,
        borderRadius: 100,
        height: 50,
        width: 50,
    },
    plus: {
        flex: 1,
        fontSize: 48,
        textAlign: "center",
        includeFontPadding: false,
        lineHeight: 51,
        fontWeight: 200,
        color: colors.Accent,
    },
});
