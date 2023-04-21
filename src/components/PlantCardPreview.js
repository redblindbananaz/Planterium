import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/colors"

const PlantCardPreview = (item) => {

    const {
        thumbnail,
        name,
        botanicalName,
        purchaseDate,
        lastWatered,
        wateringFrequency,
        healthRating,
    } = flatlistItems;


    const healthColor = RateColor[healthRating - 1];

    // Calculate time difference between purchase date and current date
    const timeDiff = getTimeDifference(new Date(plant.purchaseDate));

    // Function to calculate time difference between two dates
    function getTimeDifference(purchaseDate) {
        const today = new Date();

        const diff = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24));

        if (diff >= 365) {
            return `${Math.floor(diff / 365)} Years `;
        } else if (diff >= 28) {
            return `${Math.floor(diff / 28)} Months`;
        } else if (diff >= 7) {
            return `${Math.floor(diff / 7)} Weeks `;
        } else if (diff >= 1) {
            return `${diff} Days `;
        } else {
            return "Today";
        }
    }


    return (
        <View style={styles.plantCard}>
            <LinearGradient
                colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                start={[0, 0]}
                end={[0, 1]}
                style={styles.LinearGradientStyle}
            >
                <Image source={{ uri: thumbnail }} style={styles.thumbnailPlant} />
                <View style={styles.midContent}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.botanical}>{botanicalName}</Text>
                    <View style={styles.watering}>
                        <Text style={styles.lastWatered}>
                            {" "}
                            {lastWatered + "  Days ago"}{" "}
                        </Text>
                        <View style={styles.empty}></View>
                        <Text style={styles.nextWatered}>
                            In {wateringFrequency - lastWatered} Days
                        </Text>
                    </View>
                    <Ionicons
                        name="ios-water"
                        size={24}
                        color="white"
                        style={styles.waterIcon}
                    />
                </View>
                <View style={styles.rightContent}>
                    <MaterialCommunityIcons
                        name="leaf-circle-outline"
                        size={30}
                        color={healthColor}
                        style={styles.icon}
                    />
                    <Text style={styles.time}>{timeDiff}</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

export default PlantCardPreview

const styles = StyleSheet.create({
    plantCard: {
        borderColor: colors.FadedWhite,
        borderWidth: 1,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: "row",
        backgroundColor: 'red'
    },
    LinearGradientStyle: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 16,
    },

    thumbnailPlant: {
        height: 65,
        width: 65,
        borderRadius: 100,
        margin: 8,
        opacity: 0.9,
    },
    midContent: {
        flex: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 2,
        color: colors.White,
        textAlign: "center",
    },
    botanical: {
        color: colors.textAccent,
        fontSize: 11,
        marginVertical: 2,
        fontStyle: "italic",
        textAlign: "center",
        letterSpacing: 1,
    },
    watering: {
        backgroundColor: colors.Shadow,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 24,
        marginTop: 8,
        width: "80%",
        height: 24,
        paddingHorizontal: 10,
        shadowColor: "black",
        elevation: 7,
    },
    lastWatered: {
        color: colors.White,
        fontSize: 10,
        fontStyle: "italic",
        textAlignVertical: "center",
    },
    empty: {
        width: 30,
    },
    waterIcon: {
        position: "absolute",
        top: 40,
        padding: 6,
        backgroundColor: colors.Shadow,
        borderRadius: 100,
        alignSelf: "center",
        shadowColor: "black",
        elevation: 7,
    },
    nextWatered: {
        color: colors.Accent,
        fontSize: 13,
        fontStyle: "italic",
        textAlignVertical: "center",
    },

    rightContent: {
        flex: 1,
    },
    icon: {
        textAlign: "center",
        padding: 4,
        marginBottom: 10,
    },
    time: {
        color: colors.textAccent,
        backgroundColor: colors.FadedGreen,
        fontSize: 10,
        height: 24,
        marginRight: 8,
        paddingHorizontal: 2,
        borderRadius: 24,
        textAlign: "center",
        textAlignVertical: "center",
        shadowColor: "black",
        elevation: 10,
    },
})