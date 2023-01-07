import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBackgroundImg } from '../../apis/unsplashGetImage';

const fetchImg = createAsyncThunk('image/fetch', async (arg, { getState }) => {
  const {
    temperature,
    apiID,
    additionalDescription,
  } = getState().weather.weatherDetails;

  const response = await getBackgroundImg(temperature, apiID, additionalDescription);
  return response;
});

export { fetchImg };
