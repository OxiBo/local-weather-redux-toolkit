import { createSlice } from '@reduxjs/toolkit';
import defaultImg from '../../gallery/default1.jpg';
import { fetchImg } from '../thunk/fetchImg';

const backgroundImgSlice = createSlice({
  name: 'background-image',
  initialState: {
    backgroundImg: defaultImg,
    imageError: null,
    isImageLoading: false,
  },

  extraReducers(builder) {
    builder.addCase(fetchImg.pending, (state) => {
      state.isImageLoading = true;
    });
    builder.addCase(fetchImg.fulfilled, (state, action) => {
      state.backgroundImg = action.payload.backgroundImg;
      state.isImageLoading = false;
    });
    builder.addCase(fetchImg.rejected, (state, error) => {
      state.imageError = error.message;
      state.backgroundImg = defaultImg;
    });
  },
});

export const backgroundImgReducer = backgroundImgSlice.reducer;
