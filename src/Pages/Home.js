import { Button, StyleSheet, Text, TextInput, View, FlatList, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import { DatabaseConnection } from '../DataBase/Database'
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/colors"
import { useNavigation } from '@react-navigation/native'
import PlantCardPreview from '../components/PlantCardPreview'
import WelcomeMessage from "../components/WelcomeMessage"
import { SwipeListView } from 'react-native-swipe-list-view';


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
                'SELECT * from table_plantest1',
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

        const getPurchaseTime = (item) => {
            const currentDate = new Date(); // creates a new Date object with the current date and time

            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();

            const formattedDate = `${year}-${month}-${day}`;
            console.log('current date: ' + formattedDate)
            console.log('purchase date: ' + item.plant_purchase)

            const timestamp1 = new Date(formattedDate).getTime();
            const timestamp2 = new Date(item.plant_purchase).getTime();

            const differenceInMilliseconds = timestamp1 - timestamp2;


            const diff = differenceInMilliseconds / (24 * 60 * 60 * 1000);
            console.log(diff)

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



        // const moment = require('moment');

        // const currentDateToday = moment().format('DD-MM-YYYY');
        // console.log(currentDateToday);
        // const purchase = item.plant_purchase
        // const purchaseDate = moment(purchase).format('DD-MM-YYYY');
        // console.log(purchaseDate)
        // const differenceInDays = currentDateToday.diff(timestamp2, 'Days')
        // console.log(differenceInDays)


        // Calculate time difference between purchase date and current date
        const timeDiffPurchase = (item) => {
            const purchaseDate = item.plant_purchase
            const diff = Math.floor((formattedDate - purchaseDate));



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
        // Function to calculate time difference between two dates
        function getTimeDifference(item) {

        }
        // Calculate the next watering date based on water schedule
        const nextWatering = getNextWatering(item.plant_waterDate);

        // Function to calculate time difference between two dates
        function getTimeDifference(wateredDate) {
            const today = new Date();
            const [dd, mm, yy] = wateredDate.split('-');
            const wateredDateTime = new Date(parseInt("20" + yy), parseInt(mm) - 1, parseInt(dd));
            console.log(today)
            console.log(wateredDateTime)

            const diff = Math.floor((today - wateredDateTime) / (1000 * 60 * 60 * 24));

            if (diff === 0) {
                return "Today";
            } else if (diff === 1) {
                return "Yesterday";
            } else {
                return `${diff} Days Ago`;
            }
        }

        // Function to calculate the next watering date based on water schedule
        function getNextWatering(waterSchedule, lastWateredDate) {
            if (!lastWateredDate) {
                return "Now";
            }

            const [dd, mm, yy] = lastWateredDate.split('-');
            const lastWateredTime = new Date(parseInt("20" + yy), parseInt(mm) - 1, parseInt(dd));
            const nextWateringTime = new Date(lastWateredTime.getTime() + waterSchedule * 24 * 60 * 60 * 1000);

            const today = new Date();
            const diff = Math.floor((nextWateringTime - today) / (1000 * 60 * 60 * 24));
            console.log(lastWateredDate)

            if (diff === 0) {
                return "Today";
            } else if (diff === 1) {
                return "Tomorrow";
            } else if (diff < 0) {
                return "Overdue";
            } else {
                return `In ${diff} Days`;
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
                                    Watering:
                                </Text>
                                <View style={styles.empty}></View>
                                <Text style={styles.nextWatered}>

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
