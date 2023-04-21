import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/colors"

const Registercards = ({ caterory, children, underlineSize }) => {
    return (
        <View style={{
            flex: 1,
            borderColor: colors.FadedWhite,
            borderWidth: 1,
            borderRadius: 16,
            marginVertical: 8,
            marginHorizontal: 8,
        }}>
            <LinearGradient
                colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                start={[0, 0]}
                end={[0, 1]}
                style={styles.Linear}
            >
                <View style={styles.pad}>
                    <Text style={styles.categories}>{caterory}</Text>
                    <View
                        style={{
                            borderBottomColor: "white",
                            borderBottomWidth: 2,
                            paddingTop: 2,
                            width: underlineSize,
                            alignItems: "flex-start",
                        }}
                    />
                    {children}
                </View>
            </LinearGradient>

        </View>
    )
}

export default Registercards

const styles = StyleSheet.create({
    Linear: {
        flex: 1,
        borderRadius: 16,
    },
    pad: {
        marginTop: 20,
        padding: 16,
    },
    categories: {
        fontSize: 20,
        letterSpacing: 4,
        color: colors.White,
    },
})