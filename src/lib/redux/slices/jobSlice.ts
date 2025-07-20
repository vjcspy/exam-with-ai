import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IJob } from '@/lib/model/job';

type CaptureMode = 'specific' | 'all';
type CaptureWithProvider = 'DirectX' | null;
type RuntimeMode = 'CLI' | 'SERVICE';

// Define the initial state
export type JobState = {
  job: IJob | null;
  captureMode: CaptureMode;
  captureWithProvider: CaptureWithProvider;
  runtimeMode: RuntimeMode;
  selectedImageKey: string | null;
  loading: boolean;
  error: Error | null;
};
const initialState: JobState = {
  job: null,
  captureMode: 'specific',
  captureWithProvider: 'DirectX',
  runtimeMode: 'CLI',
  selectedImageKey: null,
  loading: false,
  error: null,
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<IJob>) => {
      state.job = action.payload;
    },
    setCaptureMode: (state, action: PayloadAction<CaptureMode>) => {
      state.captureMode = action.payload;
    },
    setCaptureWithProvider(state, action: PayloadAction<CaptureWithProvider>) {
      state.captureWithProvider = action.payload;
    },
    setRuntimeMode(state, action: PayloadAction<RuntimeMode>) {
      state.runtimeMode = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<Error | null>) {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setJob,
  setCaptureMode,
  setCaptureWithProvider,
  setRuntimeMode,
  setLoading,
  setError,
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
