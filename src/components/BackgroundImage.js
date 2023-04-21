import React from "react";
import { Image, StyleSheet } from "react-native";


const BackgroundImage = () => {
    return (
        <Image
            source={require("../Assets/BackgroundMain.png")}
            style={styles.BackgroundImage}
        />
    );
};
export default BackgroundImage;

const styles = StyleSheet.create({
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

})