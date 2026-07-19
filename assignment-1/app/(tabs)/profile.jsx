import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Name : Ansh Patel</Text>
        <Text style={styles.text}>Enrollment : 220120107001</Text>
        <Text style={styles.text}>Branch : Computer Engineering</Text>
        <Text style={styles.text}>Semester : 6</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#1976D2", textAlign: "center" },
  card: { backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 3 },
  text: { fontSize: 16, marginBottom: 10 },
});
