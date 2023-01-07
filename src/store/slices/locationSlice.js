import { createSlice } from '@reduxjs/toolkit';
import { fetchLocation } from '../configureStore';
const initialState = {
  locationDetails: {
    city: '',
    region: '',
    country: '',
    coords: {
      latitude: null,
      longitude: null,
    },
  },
  locationError: null,
  isLocationLoading: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLocation.pending, (state, action) => {
      state.isLocationLoading = true;
    });
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      const { coords, city, region, country } = action.payload;
      state.locationDetails = {
        coords: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        city,
        region,
        country,
      };
      state.isLocationLoading = false;
    });
    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.isLocationLoading = false;
      state.locationError = 'Location information is unavailable';
    });
  },
});

export const locationReducer = locationSlice.reducer;
