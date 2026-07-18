import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Smart Field Survey</Text>
      </View>

      {/* Welcome */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text>Hello Student</Text>
        <Text>Have a great day!</Text>
      </View>

      {/* Student Details */}
      <View style={styles.card}>
        <Text style={styles.title}>Student Details</Text>

        <Text>Name : Ansh Patel</Text>
        <Text>Enrollment : 220120107001</Text>
        <Text>Branch : Computer Engineering</Text>
        <Text>Semester : 6</Text>
      </View>

      {/* Survey Count */}
      <View style={styles.card}>
        <Text style={styles.title}>Today's Survey Count</Text>

        <Text style={styles.count}>12</Text>
        <Text>Completed Surveys</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.title}>Quick Actions</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text>New Survey</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text>Camera</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text>Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text>Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Survey */}
      <View style={styles.card}>
        <Text style={styles.title}>Recent Survey Summary</Text>

        <Text>✔ Road Inspection</Text>
        <Text>Status : Completed</Text>
        <Text>Time : 10:30 AM</Text>

        <View style={{ height: 15 }} />

        <Text>✔ Building Survey</Text>
        <Text>Status : Completed</Text>
        <Text>Time : 3:45 PM</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    backgroundColor: "#1976D2",
    padding: 20,
    alignItems: "center",
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  count: {
    fontSize: 35,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  button: {
    width: "47%",
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});