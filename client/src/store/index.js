import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import gigReducer from './slice/gigSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gigs: gigReducer,
  },
});
