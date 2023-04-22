import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DatabaseConnection } from '../DataBase/Database';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';


import WelcomeMessage from '../components/WelcomeMessage'


const db = DatabaseConnection.getConnection();

const RoomCard = ({ room, plantCount }) => {

    const roomNameToId = {
        1: 'Bedroom',
        2: 'Lounge',
        3: 'Bathroom',
        4: 'Kitchen',
        5: 'Office',
        6: 'Cabinet',
        7: 'Other'
    };
    const roomId = parseInt(room, 10);
    const roomName = roomNameToId[roomId];

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.roomCard}>
                    <LinearGradient
                        colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={styles.LinearGradientStyle}
                    >
                        <Image style={styles.thumbnailRoom} />
                        <Text style={styles.name}>{roomName}</Text>
                        <View style={styles.numberPlants}>
                            <Text style={styles.number}>{plantCount}</Text>
                            <MaterialCommunityIcons name="flower-tulip" size={24} color={colors.textAccent} style={styles.flower} />
                        </View>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const RoomListScreen = () => {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        // Retrieve the list of rooms with the number of plants in each room
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT plant_location, COUNT(*) as plant_count
            FROM table_plantData
         WHERE plant_waterDate IS NOT NULL
         GROUP BY plant_location`,
                [],
                (_, { rows }) => {
                    setRoomList(rows._array);
                }
            );
        });
    }, []);
    return (
        <View style={styles.containerRoom}>
            <FlatList
                data={roomList}
                renderItem={({ item }) => (
                    <RoomCard room={item.plant_location} plantCount={item.plant_count} />
                )}
                keyExtractor={(item) => item.plant_location}
                removeClippedSubviews={true}
                ListEmptyComponent={
                    < WelcomeMessage />
                }
            />
        </View>
    )
}

export default RoomListScreen

const styles = StyleSheet.create({
    roomCard: {
        borderColor: colors.FadedWhite,
        borderWidth: 1,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: "row",
    },
    LinearGradientStyle: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 16,
    },
    containerRoom: {
        flex: 1,
        width: '100%',
        marginTop: "40%",
    },
    thumbnailRoom: {
        height: 65,
        width: 65,
        borderRadius: 100,
        margin: 8,
        opacity: 0.9,
    },
    name: {
        textAlignVertical: 'center',
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 5,
        color: colors.FadedWhite,
        marginLeft: 20,
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