import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOCALHOST_3000_ADDRESS } from "@env";
const localhost_address = "172.31.11.246:3000";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as dispatchLogin } from "../context/context";

// import User from "../models/User";

interface User {
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

interface LoginResponse extends User {
  // customerId: number;
  token: string;
  employeeData: any;
}

function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  async function login(email: string, password: string): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    console.log(localhost_address);
    console.log("here");
    console.log(email, password);
    const body = JSON.stringify({ email: email, password: password });
    console.log(body);

    try {
      const response = await fetch(
        `http://${localhost_address}/api/employee/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (!response.ok) {
        const json: ErrorResponse = await response.json();
        setIsLoading(false);
        setError(json.error);
        console.log(json.error);
        return false;
      }

      const json: LoginResponse = await response.json();
      console.log("here is " + json);

      AsyncStorage.setItem("user", JSON.stringify(json));

      // Update auth context
      dispatch(dispatchLogin(json));

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred while logging in.");
      console.log(error);
      return false;
    }
  }

  return { login, isLoading, error };
}

export default useLogin;
