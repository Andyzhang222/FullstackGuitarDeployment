import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  address: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LocationState = {
  address: '',
  status: 'idle',
  error: null,
};

// Async thunk to fetch address from coordinates
export const fetchAddressFromCoords = createAsyncThunk(
  'location/fetchAddressFromCoords',
  async ({ lat, lng }: { lat: number; lng: number }, { rejectWithValue }) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return rejectWithValue('No results found');
      }
    } catch (error) {
      return rejectWithValue('Error fetching address');
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressFromCoords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddressFromCoords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.address = action.payload;
      })
      .addCase(fetchAddressFromCoords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setAddress } = locationSlice.actions;
export const selectAddress = (state: { location: LocationState }) =>
  state.location.address;

export default locationSlice.reducer;
