import { bindActionCreators, createSlice } from '@reduxjs/toolkit';

const intervalSlice = createSlice({
  name: 'interval',
  initialState: {
    interval: '',
    visibleInterval: '',
    millisecondsInterval: null,
    intervalID: null,
  },
  reducers: {
    changeInterval: (state, action) => {
      state.visibleInterval = action.payload;
    },
  },
});

export const intervalReducer = intervalSlice.reducer;
export const { changeInterval } = intervalSlice.actions;
