import { createAsyncThunk } from '@reduxjs/toolkit';
import { weatherInfo } from '../../apis/weather';

const fetchWeather = createAsyncThunk(
  'fetch/weather',
  async (arg, { getState }) => {
    const { latitude, longitude } = getState().location.locationDetails.coords;
    const response = await weatherInfo(latitude, longitude);
    return response;
  }
);

export { fetchWeather };
