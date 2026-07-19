import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";

export default function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        setLoading(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission Denied", "Location permission is required.");
            setLoading(false);
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);
        setLoading(false);
    };

    const copyLocation = async () => {
        if (!location) return;

        const text = `Latitude: ${location.coords.latitude}
Longitude: ${location.coords.longitude}`;

        await Clipboard.setStringAsync(text);

        Alert.alert("Success", "Location copied to clipboard.");
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Getting Current Location...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Current Location</Text>

            <View style={styles.card}>
                <Text style={styles.label}>
                    Latitude : {location.coords.latitude}
                </Text>

                <Text style={styles.label}>
                    Longitude : {location.coords.longitude}
                </Text>

                <Text style={styles.label}>
                    Accuracy : {location.coords.accuracy} meters
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={getLocation}
            >
                <Text style={styles.buttonText}>Refresh Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={copyLocation}
            >
                <Text style={styles.buttonText}>Copy Location</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 20,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    heading: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1976D2",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },

    label: {
        fontSize: 17,
        marginBottom: 15,
        color: "#333",
    },

    button: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});