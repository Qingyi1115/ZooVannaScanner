import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const askCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setHasPermission(true);
    }
  };

  const handleAfterScanned = ({ data, type }: any) => {
    console.log(data);
  };

  useEffect(() => {
    askCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <BarCodeScanner
          style={styles.Scanner}
          onBarCodeScanned={handleAfterScanned}
        />
      ) : (
        <Text>No camera permission granted.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Scanner: {
    width: "70%",
    height: "50%",
    backgroundColor: "black",
  },
});
