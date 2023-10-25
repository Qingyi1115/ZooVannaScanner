import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./page/Login";
import store from "./context";
import tailwind from "tailwind-rn";
import QrCode from "./page/QrCode";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logout from "./page/Logout";
import { RootState } from "./context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Setting from "./page/Setting";
import Success from "./page/Success";
import Failed from "./page/Failed";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

function Root({ updateUser }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="qrcode" size={24} color="black" />
          ),
          tabBarStyle: { backgroundColor: "#f7fdf5" },
        }}
        name="Qrcode"
        component={Branch}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="settings-outline" size={24} color="black" />
          ),
          tabBarStyle: { backgroundColor: "#f7fdf5" },
        }}
        name="Settings"
        component={() => (
          <Logout {...useNavigation()} updateUser={updateUser} />
        )}
      />
    </Tab.Navigator>
  );
}

function Branch() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Code"
        component={QrCode}
      />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Failed" component={Failed} />
    </Stack.Navigator>
  );
}

function App() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => setUser(user));
    console.log(user);
  }, []);

  const updateUser = () => {
    AsyncStorage.getItem("user").then((user) => setUser(user));
    console.log("called??");
  };

  const Tab = createBottomTabNavigator();
  console.log(user);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="ZooVanna" options={{ headerShown: false }}>
                {() => <Root updateUser={updateUser} />}
              </Stack.Screen>

              <Stack.Screen
                name="Logout"
                component={() => (
                  <Logout {...useNavigation()} updateUser={updateUser} />
                )}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={() => (
                <Login {...useNavigation()} updateUser={updateUser} />
              )}
            />
          )}

          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Scanner: {
    width: "70%",
    height: "80%",
    backgroundColor: "black",
  },
});
