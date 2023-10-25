import { Button, StyleSheet, Text, View } from "react-native";
import Login from "./Login";
import Logout from "./Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { logout as dispatchLogOut } from "../context/context";
import { useDispatch } from "react-redux";

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => setUser(user));
    console.log(user);
  });

  const handleLogOut = () => {
    navigation.navigate("Logout");
  };

  console.log("here is " + user);

  return (
    <View style={styles.container}>
      {/* Display the Login and Logout components in this screen */}

      <Button color="#23341d" title="Logout" onPress={handleLogOut}></Button>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fdf5",
    alignItems: "center",
    paddingTop: 200,
  },
  container2: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: 300,
    marginBottom: 2,
  },
  Scanner: {
    width: "70%",
    height: "80%",
    backgroundColor: "black",
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
