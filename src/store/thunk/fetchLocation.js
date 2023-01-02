import { createAsyncThunk } from '@reduxjs/toolkit';
import { location } from '../../apis/location';

const fetchLocation = createAsyncThunk('location/fetch', async () => {
  const response = await location();
  return response;
});

// DEV ONLY - delete before deploying
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchLocation };
