import { StyleSheet, Text, View } from "react-native";

function Failed({ route, navigation }) {
  const message = route.params.message;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "white" }}>Failed</Text>
      <Text style={{ fontSize: 30, color: "white" }}>{message}</Text>
    </View>
  );
}

export default Failed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c91f08",
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
