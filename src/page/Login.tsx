import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import useLogin from "../hooks/useLogin";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Login({ navigation, updateUser }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error } = useLogin();
  const [emailError, setEmailError] = useState("Email is required.");
  const [passwordError, setPasswordError] = useState("Password is required.");

  // ValidityState properties: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != undefined) {
      if (!email) {
        return (
          <div className="font-medium text-red-600">
            * Please enter an e-mail
          </div>
        );
      } else if (!emailPattern.test(email)) {
        return (
          <div className="font-medium text-red-600">
            * Invalid e-mail format
          </div>
        );
      }
    }
    return null;
  }

  function validatePassword(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">
            * Please enter a password
          </div>
        );
      }
    }
    return null;
  }

  async function handleSubmit() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log("Inside handleSubmit");
    console.log(email);
    console.log(password);

    if (!email) {
      setEmailError("Email is required.");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid e-mail format.");
    } else {
      setEmailError(""); // Clear the error message
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    } else {
      setPasswordError(""); // Clear the error message
    }

    const isSuccess = await login(email, password);

    if (isSuccess) {
      updateUser();
    } else {
      setPasswordError("Wrong password.");
    }
    console.log("success " + isSuccess);
  }

  return (
    <View style={styles.container}>
      <View style={{ width: 300, alignItems: "center" }}>
        <Text style={{ fontSize: 30, marginBottom: 80, color: "#23341d" }}>
          ZOOVANNA
        </Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.text}>Email</Text>
      </View>

      <TextInput
        style={styles.Input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Type your e-mail"
      />
      <View style={[styles.container2, { marginTop: 8 }]}>
        <Text>Password</Text>
      </View>
      <TextInput
        style={styles.Input2}
        placeholder="Type your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)} // Update the 'password' state when the text changes
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          width: 300,
          borderRadius: 6,
          backgroundColor: "#23341d",
          padding: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>LOG IN</Text>
      </TouchableOpacity>
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
    </View>
  );
}

export default Login;

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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
    alignItems: "flex-start",
  },
});
