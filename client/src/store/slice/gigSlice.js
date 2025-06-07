import {createSlice} from '@reduxjs/toolkit';
import {fetchGigs} from '../actions/gigActions';
import {addGig} from '../actions/gigActions';

const initialState = {
  gigs: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    search: '',
  },
};

const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setSearch(state, action) {
      state.filters.search = action.payload;
    },
    clearFilters(state) {
      state.filters = {category: '', search: ''};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGigs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(addGig.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGig.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs.push(action.payload);
      })
      .addCase(addGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setCategory, setSearch, clearFilters} = gigSlice.actions;
export default gigSlice.reducer;
