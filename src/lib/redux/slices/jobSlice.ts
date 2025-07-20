import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IJob } from '@/lib/model/job';

type CaptureMode = 'specific' | 'all';
type CaptureWithProvider = 'DirectX' | null;
type RuntimeMode = 'CLI' | 'SERVICE';

// Helper functions for localStorage
const STORAGE_KEY = 'exam-with-ai-config';

const saveConfigToStorage = (config: {
  captureMode: CaptureMode;
  captureWithProvider: CaptureWithProvider;
  runtimeMode: RuntimeMode;
  forceCapture: boolean;
  autoAskRag: boolean;
}) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
};

const loadConfigFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedConfig = localStorage.getItem(STORAGE_KEY);
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
  }
  return null;
};

// Define the initial state
export type JobState = {
  job: IJob | null;
  captureMode: CaptureMode;
  captureWithProvider: CaptureWithProvider;
  runtimeMode: RuntimeMode;
  forceCapture: boolean;
  autoAskRag: boolean;
  selectedImageKey: string | null;
  loading: boolean;
  error: Error | null;
};

// Load stored config or use defaults
const storedConfig = loadConfigFromStorage();
const initialState: JobState = {
  job: null,
  captureMode: storedConfig?.captureMode || 'specific',
  captureWithProvider: storedConfig?.captureWithProvider || 'DirectX',
  runtimeMode: storedConfig?.runtimeMode || 'CLI',
  forceCapture: storedConfig?.forceCapture || false,
  autoAskRag: storedConfig?.autoAskRag || false,
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
      saveConfigToStorage({
        captureMode: state.captureMode,
        captureWithProvider: state.captureWithProvider,
        runtimeMode: state.runtimeMode,
        forceCapture: state.forceCapture,
        autoAskRag: state.autoAskRag,
      });
    },
    setCaptureWithProvider(state, action: PayloadAction<CaptureWithProvider>) {
      state.captureWithProvider = action.payload;
      saveConfigToStorage({
        captureMode: state.captureMode,
        captureWithProvider: state.captureWithProvider,
        runtimeMode: state.runtimeMode,
        forceCapture: state.forceCapture,
        autoAskRag: state.autoAskRag,
      });
    },
    setRuntimeMode(state, action: PayloadAction<RuntimeMode>) {
      state.runtimeMode = action.payload;
      saveConfigToStorage({
        captureMode: state.captureMode,
        captureWithProvider: state.captureWithProvider,
        runtimeMode: state.runtimeMode,
        forceCapture: state.forceCapture,
        autoAskRag: state.autoAskRag,
      });
    },
    setForceCapture(state, action: PayloadAction<boolean>) {
      state.forceCapture = action.payload;
      saveConfigToStorage({
        captureMode: state.captureMode,
        captureWithProvider: state.captureWithProvider,
        runtimeMode: state.runtimeMode,
        forceCapture: state.forceCapture,
        autoAskRag: state.autoAskRag,
      });
    },
    setAutoAskRag(state, action: PayloadAction<boolean>) {
      state.autoAskRag = action.payload;
      saveConfigToStorage({
        captureMode: state.captureMode,
        captureWithProvider: state.captureWithProvider,
        runtimeMode: state.runtimeMode,
        forceCapture: state.forceCapture,
        autoAskRag: state.autoAskRag,
      });
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
  setForceCapture,
  setAutoAskRag,
  setLoading,
  setError,
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
