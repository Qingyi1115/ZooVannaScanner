import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  employeeData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEmployeeData: (state, action) => {
      state.employeeData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    login: (state, action) => {
      // Here, you can update multiple properties in your state
      state.user = true;
      state.token = action.payload.token;
      state.employeeData = action.payload.employeeData;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.employeeData = null;
    },
  },
});

export const { setUser, setEmployeeData, setToken, login, logout } =
  authSlice.actions;
export default authSlice.reducer;
