import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (filters = {}, {rejectWithValue}) => {
    try {
      // filterleme parametrelerini query strigne çevir
      const query = new URLSearchParams(filters).toString();
      const res = await api.get(`/gigs?${query}`);
      return res.data.gigs;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const addGig = createAsyncThunk(
  'gigs/addGig',
  async (gigData, thunkAPI) => {
    try {
      const response = await api.post('/gigs', gigData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data || 'Error adding gig',
      );
    }
  },
);
