import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from "../config/colors"

const UnderlineCategory = ({ subcategory, linewidth }) => {
    return (
        <View>
            <Text style={styles.subcategories}>{subcategory}</Text>
            <View
                style={{
                    borderBottomColor: "white",
                    borderBottomWidth: 2,
                    paddingTop: 2,
                    width: linewidth,
                    alignItems: "flex-start",
                }}
            />
        </View>
    )
}

export default UnderlineCategory

const styles = StyleSheet.create({
    subcategories: {
        fontSize: 20,
        letterSpacing: 4,
        color: colors.White,
    }
})