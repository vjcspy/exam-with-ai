import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Job } from '@/lib/types/jobs';

// Define the initial state
export type JobState = {
  job: Job | null;
};
const initialState: JobState = {
  job: null,
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<Job>) => {
      state.job = action.payload;
    },
  },
});

// Export actions
export const { setJob } = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
