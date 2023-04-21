import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from "../config/colors";

const Welcome = () => {
    return (
        <View style={styles.containera}>
            <Text style={styles.title}>Welcome to Plant Pal!</Text>
            <Image source={require('../Assets/logo.png')} style={styles.image} />
            <Text style={styles.content}>You have no plants yet in your collection.
            </Text>
            <Text style={styles.content2}>
                To add a Plant, please press the yellow Plus button below:</Text>

        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    containera: {
        flex: 1,
        width: 360,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.background,
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderColor: colors.Accent,
        borderWidth: 1,

    },
    title: {
        fontSize: 28,
        fontWeight: '400',
        color: colors.FadedWhite,
        letterSpacing: 2,
    },
    content: {
        fontSize: 14,
        fontWeight: '300',
        color: colors.FadedWhite,
        letterSpacing: 2,
        marginBottom: 8,
    },

    content2: {
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'italic',
        color: colors.FadedWhite,
        letterSpacing: 2,
        marginBottom: 16,
    }
})