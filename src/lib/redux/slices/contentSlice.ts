import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  sampleImage: string;
  sampleText: string;
}

const initialState: ContentState = {
  sampleImage: '/next.svg',
  sampleText:
    'This is a sample text that will be displayed when the image is clicked. In a real application, this could be information extracted from the image or any other relevant content.',
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSampleImage: (state, action: PayloadAction<string>) => {
      state.sampleImage = action.payload;
    },
    setSampleText: (state, action: PayloadAction<string>) => {
      state.sampleText = action.payload;
    },
  },
});

export const { setSampleImage, setSampleText } = contentSlice.actions;

export default contentSlice.reducer;
