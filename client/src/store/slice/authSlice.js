import {createSlice} from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  registerUser,
  loadUserFromStorage,
} from '../actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // REGISTER
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload.user;
        state.token = actions.payload.token;
        state.isAuthenticated = true;
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            user: actions.payload.user,
            token: actions.payload.token,
          }),
        );
      })
      .addCase(registerUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload;
      })
      // LOGIN
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload.user;
        state.token = actions.payload.token;
        state.isAuthenticated = true;
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            user: actions.payload.user,
            token: actions.payload.token,
          }),
        );
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload;
        state.isAuthenticated = false;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // LOAD FROM STORAGE
      .addCase(loadUserFromStorage.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
        state.token = actions.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loadUserFromStorage.rejected, (state, actions) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const {resetError} = authSlice.actions;
export default authSlice.reducer;
