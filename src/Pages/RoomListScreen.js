import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DatabaseConnection } from '../DataBase/Database';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';


import WelcomeMessage from '../components/WelcomeMessage'
import PlantCardPreview from '../components/PlantCardPreview';



const db = DatabaseConnection.getConnection();

const PlantList = ({ plant }) => {
    console.log(plant)
    return (
        <View style={styles.visibleconatiner}>
            <Text>{plant.plant_name}</Text>
        </View>
    )
}

const RoomCard = ({ location, plantCount, plantsByLocation, isVisible, toggleExpand }) => {

    return (
        <ScrollView >
            <TouchableOpacity onPress={toggleExpand}>
                <View style={{
                    borderColor: colors.FadedWhite,
                    borderWidth: 1,
                    borderRadius: 16,
                    marginBottom: 16,
                    flexDirection: "row",
                    height: isVisible ? 500 : 80

                }}>
                    <LinearGradient
                        colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={styles.LinearGradientStyle}
                    >
                        <Image style={styles.thumbnailRoom} />
                        <Text style={styles.name}>location:{location}</Text>
                        <View style={styles.numberPlants}>
                            <Text style={styles.number}>{plantCount}</Text>
                            <MaterialCommunityIcons name="flower-tulip" size={24} color={colors.textAccent} style={styles.flower} />
                        </View>
                        {isVisible && (
                            <View>
                                {plantsByLocation[location].map((plant, index) => (
                                    <PlantList key={index} plant={plant} />
                                ))}
                            </View>
                        )}
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const RoomListScreen = () => {
    const [plantsByLocation, setPlantsByLocation] = useState({});

    const isFocused = useIsFocused();
    const [isCardExpanded, setIsCardExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);

    // const toggleExpand = (index) => {
    //     setIsVisible(!isVisible)
    //     setIsCardExpanded(!isCardExpanded)
    //     setExpandedIndex(index);
    // }

    const toggleExpand = (index) => {
        if (isCardExpanded && expandedIndex === index) {
            setIsVisible(false);
            setIsCardExpanded(false);
            setExpandedIndex(-1);
        } else {
            setIsVisible(true);
            setIsCardExpanded(true);
            setExpandedIndex(index);
        }
    }


    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT table_plantData.*
            FROM (
              SELECT plant_location
              FROM table_plantData
              GROUP BY plant_location
            ) AS locations
            JOIN table_plantData ON locations.plant_location = table_plantData.plant_location`,
                [],
                (_, { rows }) => {
                    const plantsByLocation = {};

                    // Iterate over the rows and group them by location
                    rows._array.forEach((plant) => {
                        const { plant_location } = plant;
                        if (!plantsByLocation[plant_location]) {
                            plantsByLocation[plant_location] = [];
                        }
                        plantsByLocation[plant_location].push(plant);
                    });

                    // Set the state with the plants grouped by location
                    setPlantsByLocation(plantsByLocation);
                }
            );
        });
    }, [isFocused]);


    return (


        <FlatList
            style={styles.containerRoom}
            data={Object.keys(plantsByLocation)}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
                <View>
                    <RoomCard
                        location={item}
                        plantCount={plantsByLocation[item].length}
                        isVisible={expandedIndex === index}
                        toggleExpand={() => toggleExpand(index)}
                        plantsByLocation={plantsByLocation}
                        isCardExpanded={isCardExpanded} />

                </View>

            )
            }
        />

    )
}

export default RoomListScreen

const styles = StyleSheet.create({

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
        position: 'absolute',
        left: '20%',
        top: 24,
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
    visibleconatiner: {
        borderColor: 'red',
        borderWidth: 2,
        marginTop: 80,
        margin: 8,
        flex: 1,
        padding: 8,

    }
})