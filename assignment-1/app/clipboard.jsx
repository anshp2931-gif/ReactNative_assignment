import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import * as Location from "expo-location";

export default function ClipboardScreen() {
  const [notes, setNotes] = useState("");

  // Copy Survey ID
  const copySurveyId = async () => {
    await Clipboard.setStringAsync("SURVEY-1001");
    Alert.alert("Success", "Survey ID copied successfully.");
  };

  // Copy Contact Number
  const copyContactNumber = async () => {
    await Clipboard.setStringAsync("+91 9876543210");
    Alert.alert("Success", "Contact number copied successfully.");
  };

  // Copy Current Location
  const copyCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});

      const locationText = `Latitude: ${location.coords.latitude}
Longitude: ${location.coords.longitude}`;

      await Clipboard.setStringAsync(locationText);

      Alert.alert("Success", "Current location copied.");
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location.");
    }
  };

  // Paste Notes
  const pasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    setNotes(text);
  };

  // Clear Clipboard
  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");
    setNotes("");
    Alert.alert("Success", "Clipboard cleared.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Clipboard Module</Text>

      <TouchableOpacity style={styles.button} onPress={copySurveyId}>
        <Text style={styles.buttonText}>Copy Survey ID</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={copyContactNumber}>
        <Text style={styles.buttonText}>Copy Contact Number</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={copyCurrentLocation}>
        <Text style={styles.buttonText}>Copy Current Location</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste notes here..."
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={pasteNotes}
      >
        <Text style={styles.buttonText}>Paste Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#926059" }]}
        onPress={clearClipboard}
      >
        <Text style={styles.buttonText}>Clear Clipboard Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#1976D2",
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    borderRadius: 8,
    minHeight: 120,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});