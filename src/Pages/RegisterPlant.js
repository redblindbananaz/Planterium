import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Screen from '../components/Screen'
import { DatabaseConnection } from '../DataBase/Database'
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from "../config/colors"
import { Camera } from 'expo-camera';

import defaultImage from "../Assets/defaultThumbmail.jpg"
import * as ImagePicker from 'expo-image-picker';



import Registercards from '../components/Registercards';
import InputText from '../components/InputText';
import Buttons from '../components/Buttons';
import UnderlineCategory from "../components/UnderlineCategory";
import DateInput from '../components/DateInput';
import Location from '../components/Location';
import HealthRate from '../components/HealthRate';
import Watering from '../components/Watering';


const db = DatabaseConnection.getConnection();
const log = console.log;

const RegisterPlant = ({ navigation, route }) => {

    // START
    const startTime = performance.now();

    log('\n############ Entering the REGISTER PLANT PAGE ##########')
    // const navigation = useNavigation()
    const passedID = route.params?.plant_id || null;
    console.log('----ID NUMBER: ' + passedID + ' passed from previous Page----')

    // When passedID are found from navigation, SET NEW DATA for display:
    useEffect(() => {
        log('useEffect is triggered')
        if (passedID !== null) {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_plantData WHERE plant_id = ?',
                    [passedID],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            const retrieved = results.rows.item(0);
                            log(retrieved)
                            // setUpdatedPlant(retrieved);
                            setPickedImage(retrieved.plant_thumbnail);
                            setPlantName(retrieved.plant_name);
                            setBotName(retrieved.plant_botanical);
                            setSelectedDate(retrieved.plant_purchase);
                            setSelectedHealth(retrieved.plant_health);
                            setSelectedLocation(retrieved.plant_location);
                            setWateringDuration(retrieved.plant_schedule);
                            setWaterDate(retrieved.plant_waterDate);
                            log('setPlant -> Plant: so it changes value for all inputs');
                        }
                    }
                );
            });
        } else {
            log('Details are null, so data is not retrieved from previous screen');
        }
    }, [passedID]);


    const currentDate2 = new Date();
    const day = currentDate2.getDate().toString().padStart(2, '0');
    const month = (currentDate2.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate2.getFullYear().toString();

    const formattedDate2 = `${year}-${month}-${day}`;

    //USESTATE DATA AND CAMERA STUFF:

    const [imagepicked, setPickedImage] = useState(defaultImage.uri)
    const [plantName, setPlantName] = useState("My New Plant");
    const [BotName, setBotName] = useState("Scientific Name Unknown");
    const [selectedDate, setSelectedDate] = useState(formattedDate2);
    const [selectedHealth, setSelectedHealth] = useState('5');
    const [selectedLocation, setSelectedLocation] = useState(parseInt('1'));
    const [wateringDuration, setWateringDuration] = useState(parseInt('4'));
    const [waterDate, setWaterDate] = useState(formattedDate2)



    const takeImageHandler = async () => {
        const image = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 })
        console.log('Camera button was pressed')
        setPickedImage(image.uri);
        console.log(image.uri)


    }
    // Try this new method with Pinal to solve camera Possible unhandled promise rejection (id:0) -> and also downgrade image picker version.
    // const openCamera = async () => { // Ask the user for the permission to access the camera
    //     const permissionResult = await ImagePicker.requestCameraPermissionsAsync(); if (permissionResult.granted === false) { alert("You've refused to allow this appp to access your camera!"); return; } const result = await ImagePicker.launchCameraAsync(); // Explore the result
    //     console.log(result); setPickedImage(result.uri); console.log(result.uri);
    // }


    const takeImageHandler2 = async () => {
        const image2 = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        })
        setPickedImage(image2.assets[0].uri)
        console.log(image2.assets[0].uri)
    }

    // Handling DIfferent Press:

    const handlePress = () => {
        if (passedID) {
            handleUpdate()
        } else {
            register_plant()
        }
    }

    // MAIN FUNCTION TO REGISTER A PLANT

    const register_plant = () => {
        db.transaction(function (tx) {

            // ELSE perform an INSERT Operation
            console.log('Register function called and no plant yet: INSERT call')
            tx.executeSql(
                'INSERT INTO table_plantData(plant_thumbnail, plant_name, plant_botanical, plant_purchase, plant_health, plant_location, plant_schedule, plant_waterDate)VALUES(?,?,?,?,?,?,?,?)',
                [imagepicked, plantName, BotName, selectedDate, selectedHealth, selectedLocation, wateringDuration, waterDate],
                (tx, results) => {
                    console.log('Plant ADDED successfully')
                    navigation.navigate('Main')
                },
                (tx, error) => console.log('Error', error)
            )
        })
    };

    // MAIN FUNCTION TO UPDATE  A PLANT

    const handleUpdate = () => {
        // If plant Exist then UPDATE the Operation
        console.log('CALL for UPDATE function')

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE table_plantData SET plant_thumbnail = ?,plant_name = ?, plant_botanical = ?, plant_purchase = ?, plant_health = ?, plant_location = ?, plant_schedule = ?,plant_waterDate = ?  WHERE plant_id = ?',
                [imagepicked, plantName, BotName, selectedDate, selectedHealth, selectedLocation, wateringDuration, waterDate, passedID],

                (tx, results) => {
                    console.log('Plant UPDATED successfully')
                    navigation.navigate('Main')
                },
            )

        })

    }


    const endTime = performance.now(); // End the timer
    const elapsedTime = endTime - startTime; // Calculate elapsed time in milliseconds
    console.log(`Elapsed time: ${elapsedTime} ms`); // Log the elapsed time
    return (
        <View style={styles.formContainer}>

            <Image
                source={require("../Assets/Background2.png")}
                style={styles.BackgroundImage}

            />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                Vertical={true}
                pagingEnabled={false}
                showsVerticalScrollIndicator={true}
                bounces={false}
            // onScroll={(event) => console.log(event.nativeEvent)}
            >
                <View style={styles.rightCorner}>
                    <View style={styles.image}>
                        <Image source={imagepicked ? { uri: imagepicked } : defaultImage}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 100
                            }} />
                    </View>
                    <View>
                        <Text style={styles.Title}>My Plant</Text>
                        <View style={styles.underline}></View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                <FontAwesome5
                                    name="camera-retro"
                                    size={24}
                                    color="white"
                                    style={styles.icons}
                                    onPress={takeImageHandler}

                                />
                                {/* <Text onPress={openCamera}>Camera</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome
                                    name="image"
                                    size={24}
                                    color="white"
                                    style={styles.icons}
                                    onPress={takeImageHandler2}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Registercards caterory="Name:" underlineSize={80}>
                    <InputText
                        chLimitNumber={20}
                        placeHolderText={'Enter plant name (max 20 characters)'}
                        Lines={1}
                        text={plantName}
                        setText={setPlantName} />


                    <UnderlineCategory subcategory={'Botanical Name:'} linewidth={208} />

                    <InputText chLimitNumber={40}
                        placeHolderText={'Enter Botanical Name, if you know (max 40 characters)'}
                        Lines={2}
                        text={BotName}
                        setText={setBotName} />

                    <View style={styles.dateContainer}>

                        <UnderlineCategory subcategory={"Date:"} linewidth={67} />
                        <DateInput onDateSelect={setSelectedDate} selectedDate={selectedDate} />

                    </View>

                </Registercards>

                <Registercards caterory="Health:" underlineSize={92} >
                    <HealthRate onHealthSelect={setSelectedHealth}
                        selectedHealth={selectedHealth}
                    />
                </Registercards>

                <Registercards caterory="Location:" underlineSize={120}>
                    <Location onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
                </Registercards>

                <Registercards caterory="Care:" underlineSize={70} >
                    <Watering initialValue={wateringDuration} onValueChange={setWateringDuration} />
                    <View style={styles.waterDateContainer}>
                        <Text style={styles.waterText}>Last Water :</Text>

                        <DateInput onDateSelect={setWaterDate} waterDate={waterDate} />
                    </View>

                </Registercards>
                <View style={styles.bottomContainer}>
                    <Buttons
                        actionName={passedID ? 'Update' : 'Register'}
                        cancelPress={() => navigation.navigate('Main'
                        )}
                        actionPress={handlePress}
                    />
                </View>

            </ScrollView >
        </View >
    )
}

export default RegisterPlant

const styles = StyleSheet.create({
    formContainer: {
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
    scrollContainer: {
        flexGrow: 1,
        alignItems: "stretch",
        minHeight: 200,
    },

    rightCorner: {
        height: 150,
        marginTop: "20%",
        flexDirection: 'row',
        // marginLeft: "40%",
        marginRight: 16,
    },
    image: {
        height: 155,
        width: 155,
        borderRadius: 100,
        borderColor: colors.Glass,
        borderWidth: 3,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 16,
    },

    Title: {
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 5,
        color: colors.White,
        marginHorizontal: "15%",

    },

    underline: {
        borderBottomColor: colors.Accent,
        borderBottomWidth: 4,
        width: 140,
        marginHorizontal: "15%",
    },

    iconContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: "15%",
    },

    icons: {
        marginLeft: 40,
        marginTop: 42,
    },

    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },

    bottomContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 40,
        height: 180,
    },

    waterText: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.White,
        letterSpacing: 2,
        textAlignVertical: 'center',
        marginLeft: 8,
    },

    waterDateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})