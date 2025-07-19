import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IJob } from '@/lib/model/job';

// Define the initial state
export type JobState = {
  job: IJob | null;
};
const initialState: JobState = {
  job: null,
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<IJob>) => {
      state.job = action.payload;
    },
  },
});

// Export actions
export const { setJob } = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
