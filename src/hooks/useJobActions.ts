import { useCallback, useState } from 'react';

import { IJob } from '@/lib/model/job';
import { setJob } from '@/lib/redux/slices/jobSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { fetchData } from '@/lib/utils';
import { CommonValue } from '@/lib/values/common.value';

export const useJobActions = () => {
  const dispatch = useAppDispatch();
  const { captureMode, captureWithProvider } = useAppSelector((state) => state.job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const capture = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = CommonValue.getJobUrl();
      const body = {
        error_message: null,
        data: {
          capture_mode: captureMode,
          capture_with_provider: captureWithProvider,
        },
      };

      const [data, fetchError] = await fetchData(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (fetchError) {
        throw fetchError;
      }

      dispatch(setJob(data as IJob));
      return data;
    } catch (err: any) {
      setError(err);
      console.error('Failed to capture job:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [captureMode, captureWithProvider, dispatch]);

  //curl --location --request POST 'https://metan.bluestone.systems/image-question-jobs/answer' \
  // --header 'Content-Type: application/json' \
  // --data-raw '{
  //     "image_filename": "c77860b00bfc935ed1b295350913a00806e0a74348822e58715fc3195108c308.png",
  //     "alignment": {
  //         "bottom": 63,
  //         "left": 18,
  //         "right": 75,
  //         "top": 7
  //     }
  // }'

  return { capture, loading, error };
};
