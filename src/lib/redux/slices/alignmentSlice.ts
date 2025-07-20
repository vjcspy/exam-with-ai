import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlignmentState {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// Default values if nothing is in localStorage
const defaultAlignment: AlignmentState = {
  top: 0,
  right: 100,
  bottom: 100,
  left: 0,
};

// Load from localStorage if available, otherwise use default values
const loadInitialState = (): AlignmentState => {
  if (typeof window === 'undefined') {
    return defaultAlignment; // Return default during SSR
  }

  try {
    const savedAlignment = localStorage.getItem('alignment');
    if (savedAlignment) {
      return JSON.parse(savedAlignment) as AlignmentState;
    }
  } catch (error) {
    console.error('Failed to load alignment from localStorage:', error);
  }

  return defaultAlignment;
};

const initialState: AlignmentState = loadInitialState();

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
