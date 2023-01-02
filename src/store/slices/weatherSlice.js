import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../configureStore';

const weatherSlice = createSlice({
  initialState: {
    weatherDetails: {
      icon: '',
      temperature: null,
      humidity: null,
      description: '',
      additionalDescription: '',
      windSpeed: '',
      apiID: null,
      weatherAPIError: '',
      updatedTime: '',
      backgroundImageUrl: '',
    },
    weatherAPIError: '',
    isWeatherLoading: false,
  },
  name: 'weather',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchWeather.pending, (state, action) => {
      return {

        isWeatherLoading: true,
        weatherAPIError: '',
      };
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      const {
        icon,
        temperature,
        humidity,
        description,
        additionalDescription,
        windSpeed,
        apiID,
        weatherAPIError,
        updatedTime,
        backgroundImageUrl,
      } = action.payload;
      return {
        weatherDetails: {
          icon,
          temperature,
          humidity,
          description,
          additionalDescription,
          windSpeed,
          apiID,
          weatherAPIError,
          updatedTime,
          backgroundImageUrl,
        },
        isWeatherLoading: false,
      };
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      return {
        isLocationLoading: false,
        isWeatherLoading: false,
        weatherAPIError: 'Failed to load local weather.',
      };
    });
  },
});

export const weatherReducer = weatherSlice.reducer;
