import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { colors } from "../config/colors"

const InputText = ({ chLimitNumber, placeHolderText, Lines, text, setText }) => {

    //This is to set a limit on the number of characters
    const characterLimit = chLimitNumber;
    const charactersLeft = characterLimit - text.length;
    const isExceeded = charactersLeft == 0;
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeHolderText}
                multiline={true}
                numberOfLines={Lines}
                placeholderTextColor={"rgba(255,255,255,0.3)"}
                maxLength={chLimitNumber}
                value={text}
                onChangeText={setText}
            />
            <Text
                style={[styles.characterCount, isExceeded && styles.exceeded]}
            >
                {charactersLeft}/{chLimitNumber}
            </Text>

        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    container: {},
    input: {
        marginTop: 10,
        marginHorizontal: 8,
        color: colors.White,
        fontSize: 17,
        letterSpacing: 1,
        fontStyle: "italic",
        paddingBottom: 2,
        borderBottomColor: "rgba(255,255,255,0.3)",
        borderBottomWidth: 1,
    },
    characterCount: {
        textAlign: "right",
        marginHorizontal: 8,
        color: "rgba(255,255,255,0.3)",
    },
    exceeded: {
        color: "red",
    },
})