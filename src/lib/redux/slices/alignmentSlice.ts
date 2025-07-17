import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlignmentState {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const initialState: AlignmentState = {
  top: 0,
  right: 100,
  bottom: 100,
  left: 0,
};

export const alignmentSlice = createSlice({
  name: 'alignment',
  initialState,
  reducers: {
    setAlignment: (state, action: PayloadAction<AlignmentState>) => {
      return action.payload;
    },
    updateAlignment: (state, action: PayloadAction<Partial<AlignmentState>>) => {
      return { ...state, ...action.payload };
    },
    resetAlignment: () => {
      return initialState;
    },
  },
});

export const { setAlignment, updateAlignment, resetAlignment } = alignmentSlice.actions;

export default alignmentSlice.reducer;
