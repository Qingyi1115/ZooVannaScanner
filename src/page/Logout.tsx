import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { logout as dispatchLogOut } from "../context/context";

const Logout = ({ navigation, updateUser }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(dispatchLogOut());
    console.log("log out");
    AsyncStorage.removeItem("user");
    AsyncStorage.getItem("user").then((user) => console.log(user));
    console.log("did it get here????");
    updateUser();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          width: 300,
          borderRadius: 6,
          backgroundColor: "#23341d",
          padding: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

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
