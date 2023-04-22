import { StyleSheet, Text, View, Image, Button, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import { DatabaseConnection } from '../DataBase/Database';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/colors"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";

import Registercards from '../components/Registercards';
import ActionConfirmPopup from '../components/ActionConfirmPopup';
import UnderlineCategory from '../components/UnderlineCategory'

const db = DatabaseConnection.getConnection();


const ViewPlant = ({ navigation, route }) => {
    // const navigation = useNavigation();

    const { plantId } = route.params;

    const [plantInfo, setPlantInfo] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')


    const handleCancel = () => {
        navigation.navigate('Main')
    }
    const handleEdit = () => {

        navigation.navigate('Register', (plantInfo))

    }
    const handleDelete = () => {
        setModalVisible(false)
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM table_plantData WHERE plant_id = ?',
                [plantId],
                (tx, results) => {
                    console.log('Plant deleted successfully');
                    navigation.navigate('Main')
                    // You can trigger a refresh of the data here, if needed
                },
                (tx, error) => {
                    console.log('Error deleting plant', error);
                }
            );
        });

    }


    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}-${month}-${year}`;
    console.log('Today\'s date is ' + formattedDate);




    const handleWaterconfirmation = () => {
        setModalVisible(false)
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE table_plantData SET plant_waterDate = ? WHERE plant_id = ?',
                [formattedDate, plantId],
                (tx, results) => {
                    console.log('Plant watering successfully');
                    navigation.navigate('Main')
                    // You can trigger a refresh of the data here, if needed
                },
                (tx, error) => {
                    console.log('Error watering plant', error);
                }
            );
        });


    }
    const handleActionPress = () => {
        if (title === 'Watering Now?') {
            handleWaterconfirmation();
        } else if (title === 'Deleting Plant?') {
            handleDelete();
        }
    };
    const handleWatering = () => {
        setModalVisible(true)
        setTitle('Watering Now?')
        setMessage('Watering schedule will be update automaticaly if necessary')

    };

    const handleDeleting = () => {
        setModalVisible(true)
        setTitle('Deleting Plant?')
        setMessage('This action will Delete this plant form the database.')

    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_plantData WHERE plant_id = ?',
                [plantId],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        setPlantInfo(results.rows.item(0));
                    }
                }
            );
        });
    }, [plantId]);


    const HealthItems = [
        { id: 1, name: 'Dead', color: colors.Red },
        { id: 2, name: 'Poor', color: colors.Orange },
        { id: 3, name: 'Fair', color: colors.Yellow },
        { id: 4, name: 'Good', color: colors.LightGreen },
        { id: 5, name: 'Great', color: colors.Full },
    ];

    const RateColor = [
        colors.Red,
        colors.Orange,
        colors.Yellow,
        colors.LightGreen,
        colors.Full,
    ];

    const RateNames = [
        'Dead', 'Poor', 'Fair', 'Good', 'Great'
    ]

    const Locations = [
        'Bedroom', 'Lounge', 'Bathroom', 'Kitchen', 'Office', 'Cabinet', 'Other'
    ]

    return (

        <React.Fragment>
            {plantInfo ? (
                <View style={styles.containerBox}>
                    <Modal visible={modalVisible} transparent >
                        <ActionConfirmPopup
                            title={title}
                            message={message}
                            message2='Would you like to Continue?'
                            cancelPress={handleCancel}
                            actionPress={handleActionPress}
                            actionName='CONFIRM' />

                    </Modal>
                    <Image
                        source={require("../Assets/Background2.png")}
                        style={styles.BackgroundImage}

                    />
                    <ScrollView
                        contentContainerStyle={styles.box}
                        Vertical={true}
                        pagingEnabled={false}
                        showsVerticalScrollIndicator={true}
                        bounces={false}
                    >
                        <Image source={{ uri: plantInfo.plant_thumbnail }} style={styles.imagecontainer} />

                        <Registercards underlineSize={0}>
                            {/* <Text>Plant ID: {plantInfo.plant_id}</Text> */}
                            <Text style={styles.name}>{plantInfo.plant_name}</Text>
                            <UnderlineCategory linewidth={'100%'} />
                            <Text style={styles.botanical}>{plantInfo.plant_botanical}</Text>
                            <View style={styles.contentsub}>
                                <Text style={styles.sub}>Owned Since: </Text>
                                <View style={styles.subcontainer}>
                                    <FontAwesome name="calendar" size={24} color={colors.FadedWhite} style={styles.icon} />
                                    <Text style={styles.content}>{plantInfo.plant_purchase}</Text>
                                </View>
                            </View>
                            <View style={styles.contentsub}>
                                <Text style={styles.sub}>Health: </Text>
                                <View style={styles.subcontainer}>
                                    <MaterialCommunityIcons
                                        name="leaf-circle-outline"
                                        size={24}
                                        color={RateColor[plantInfo.plant_health - 1]}
                                        style={styles.icon}
                                    />
                                    <Text
                                        style={{
                                            color: RateColor[plantInfo.plant_health - 1], fontSize: 14, letterSpacing: 4,
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            paddingHorizontal: 4,
                                            textAlignVertical: 'center'
                                        }}
                                    >{RateNames[plantInfo.plant_health - 1]}</Text>
                                </View>

                            </View>
                            <View style={styles.contentsub}>
                                <Text style={styles.sub}>Location: </Text>
                                <View style={styles.subcontainer}><Text style={styles.content}> {Locations[plantInfo.plant_location - 1]}</Text></View>

                            </View>
                            <View style={styles.contentsub}>
                                <Text style={styles.sub}>Water every: </Text>
                                <View style={styles.subcontainer}>
                                    <Text style={styles.content}>{plantInfo.plant_schedule}</Text>
                                    <Text style={styles.content}> Days</Text>
                                </View>

                            </View>
                            <View style={styles.contentsub}>
                                <Text style={styles.sub}>Last Watered: </Text>
                                <View style={styles.subcontainer}>
                                    <FontAwesome name="calendar" size={24} color={colors.FadedWhite} style={styles.icon} />
                                    <Text style={styles.content}>{plantInfo.plant_waterDate}</Text>
                                </View>

                            </View>



                        </Registercards>
                        <View style={{
                            height: 80,
                            borderColor: colors.FadedWhite,
                            borderWidth: 1,
                            borderRadius: 16,
                            marginBottom: 42,
                            marginHorizontal: 8,
                        }}>
                            <LinearGradient
                                colors={["rgba(46,46,46,0.7)", "rgba(255,255,255,0.2)"]}
                                start={[0, 0]}
                                end={[0, 1]}
                                style={styles.Linear}
                            >
                                <View style={styles.pad}>
                                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                                        <View style={styles.circle}>
                                            <AntDesign name="arrowleft" size={24} color={colors.FadedWhite} />

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={handleWatering}>
                                        <View style={styles.circle}>
                                            <MaterialCommunityIcons name="water-outline" size={24} color={colors.FadedWhite} />

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={handleEdit}>
                                        <View style={styles.circle}>
                                            <AntDesign name="edit" size={24} color={colors.FadedWhite} />

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={handleDeleting}>
                                        <View style={styles.circle}>
                                            <AntDesign name="delete" size={24} color={colors.FadedWhite} />

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </View>
                    </ScrollView >
                </View>

            ) : (
                <Text>Loading plant information...</Text>
            )
            }

        </React.Fragment>
    )
}

export default ViewPlant

const styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        justifyContent: 'center',
    },
    BackgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: "cover",
    },
    box: {
        flexGrow: 1,
        alignItems: "stretch",
        minHeight: 200,
    },
    imagecontainer: {
        alignSelf: 'center',
        marginTop: '10%',
        width: 155,
        height: 155,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: colors.FadedWhite,
    },
    Linear: {
        height: 80,
        borderRadius: 16,
    },

    name: {
        fontSize: 24,
        letterSpacing: 4,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.White,
    },
    botanical: {
        color: colors.textAccent,
        fontSize: 14,
        marginVertical: 16,
        fontStyle: "italic",
        textAlign: "center",
        letterSpacing: 1.4,
    },
    contentsub: {
        flexDirection: 'row',
        borderColor: colors.Glass,
        borderWidth: 1,
        borderRadius: 16,
        padding: 8,
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    sub: {
        fontSize: 16,
        letterSpacing: 4,
        fontWeight: '300',
        textAlign: 'center',
        color: colors.White,
        textAlignVertical: 'center',
    },
    sub2: {
        fontSize: 16,
        letterSpacing: 4,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.White,

    },
    subcontainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 16,
        borderColor: colors.Glass,
        borderWidth: 1,
        backgroundColor: colors.FadedGreen,
    },
    icon: {
        marginRight: 16,
    },
    content: {
        fontSize: 14,
        letterSpacing: 4,
        fontWeight: '400',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.White,
    },

    //Bottom part:
    pad: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    circle: {
        borderColor: colors.FadedWhite,
        borderWidth: 1.5,
        borderRadius: 100,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },

})