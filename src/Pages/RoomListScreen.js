import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DatabaseConnection } from '../DataBase/Database';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';



import WelcomeMessage from '../components/WelcomeMessage'
import PlantCardPreview from '../components/PlantCardPreview';
import Buttons from '../components/Buttons';
import ActionConfirmPopup from '../components/ActionConfirmPopup';



const db = DatabaseConnection.getConnection();

const PlantList = ({ plant }) => {
    const RateColor = [
        colors.Red,
        colors.Orange,
        colors.Yellow,
        colors.LightGreen,
        colors.Full,
    ];
    return (
        <View style={styles.visibleconatiner}>
            <MaterialCommunityIcons
                name="leaf-circle-outline"
                size={24}
                color={RateColor[plant.plant_health - 1]}
                style={styles.icon}
            />
            <Text style={styles.namePlant}>{plant.plant_name}</Text>

        </View>
    )
}

const RoomCard = ({ location, plantCount, plantsByLocation, isVisible, toggleExpand }) => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')

    const locations = {
        1: 'Bedroom',
        2: 'Lounge',
        3: 'Bathroom',
        4: 'Kitchen',
        5: 'Office',
        6: 'Cabinet',
        7: 'Other',
    };

    const thumbnails = {
        1: require('../Assets/bedroom.png'),
        2: require('../Assets/lounge.png'),
        3: require('../Assets/bathroom.png'),
        4: require('../Assets/kitchen.png'),
        5: require('../Assets/office.png'),
        6: require('../Assets/cabinet.png'),
        7: require('../Assets/hallway.png'),
    }
    const locationName = locations.hasOwnProperty(parseInt(location)) ? locations[parseInt(location)] : 'Unknown';

    const thumbs = thumbnails.hasOwnProperty(parseInt(location)) ? thumbnails[parseInt(location)] : 'Unknown';

    const currentDate2 = new Date();
    currentDate2.setHours(0, 0, 0, 0); // set time components to zero
    const day = currentDate2.getDate().toString().padStart(2, '0');
    const month = (currentDate2.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate2.getFullYear().toString();

    const formattedDate2 = `${year}-${month}-${day}`;


    const handleWaterDateUpdate = () => {
        // Get the room id of the selected room
        const selectedRoomId = parseInt(location);
        setModalVisible(false)
        toggleExpand()
        // Update the water date of each plant
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE table_plantData SET plant_waterDate = ? WHERE plant_location = ?',
                [formattedDate2, selectedRoomId],
                (tx, results) => {

                    console.log('All Plant watering successfully');

                    // You can trigger a refresh of the data here, if needed
                },
                (tx, error) => {
                    console.log('Error watering all plants', error);
                }
            );
        });

    };

    const handleActionPress = () => {
        setModalVisible(true)
        setTitle('Watering All?')
        setMessage('Watering schedule will be update automaticaly if necessary for all plants in this Location')

    }
    const handleCancel = () => {
        navigation.navigate('Main')
    }

    return (
        <ScrollView >
            <Modal visible={modalVisible} transparent >
                <ActionConfirmPopup
                    title={title}
                    message={message}
                    message2='Would you like to Continue?'
                    cancelPress={handleCancel}
                    actionPress={handleWaterDateUpdate}
                    actionName='CONFIRM' />

            </Modal>
            <TouchableOpacity onPress={toggleExpand}>
                <View style={{
                    borderColor: colors.FadedWhite,
                    borderWidth: 1,
                    borderRadius: 16,
                    marginBottom: 16,
                    height: isVisible ? 500 : 80

                }}>
                    <LinearGradient
                        colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={styles.LinearGradientStyle}
                    >
                        <Image source={thumbs} style={styles.thumbnailRoom} />
                        <Text style={styles.name}>{locationName}</Text>
                        <View style={styles.numberPlants}>
                            <Text style={styles.number}>{plantCount}</Text>
                            <MaterialCommunityIcons name="flower-tulip" size={24} color={colors.textAccent} style={styles.flower} />
                        </View>
                        {isVisible && (
                            <View style={styles.PlantInLocationContainer}>
                                {plantsByLocation[location].map((plant, index) => (
                                    <PlantList key={index} plant={plant} />
                                ))}
                                <Buttons
                                    cancelPress={() => toggleExpand()}
                                    actionName={'Water All'}
                                    actionPress={() => handleActionPress()}

                                />
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
            ListEmptyComponent={
                < WelcomeMessage />
            }
        />

    )
}

export default RoomListScreen

const styles = StyleSheet.create({

    LinearGradientStyle: {
        flex: 1,
        // flexDirection: "row",
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
        borderColor: colors.FadedWhite,
        borderWidth: 1,
        borderRadius: 16,
        margin: 8,
        padding: 8,
        flexDirection: 'row',
    },
    PlantInLocationContainer: {
        justifyContent: 'center',
        width: '100%',
        padding: 8,

    },
    namePlant: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 4,
        color: colors.White,

    },
    icon: {
        marginRight: 8,


    }
})