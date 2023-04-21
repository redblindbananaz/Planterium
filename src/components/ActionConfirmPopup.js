import { StyleSheet, Text, View, TouchableOpacity, Modal, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from "../config/colors"
import Buttons from './Buttons'

const ActionConfirmPopup = ({ title, message, message2, cancelPress, actionPress, actionName }) => {



    return (

        <View style={styles.modalContainer} >
            <StatusBar
                backgroundColor="rgba(0, 0, 0, 0.7)"
                barStyle="light-content"
            />
            <View style={styles.containera}>
                <Text style={styles.title}>{title}</Text>
                <Image source={require('../Assets/logo.png')} style={styles.image} />
                <Text style={styles.content}>{message}
                </Text>
                <Text style={styles.content2}>
                    {message2}</Text>
                <Buttons cancelPress={cancelPress} actionPress={actionPress} actionName={actionName} />

            </View>

        </View>

    )
}

export default ActionConfirmPopup

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    containera: {
        width: 360,
        height: 600,
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