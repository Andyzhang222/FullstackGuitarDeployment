"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAddress = exports.setAddress = exports.fetchAddressFromCoords = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    address: '',
    status: 'idle',
    error: null,
};
// Async thunk to fetch address from coordinates
exports.fetchAddressFromCoords = (0, toolkit_1.createAsyncThunk)('location/fetchAddressFromCoords', async ({ lat, lng }, { rejectWithValue }) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].formatted_address;
        }
        else {
            return rejectWithValue('No results found');
        }
    }
    catch (error) {
        return rejectWithValue('Error fetching address');
    }
});
const locationSlice = (0, toolkit_1.createSlice)({
    name: 'location',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAddressFromCoords.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(exports.fetchAddressFromCoords.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.address = action.payload;
        })
            .addCase(exports.fetchAddressFromCoords.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});
exports.setAddress = locationSlice.actions.setAddress;
const selectAddress = (state) => state.location.address;
exports.selectAddress = selectAddress;
exports.default = locationSlice.reducer;
//# sourceMappingURL=locationSlice.js.map