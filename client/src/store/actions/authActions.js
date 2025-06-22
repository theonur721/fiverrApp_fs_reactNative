import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

// Kayıt
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed',
      );
    }
  },
);

// Giriş
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

// Çıkış
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.post('/auth/logout');
      await AsyncStorage.removeItem('user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  },
);

// Uygulama açıldığında kullanıcıyı yükle
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUser',
  async (_, {rejectWithValue}) => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue) {
        const parsed = JSON.parse(jsonValue);
        return parsed;
      } else {
        return rejectWithValue('No user found in storage');
      }
    } catch (error) {
      return rejectWithValue('Failed to load user');
    }
  },
);
