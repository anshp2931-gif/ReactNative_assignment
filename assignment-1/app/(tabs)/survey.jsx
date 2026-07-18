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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Survey() {
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

    Alert.alert("Success", "Survey Created Successfully!");

    setSiteName("");
    setClientName("");
    setDescription("");
    setPriority("");
    setDate("");
    setSelectedDate(new Date());
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
          style={[
            styles.priorityButton,
            priority === "Low" && styles.selected,
          ]}
          onPress={() => setPriority("Low")}
        >
          <Text>Low</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "Medium" && styles.selected,
          ]}
          onPress={() => setPriority("Medium")}
        >
          <Text>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "High" && styles.selected,
          ]}
          onPress={() => setPriority("High")}
        >
          <Text>High</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: date ? "#000" : "#999" }}>
          {date ? date : "Select Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={submitSurvey}>
        <Text style={styles.buttonText}>Submit Survey</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#1976D2",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
  },

  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  priorityButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1976D2",
  },

  selected: {
    backgroundColor: "#90CAF9",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});