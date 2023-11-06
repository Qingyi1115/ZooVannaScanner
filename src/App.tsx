import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./context";
import Failed from "./page/Failed";
import Login from "./page/Login";
import Logout from "./page/Logout";
import QrCode from "./page/QrCode";
import Success from "./page/Success";

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
        options={{
          headerShown: false,
          headerTitleStyle: { backgroundColor: "#f7fdf5" },
        }}
        name="Code"
        component={QrCode}
      />
      <Stack.Screen
        name="Success"
        options={{
          headerTitleStyle: { backgroundColor: "#f7fdf5" },
        }}
        component={Success}
      />
      <Stack.Screen
        name="Failed"
        options={{
          headerTitleStyle: { backgroundColor: "#f7fdf5" },
        }}
        component={Failed}
      />
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

              <Stack.Screen name="Logout">
                {() => <Logout {...useNavigation()} updateUser={updateUser} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {() => <Login {...useNavigation()} updateUser={updateUser} />}
            </Stack.Screen>
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
