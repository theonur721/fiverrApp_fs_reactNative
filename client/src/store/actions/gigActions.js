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
