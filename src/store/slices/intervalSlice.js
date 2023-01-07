import { createSlice } from '@reduxjs/toolkit';

const intervalSlice = createSlice({
  name: 'interval',
  initialState: {
    interval: "",
    intervalID: null,
  },
  reducers: {
    changeInterval: (state, action) => {
      state.interval = action.payload;
    },
    setIntervalID: (state, action) => {
      state.intervalID = action.payload;
    }
  },
});

export const intervalReducer = intervalSlice.reducer;
export const { changeInterval, setIntervalID } = intervalSlice.actions;
