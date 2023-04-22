import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import { DatabaseConnection } from '../DataBase/Database'
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/colors"
import WelcomeMessage from "../components/WelcomeMessage"



const db = DatabaseConnection.getConnection();


const Home = ({ navigation }) => {

    // Use useIsFocused hook to determine if the screen is focused, to update DATA
    const isFocused = useIsFocused();


    const handleNAv = () => {
        navigation.navigate('Register')
    }

    const handlecardPress = (item) => {
        navigation.navigate('View', { plantId: item.plant_id })
    }

    const [flatlistItems, setFlatListItems] = useState([])

    useEffect(() => {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * from table_plantData',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        temp.push(results.rows.item(i))
                    }
                    setFlatListItems(temp)
                }
            )
        })
    }, [isFocused])


    const listViewItems = (item) => {

        // Color rating for the leaf icon, changing according to user rating from 1 to 5.
        const RateColor = [
            colors.Red,
            colors.Orange,
            colors.Yellow,
            colors.LightGreen,
            colors.Full,
        ];
        const healthColor = RateColor[item.plant_health - 1];

        const currentDate = new Date(); // creates a new Date object with the current date and time

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        const formattedDate = `${year}-${month}-${day}`;

        const getPurchaseTime = (item) => {

            const timestamp1 = new Date(formattedDate).getTime();
            const timestamp2 = new Date(item.plant_purchase).getTime();

            const differenceInMilliseconds = timestamp1 - timestamp2;
            const diff = differenceInMilliseconds / (24 * 60 * 60 * 1000);

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
        const getLastWateredTime = (item) => {

            const timestamp1 = new Date(formattedDate).getTime();
            const timestamp2 = new Date(item.plant_waterDate).getTime();

            const differenceInMilliseconds = timestamp1 - timestamp2;

            const diffwater = differenceInMilliseconds / (24 * 60 * 60 * 1000);
            if (diffwater === 0) {
                return "Today";
            } else if (diffwater === 1) {
                return "Yesterday";
            } else {
                return `${diffwater} Days Ago`;
            }

        }

        const getNextWater = (item) => {

            const timestamp1 = new Date(formattedDate).getTime();
            const timestamp2 = new Date(item.plant_waterDate).getTime();
            const timestamp3 = item.plant_schedule * 86400000

            const differenceInMilliseconds = timestamp2 - timestamp1 + timestamp3;

            const diffwater = differenceInMilliseconds / (24 * 60 * 60 * 1000);

            if (diffwater === 0) {
                return "Today";
            } else if (diffwater === 1) {
                return "Tomorrow";
            } else if (diffwater < 0) {
                return "Overdue";
            } else {
                return `In ${diffwater} Days`;
            }

        }

        return (

            <TouchableOpacity
                onPress={() => handlecardPress(item)}>
                <View style={{
                    borderColor: colors.FadedWhite,
                    borderWidth: 1,
                    borderRadius: 16,
                    marginBottom: 16,
                    flexDirection: "row",
                }}>
                    <LinearGradient
                        colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={styles.LinearGradientStyle}
                    >
                        <Image source={{ uri: item.plant_thumbnail }} style={styles.thumbnailPlant} />
                        <View style={styles.midContent}>
                            <Text style={styles.name}>{item.plant_name}</Text>
                            <Text style={styles.botanical}>{item.plant_botanical}</Text>
                            <View style={styles.watering}>
                                <Text style={styles.lastWatered}>
                                    {getLastWateredTime(item)}
                                </Text>
                                <View style={styles.empty}></View>
                                <Text style={styles.nextWatered}>{getNextWater(item)}

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
                            <Text style={styles.time}>{getPurchaseTime(item)}</Text>
                        </View>
                    </LinearGradient>
                </View>
            </TouchableOpacity>

        )

    }

    return (

        <View style={styles.containerPlant}>
            <View style={styles.content}>
                <FlatList
                    data={flatlistItems}
                    renderItem={({ item }) => listViewItems(item)}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        < WelcomeMessage />
                    }
                />

            </View>
        </View>

    )
}

export default Home

const styles = StyleSheet.create({
    containerPlant: {
        flex: 1,
        width: '100%',
        marginTop: "40%",

    },
    // scroll: {
    //     flex: 1,
    // },

    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'lightgrey',
    },
    plantCard: {
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
        letterSpacing: 1.4,
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
        justifyContent: 'center',
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
