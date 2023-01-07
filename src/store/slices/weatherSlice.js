import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../configureStore';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherDetails: {
      icon: '',
      temperature: null,
      humidity: null,
      description: '',
      additionalDescription: '',
      windSpeed: '',
      apiID: null,
      updatedTime: '',
      backgroundImageUrl: '',
    },
    weatherError: null,
    isWeatherLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.isWeatherLoading = true;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      console.log(action);
      const {
        icon,
        temperature,
        humidity,
        description,
        additionalDescription,
        windSpeed,
        apiID,
        updatedTime,
        backgroundImageUrl,
      } = action.payload;
      state.weatherDetails = {
        icon,
        temperature,
        humidity,
        description,
        additionalDescription,
        windSpeed,
        apiID,
        updatedTime,
        backgroundImageUrl,
      };
      state.isWeatherLoading = false;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      return {
        isLocationLoading: false,
        isWeatherLoading: false,
        weatherError: action.error.message,
      };
    });
  },
});

export const weatherReducer = weatherSlice.reducer;
