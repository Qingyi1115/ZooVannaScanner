import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, Vibration, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { LOCALHOST_3000_ADDRESS } from "@env";
const localhost_address = LOCALHOST_3000_ADDRESS;
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function QrCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  console.log("HIIIIII");
  console.log(hasPermission);

  const askCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setHasPermission(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something - for example: reset states, ask for camera permission
      setScanned(false);
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  async function handleAfterScanned({ data }) {
    Vibration.vibrate();
    setScanned(true);
    const now = new Date(Date.now());
    now.setHours(0, 0, 0);
    console.log(data);
    console.log(localhost_address);

    try {
      const response = await fetch(
        `http://${localhost_address}/api/orderItem/getOrderItemByVerificationCode/${data}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        navigation.navigate("Failed", { message: "No such data" });
        return;
      }
      const json: any = await response.json();
      console.log("here is " + json.result);

      const result = json.result;

      console.log(new Date(result.customerOrder.entryDate));
      console.log(now);

      if (result) {
        if (
          new Date(result.customerOrder.entryDate).toLocaleDateString() ==
          now.toLocaleDateString()
        ) {
          console.log("yessss");
          navigation.navigate("Success", { result: result });
        } else {
          console.log("noooo");
          navigation.navigate("Failed", { message: "Invalid date" });
        }
      } else {
        console.log("noooo");
        navigation.navigate("Failed", { message: "Result not found" });
      }
    } catch (error) {
      navigation.navigate("Failed", { message: error.message });
      console.log(error);
    }
  }

  useEffect(() => {
    askCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <>
          <BarCodeScanner
            style={styles.Scanner}
            onBarCodeScanned={scanned ? undefined : handleAfterScanned}
          />
        </>
      ) : (
        <Text>No camera permission granted.</Text>
      )}
    </View>
  );
}
export default QrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fdf5",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: 300,
    marginBottom: 2,
  },
  Scanner: {
    width: 500,
    height: 500,
    backgroundColor: "#f7fdf5",
  },
  Input: {
    borderWidth: 0.5,
    paddingLeft: 5,
    borderRadius: 3,
    height: 40,
    width: 300,
  },
  Input2: {
    paddingLeft: 5,
    marginBottom: 20,
    borderWidth: 0.5,
    borderRadius: 3,
    height: 40,
    width: 300,
  },
  text: {
    color: "#23341d",
    fontFamily: "Roboto",
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 3,
    height: 40,
    width: 300,
  },
});
