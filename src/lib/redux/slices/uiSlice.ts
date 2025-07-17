import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  showAlignment: boolean;
  showImage: boolean;
}

const initialState: UiState = {
  showAlignment: false,
  showImage: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAlignment: (state) => {
      state.showAlignment = !state.showAlignment;
    },
    setShowAlignment: (state, action: PayloadAction<boolean>) => {
      state.showAlignment = action.payload;
    },
    toggleImage: (state) => {
      state.showImage = !state.showImage;
    },
    setShowImage: (state, action: PayloadAction<boolean>) => {
      state.showImage = action.payload;
    },
  },
});

export const { toggleAlignment, setShowAlignment, toggleImage, setShowImage } = uiSlice.actions;

export default uiSlice.reducer;
