import { StyleSheet, TextInput, View, TouchableOpacity, Modal, StatusBar } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../config/colors"
import CustomCalendar from './CustomCalendar';

const DateInput = ({ onDateSelect }) => {

    const [aquisitionDate, setAquisitionDate] = useState("");
    // This is for the date selection and Clendar:
    const handleDateChange = (text) => {
        let formattedText = text;
        if (text.length === 2 || text.length === 5) {
            formattedText += "-";
        }

        setAquisitionDate(formattedText);
        onDateSelect(formattedText)
    };

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisible(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisible(false);

    }
    const handleSelect = (aquisitionDate) => {
        const formattedDate = moment(aquisitionDate).format("YYYY-MM-DD")
        setAquisitionDate(formattedDate)
        hideDatePicker();
        onDateSelect(formattedDate)

        // console.log(moment(date).format("DD-MM-YY"))
    }
    return (
        <React.Fragment>
            <Modal visible={isDatePickerVisible} transparent >
                <View style={styles.modalContainer} >
                    <StatusBar
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        barStyle="light-content"
                    />
                    <CustomCalendar onDateChange={handleDateChange}
                        onSelect={handleSelect}
                        onCancel={hideDatePicker}
                    />

                </View>
            </Modal>

            <View style={styles.dateSelectArea}>
                <TouchableOpacity >
                    <FontAwesome name="calendar" size={24} color="#EBB11C" style={styles.calendar} onPress={showDatePicker} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input3}
                    placeholder="YYYY-MM-DD "
                    placeholderTextColor={"rgba(255,255,255,0.3)"}
                    value={aquisitionDate}
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={handleDateChange}
                />
            </View>
        </React.Fragment>
    )
}

export default DateInput

const styles = StyleSheet.create({
    dateSelectArea: {
        flexDirection: "row",
        height: 40,
        width: "60%",
        backgroundColor: colors.Date,
        borderColor: colors.FadedWhite,
        borderWidth: 1,
        borderRadius: 16,
        marginRight: 8,
    },
    calendar: {
        alignSelf: "center",
        padding: 6,
        marginHorizontal: 20,
    },

    // Weird stuff here need border in order to not hide part of the placeholder... To investigate!
    input3: {
        // paddingHorizontal: 24,
        color: colors.White,
        fontSize: 14,
        letterSpacing: 1,
        fontStyle: "italic",
        borderColor: colors.Date,
        borderWidth: 2,
        alignSelf: "center",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',

    },
})