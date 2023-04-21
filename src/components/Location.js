import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../config/colors"

const Location = ({ onLocationSelect }) => {
    const locations = [
        { id: 1, name: 'Bedroom', image: require('../Assets/bedroom.png') },
        { id: 2, name: 'Lounge', image: require('../Assets/lounge.png') },
        { id: 3, name: 'Bathroom', image: require('../Assets/bathroom.png') },
        { id: 4, name: 'Kitchen', image: require('../Assets/kitchen.png') },
        { id: 5, name: 'Office', image: require('../Assets/office.png') },
        { id: 6, name: 'Cabinet', image: require('../Assets/cabinet.png') },
        { id: 7, name: 'Other', image: require('../Assets/hallway.png') },
    ];

    const scrollRef = useRef(null);

    const [selectedLocationId, setSelectedLocationId] = useState(null);

    const handleLocationSelect = (locationId) => {
        setSelectedLocationId(locationId);
        onLocationSelect(locationId);
    };

    const scrollToLocation = (locationId) => {
        const location = locations.find(location => location.id === locationId);
        if (location) {
            const locationIndex = locations.indexOf(location);
            scrollRef.current.scrollTo({ x: locationIndex * 120, animated: true });
        }
    };
    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => scrollRef.current.scrollTo({ x: 0, animated: true })}
            >
                <MaterialIcons name="arrow-back-ios" size={24} color={colors.GlassBorder} />
            </TouchableOpacity>


            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {locations.map(location => (
                    <TouchableOpacity
                        key={location.id}
                        onPress={() => handleLocationSelect(location.id)}
                        style={styles.locationContainer}

                    >
                        <View
                            style={[
                                styles.locationImageContainer,
                                selectedLocationId === location.id && styles.selectedLocationImageContainer
                            ]}
                        >
                            <Image
                                source={location.image}
                                style={styles.locationImage}
                                resizeMode="cover"
                            />
                        </View>

                        <Text
                            style={[
                                styles.locationName,
                                selectedLocationId === location.id && styles.selectedLocationName
                            ]}
                        >
                            {location.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => scrollRef.current.scrollToEnd({ animated: true })}
            >
                <MaterialIcons name="arrow-forward-ios" size={24} color={colors.GlassBorder} />
            </TouchableOpacity>


        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },

    arrowContainer: {
        width: 30,
        height: '100%',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',

    },

    locationContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 24,
        // borderColor: 'red',
        // borderWidth: 2,
    },

    locationImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent'
    },
    selectedLocationImageContainer: {
        borderColor: colors.Accent
    },

    locationImage: {
        flex: 1,
        width: null,
        height: null
    },

    locationName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '300',
        letterSpacing: 2,
        color: colors.White,
    },

    selectedLocationName: {
        color: colors.Accent
    },
})