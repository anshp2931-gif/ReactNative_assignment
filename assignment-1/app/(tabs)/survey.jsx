import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Modal,
  FlatList,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";

export default function Survey() {
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [contactsList, setContactsList] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSearch, setContactSearch] = useState("");

  const onChangeDate = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      const formattedDate =
        selected.getDate().toString().padStart(2, "0") +
        "/" +
        (selected.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        selected.getFullYear();
      setDate(formattedDate);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to retrieve location.");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(`${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Allow camera access to take a photo.");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Allow contacts access to select a contact.");
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      setContactsList(data);
      setShowContactModal(true);
    } else {
      Alert.alert("No Contacts", "No contacts found on this device.");
    }
  };

  const selectContact = (contactInfo) => {
    const number = contactInfo.phoneNumbers && contactInfo.phoneNumbers.length > 0 
      ? contactInfo.phoneNumbers[0].number 
      : "No Number";
    setContact(`${contactInfo.name} (${number})`);
    setShowContactModal(false);
    setContactSearch("");
  };

  const filteredContacts = contactsList.filter(item => 
    item.name?.toLowerCase().includes(contactSearch.toLowerCase()) || 
    (item.phoneNumbers && item.phoneNumbers.length > 0 && item.phoneNumbers[0].number.includes(contactSearch))
  );

  const submitSurvey = () => {
    if (
      siteName === "" ||
      clientName === "" ||
      description === "" ||
      priority === "" ||
      date === ""
    ) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    router.push({
      pathname: "/surveyPreview",
      params: { siteName, clientName, description, priority, date, contact, location, notes, photo }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Survey</Text>

      <Text style={styles.label}>Site Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Site Name"
        value={siteName}
        onChangeText={setSiteName}
      />

      <Text style={styles.label}>Client Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Client Name"
        value={clientName}
        onChangeText={setClientName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, priority === "Low" && styles.selected]}
          onPress={() => setPriority("Low")}
        >
          <Text style={{ color: "#FFF" }}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === "Medium" && styles.selected]}
          onPress={() => setPriority("Medium")}
        >
          <Text style={{ color: "#FFF" }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === "High" && styles.selected]}
          onPress={() => setPriority("High")}
        >
          <Text style={{ color: "#FFF" }}>High</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: date ? "#FFF" : "#888" }}>
          {date ? date : "Select Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          themeVariant="dark"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Contact (Optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Contact Number"
          placeholderTextColor="#888"
          value={contact}
          onChangeText={setContact}
        />
        <TouchableOpacity style={styles.smallButton} onPress={fetchContacts}>
          <Text style={styles.smallButtonText}>Select</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Location (Optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Location Coordinates"
          placeholderTextColor="#888"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.smallButton} onPress={getLocation}>
          <Text style={styles.smallButtonText}>Fetch</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Photo (Optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Photo reference"
          placeholderTextColor="#888"
          value={photo}
          onChangeText={setPhoto}
        />
        <TouchableOpacity style={styles.smallButton} onPress={takePhoto}>
          <Text style={styles.smallButtonText}>Take</Text>
        </TouchableOpacity>
      </View>
      {photo ? <Image source={{ uri: photo }} style={styles.previewImage} /> : null}

      <Text style={styles.label}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Type notes here"
        placeholderTextColor="#888"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={submitSurvey}>
        <Text style={styles.buttonText}>Submit Survey</Text>
      </TouchableOpacity>

      {/* Contacts Picker Modal */}
      <Modal visible={showContactModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Select Contact</Text>
            
            <TextInput
              style={[styles.input, { marginBottom: 15 }]}
              placeholder="Search by name or number..."
              placeholderTextColor="#888"
              value={contactSearch}
              onChangeText={setContactSearch}
            />

            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.contactItem} onPress={() => selectContact(item)}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                    <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => {
              setShowContactModal(false);
              setContactSearch("");
            }}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#FFFFFF",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#cac0c0",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center",
  },
  smallButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  priorityButton: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbced2",
  },
  selected: {
    backgroundColor: "#1976D2",
  },
  button: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeading: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  contactName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactNumber: {
    color: "#AAA",
    fontSize: 14,
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  }
});