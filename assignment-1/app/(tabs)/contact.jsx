import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
  StyleSheet,
} from "react-native";

import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  // Request Permission & Fetch Contacts
  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow contact permission."
      );
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    const contactList = data.map((contact) => ({
      id: contact.id,
      name: contact.name || "Unknown",
      number:
        contact.phoneNumbers && contact.phoneNumbers.length > 0
          ? contact.phoneNumbers[0].number
          : "No Number",
    }));

    contactList.sort((a, b) => a.name.localeCompare(b.name));

    setContacts(contactList);
    setFilteredContacts(contactList);
  };

  // Search
  const searchContacts = (text) => {
    setSearch(text);

    const result = contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.number.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredContacts(result);
  };

  // Copy Number
  const copyNumber = async (number) => {
    if (number === "No Number") {
      Alert.alert("No Number", "This contact has no phone number.");
      return;
    }

    await Clipboard.setStringAsync(number);

    Alert.alert("Copied", "Contact number copied successfully.");
  };

  // Pull To Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.number}>{item.number}</Text>
      </View>

      {item.number !== "No Number" && (
        <TouchableOpacity onPress={() => copyNumber(item.number)}>
          <Text style={styles.copy}>Copy</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Contacts ({filteredContacts.length})
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search Contacts..."
        value={search}
        onChangeText={searchContacts}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No Contacts Found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 17,
    fontWeight: "600",
  },

  number: {
    color: "#666",
    marginTop: 4,
  },

  copy: {
    color: "blue",
    fontWeight: "bold",
    padding: 8,
  },

  empty: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 18,
  },
});