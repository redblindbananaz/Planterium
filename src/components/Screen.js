import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, Image, Dimensions } from "react-native";

function Screen({ children, style }) {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateDimensions = ({ window }) => {
            setScreenWidth(window.width);
            setScreenHeight(window.height);
            // Update your UI components based on the new dimensions
            // e.g., update layout, positioning, sizing, etc.
        };

        Dimensions.addEventListener('change', updateDimensions);

        return () => {
            Dimensions.removeEventListener('change', updateDimensions);
        };
    }, []);


    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={style}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        // paddingTop: Constants.statusBarHeight,
        // padding: 8,
    },
});

export default Screen;