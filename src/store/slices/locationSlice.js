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
  locationError: '',
  isLocationLoading: true,
  isWeatherLoading: true,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLocation.pending, (state, action) => {
      return {
        isLocationLoading: true,
        isWeatherLoading: true,
        locationError: '',
      };
    });
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      const { coords, city, region, country } = action.payload;
      return {
        locationDetails: {
          coords: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          city,
          region,
          country,
        },
        isLocationLoading: false,
        locationError: '',
      };
    });
    builder.addCase(fetchLocation.rejected, (state, action) => {
      return {
        isLocationLoading: false,
        isWeatherLoading: false,
        locationError: 'Location information is unavailable',
      };
    });
  },
});

export const locationReducer = locationSlice.reducer;
