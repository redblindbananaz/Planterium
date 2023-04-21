import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { colors } from '../config/colors'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import WelcomeMessage from '../components/WelcomeMessage'

const Rooms = () => {
    const locations = [
        { id: 1, name: 'Bedroom', image: require('../Assets/bedroom.png') },
        { id: 2, name: 'Lounge', image: require('../Assets/lounge.png') },
        { id: 3, name: 'Bathroom', image: require('../Assets/bathroom.png') },
        { id: 4, name: 'Kitchen', image: require('../Assets/kitchen.png') },
        { id: 5, name: 'Office', image: require('../Assets/office.png') },
        { id: 6, name: 'Cabinet', image: require('../Assets/cabinet.png') },
        { id: 7, name: 'Other', image: require('../Assets/hallway.png') },
    ];
    const RenderLocation = ({ item }) => {

        return (

            <ScrollView>
                <TouchableOpacity>
                    <View style={styles.roomCard}>
                        <LinearGradient
                            colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                            start={[0, 0]}
                            end={[0, 1]}
                            style={styles.LinearGradientStyle}
                        >
                            <Image source={item.image} style={styles.thumbnailRoom} />
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.numberPlants}>
                                <Text style={styles.number}>9</Text>
                                <MaterialCommunityIcons name="flower-tulip" size={24} color={colors.textAccent} style={styles.flower} />

                            </View>

                        </LinearGradient>
                    </View>

                </TouchableOpacity>


            </ScrollView>
        )
    }

    return (

        <View style={styles.containerRoom}>
            <View style={styles.content}>
                {locations && (
                    <FlatList
                        data={locations}
                        renderItem={RenderLocation}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            < WelcomeMessage />
                        }
                    />
                )}
            </View>
        </View>

    )
}

export default Rooms

const styles = StyleSheet.create({
    containerRoom: {
        flex: 1,
        width: '100%',
        marginTop: "40%",

    },
    content: {},
    listContainer: {
    },
    roomCard: {
        borderColor: colors.FadedWhite,
        borderWidth: 1,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: "row",

    },
    name: {
        textAlignVertical: 'center',
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 5,
        color: colors.FadedWhite,
        marginLeft: 20,

    },
    LinearGradientStyle: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 16,
    },
    thumbnailRoom: {
        height: 65,
        width: 65,
        borderRadius: 100,
        margin: 8,
        opacity: 0.9,
    },
    numberPlants: {
        flexDirection: 'row',
        position: 'absolute',
        right: 16,
        top: 24,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.FadedGreen,
        height: 36,
        marginLeft: 20,
        paddingHorizontal: 8,
        borderRadius: 24,
        shadowColor: "black",
        elevation: 10,
    },
    number: {
        fontSize: 24,
        fontWeight: "200",
        color: colors.textAccent,
        textAlign: "center",
        textAlignVertical: "center",
        marginHorizontal: 16,
    },
    flower: {
        marginHorizontal: 16,
        textAlignVertical: "center",
        justifyContent: 'center',
        alignItems: 'center',
    },

})