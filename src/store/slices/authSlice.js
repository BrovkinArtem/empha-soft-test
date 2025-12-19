import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, setAuthToken, removeAuthToken } from "@/utils/cookies";

const initialState = {
  token: getAuthToken(),
  isAuthenticated: !!getAuthToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      setAuthToken(token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      removeAuthToken();
    },
    checkAuth: (state) => {
      const token = getAuthToken();
      state.token = token;
      state.isAuthenticated = !!token;
    },
  },
});

export const { setCredentials, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
