import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { DatabaseConnection } from '../DataBase/Database'
import { useIsFocused } from '@react-navigation/native';

import TabBar from '../components/TabBar';
import Home from './Home';
import Rooms from './Rooms'
import BackgroundImage from '../components/BackgroundImage';
import AddButton from '../components/AddButton';
import RoomListScreen from './RoomListScreen';

const db = DatabaseConnection.getConnection();

const Main = ({ navigation }) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        db.transaction(function (tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS table_plantData (plant_id INTEGER PRIMARY KEY AUTOINCREMENT, plant_thumbnail BLOB, plant_name TEXT, plant_botanical TEXT,plant_purchase TEXT, plant_health INTEGER, plant_location TEXT,plant_schedule INTEGER ,plant_waterDate TEXT)',
                [],
                (tx, results) => {
                    console.log('Table plants created successfully')
                },
            )
        })
    }, [isFocused])

    const [activeTab, setActiveTab] = useState("Plants");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const RenderContent = () => {
        switch (activeTab) {
            case "Plants":
                return <Home navigation={navigation} />;
            case "Rooms":
                return <RoomListScreen navigation={navigation} />;
            default:
                return null;
        }
    };
    return (
        <View style={styles.container}>


            <BackgroundImage />
            {RenderContent()}
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

            <LinearGradient
                colors={[
                    "rgba(43, 46, 46, 0)",
                    "rgba(43, 46, 46, 0.7)",
                    "rgba(33, 36, 36, 1)",
                    "rgba(23, 26, 26, 1)",
                ]}
                style={styles.stickybottom}
            >
                <AddButton style={styles.stickybottom} onPress={() => navigation.navigate('Register')} />

                <View style={styles.fakeFooter} />
            </LinearGradient>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickybottom: {
        position: "absolute",
        backgroundColor: "black",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    fakeFooter: {
        height: 80,
        // Same height as sticky footer
    },
})