import { View, Text, StyleSheet, Switch } from "react-native";
import { useState } from "react";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
      
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#1976D2", textAlign: "center" },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  settingText: { fontSize: 18 }
});
