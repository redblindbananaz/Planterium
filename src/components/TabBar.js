import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../config/colors"

const TabBar = ({ activeTab, onTabChange }) => {
    const renderTab = (tabName) => {
        const isActive = tabName === activeTab;
        const textStyle = isActive ? styles.ActiveTabText : styles.TabText;
        return (
            <TouchableOpacity
                style={styles.Tab}
                key={tabName}
                onPress={() => onTabChange(tabName)}
            >
                <Text style={textStyle}>{tabName}</Text>
                {isActive && <View style={styles.ActiveTabIndicator} />}
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.tabBarContainer}>
            {renderTab("Plants")}
            {renderTab("Rooms")}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    Tab: {
        backgroundColor: "transparent",
    },

    TabText: {
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 5,
        color: colors.FadedWhite,
        marginHorizontal: "15%",
    },
    ActiveTabText: {
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 5,
        color: colors.White,
        marginHorizontal: "15%",
    },
    tabBarContainer: {
        position: "absolute",
        top: 25,
        height: 150,
        // width: 327,
        marginHorizontal: "15%",
        paddingBottom: 20,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "transparent",
    },
    ActiveTabIndicator: {
        borderColor: colors.Accent,
        borderWidth: 3,
        backgroundColor: colors.Accent,
        width: 86, //was windowWidth / 4.2
        marginHorizontal: "15%",
        borderRadius: 8,
    },
    //#endregion
})
