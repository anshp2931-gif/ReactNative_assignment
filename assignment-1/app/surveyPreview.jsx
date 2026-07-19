import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function SurveyPreviewScreen() {
  const params = useLocalSearchParams();

  const submitSurvey = () => {
    Alert.alert("Success", "Survey Submitted Successfully!", [
      { text: "OK", onPress: () => router.navigate("/dashboard") }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Survey Preview</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Site Details</Text>
        <Text style={styles.text}>Site Name: {params.siteName || "N/A"}</Text>
        <Text style={styles.text}>Client Name: {params.clientName || "N/A"}</Text>
        <Text style={styles.text}>Description: {params.description || "N/A"}</Text>
        <Text style={styles.text}>Priority: {params.priority || "N/A"}</Text>
        <Text style={styles.text}>Date: {params.date || "N/A"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Other Info</Text>
        <Text style={styles.text}>Photo: {params.photo || "No photo captured"}</Text>
        <Text style={styles.text}>Contact: {params.contact || "No contact selected"}</Text>
        <Text style={styles.text}>Location: {params.location || "No location recorded"}</Text>
        <Text style={styles.text}>Notes: {params.notes || "No notes"}</Text>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#f39c12" }]} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Edit Survey</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={submitSurvey}>
        <Text style={styles.buttonText}>Submit Survey</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  heading: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#1976D2" },
  card: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  button: { backgroundColor: "#1976D2", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
