import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../config/colors";

const CustomCalendar = ({ onDateSelect, onSelect, onCancel }) => {

    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    // console.log(selectedDate)

    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    // const daysInMonth = moment(selectedDate).daysInMonth();
    const startDate = moment(selectedDate).startOf('month').startOf('week');
    const endDate = moment(selectedDate).endOf('month').endOf('week');

    const handlePreviousMonth = () => {
        setSelectedDate(moment(selectedDate).subtract(1, 'month').format('YYYY-MM-DD'));
    };

    const handleNextMonth = () => {
        setSelectedDate(moment(selectedDate).add(1, 'month').format('YYYY-MM-DD'));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={handlePreviousMonth}>
                    <AntDesign name="arrowleft" size={24} color={colors.Accent} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {moment(selectedDate).format('MMMM YYYY')}
                </Text>
                <TouchableOpacity style={styles.headerButton} onPress={handleNextMonth}>
                    <AntDesign name="arrowright" size={24} color={colors.Accent} />
                </TouchableOpacity>
            </View>
            <View style={styles.daysOfWeekContainer}>
                {daysOfWeek.map((day, index) => (
                    <View style={styles.calendarCellContainer} key={index}>
                        <Text style={[
                            styles.calendarDaysText,

                        ]}>{day}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.datesContainer}>
                {Array.from({ length: endDate.diff(startDate, 'days') + 1 }).map((_, index) => {
                    const date = startDate.clone().add(index, 'days');
                    const formattedDate = date.format('YYYY-MM-DD');
                    const isSelected = formattedDate === selectedDate;
                    const isPreviousMonth = !date.isSame(moment(selectedDate), 'month') && date.isBefore(moment(selectedDate), 'month');
                    const isNextMonth = !date.isSame(moment(selectedDate), 'month') && date.isAfter(moment(selectedDate), 'month');

                    return (
                        <TouchableOpacity
                            style={[
                                styles.calendarCellContainer,
                                isSelected && styles.selectedDateCell,
                            ]}
                            onPress={() => setSelectedDate(formattedDate)}
                            key={formattedDate}
                        >
                            <Text style={[styles.calendarCellText, isPreviousMonth && styles.commonDateCell,
                            isNextMonth && styles.commonDateCell, isSelected && styles.calendarCellTextSelected]}>{moment(date).format('DD')}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={() => onSelect(selectedDate)}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomCalendar

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1C1B1F',
        width: "80%",
        height: "70%",
        borderColor: colors.Accent,
        borderWidth: 1,
        borderRadius: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerButton: {
        paddingHorizontal: 8,
    },

    headerText: {
        fontSize: 24,
        color: "#616743",
        fontWeight: "400",
        letterSpacing: 3,
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        backgroundColor: "#212A23",
        borderColor: colors.Accent,
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    calendarCellContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 3,


    },
    calendarDaysText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#616743",
    },
    calendarCellText: {
        fontSize: 18,
        fontWeight: "400",
        color: colors.FadedWhite,

    },
    calendarCellTextSelected: {
        color: "rgba(28, 27, 31, 1)",
        fontWeight: "600",
    },

    selectedDateCell: {
        backgroundColor: colors.Accent,
        borderRadius: 100,
        borderColor: colors.GlassBorder,
        borderWidth: 1,

    },

    commonDateCell: {
        fontSize: 18,
        fontWeight: "400",
        color: "#212A23",

    },

    datesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: colors.FadedWhite,
        borderWidth: 1,
        borderRadius: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,

    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 16,
    },
    cancelButtonText: {
        fontSize: 24,
        color: colors.Accent,
        fontStyle: "italic",
        fontWeight: "300",
        letterSpacing: 4,
        lineHeight: 24,
        textDecorationLine: "underline",
        textDecorationColor: colors.Accent
    },
    selectButton: {
        justifyContent: "center",
        paddingHorizontal: 28,
        borderColor: "rgba(217, 217, 217, 0.5)",
        borderWidth: 1,
        borderRadius: 32,
        backgroundColor: "rgba(28,47,37,0.7)",

    },
    selectButtonText: {
        textAlign: "center",
        fontSize: 24,
        letterSpacing: 4,
        lineHeight: 26,
        color: 'white',
    },
})