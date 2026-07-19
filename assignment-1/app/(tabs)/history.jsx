import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";


export default function SurveyHistory() {

  const [surveys, setSurveys] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredSurveys = surveys.filter((item) => {
    const matchSearch =
      item.site.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase());

    const matchPriority =
      filter === "All" || item.priority === filter;

    return matchSearch && matchPriority;
  });

  const viewDetails = (survey) => {
    Alert.alert(
      "Survey Details",
      `Survey ID: ${survey.id}

Site: ${survey.site}

Client: ${survey.client}

Priority: ${survey.priority}

Date: ${survey.date}

Description: ${survey.description}`
    );
  };

  const deleteSurvey = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setSurveys(surveys.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.site}</Text>

      <Text>Client: {item.client}</Text>

      <Text>Priority: {item.priority}</Text>

      <Text>Date: {item.date}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => viewDetails(item)}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteSurvey(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Survey History</Text>

      <TextInput
        style={styles.search}
        placeholder="Search Survey..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterContainer}>
        {["All", "Low", "Medium", "High"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.selected,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Survey Found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1976D2",
  },

  search: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  filterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    width: "23%",
    alignItems: "center",
  },

  selected: {
    backgroundColor: "#90CAF9",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  viewButton: {
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  empty: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});