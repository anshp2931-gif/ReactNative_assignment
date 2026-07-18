import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [captureTime, setCaptureTime] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera permission is required.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ marginTop: 10 }}>Opening Camera...</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync();

    setPhoto(picture.uri);
    setCaptureTime(new Date().toLocaleString());
  };

  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setPhoto(null);
            setCaptureTime("");
          },
        },
      ]
    );
  };

  const retakePhoto = () => {
    setPhoto(null);
    setCaptureTime("");
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.image} />

        <Text style={styles.time}>
          Capture Time : {captureTime}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={retakePhoto}
        >
          <Text style={styles.buttonText}>
            Retake Photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={deletePhoto}
        >
          <Text style={styles.buttonText}>
            Delete Photo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
      />

      <TouchableOpacity
        style={styles.captureButton}
        onPress={takePhoto}
      >
        <Text style={styles.captureText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },

  camera: {
    flex: 1,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
  },

  time: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#1976D2",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  captureButton: {
    backgroundColor: "#1976D2",
    padding: 18,
    margin: 20,
    borderRadius: 50,
    alignItems: "center",
  },

  captureText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});