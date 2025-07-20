import { useCallback } from 'react';

import { useShowImageActions } from '@/hooks/useShowImageActions';
import { IJob } from '@/lib/model/job';
import { setError, setJob, setLoading } from '@/lib/redux/slices/jobSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { JobStatus } from '@/lib/types/job';
import { fetchData } from '@/lib/utils';
import { CommonValue } from '@/lib/values/common.value';

import { useCurrentImage } from './useCurrentImage';

export const useJobActions = () => {
  const dispatch = useAppDispatch();
  const { captureMode, captureWithProvider, loading, error } = useAppSelector((state) => state.job);
  const alignment = useAppSelector((state) => state.alignment);
  const { imageName } = useCurrentImage();
  const {
    actions: { forceShowTextAction, forceShowImageAction },
  } = useShowImageActions();

  const capture = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      forceShowImageAction();
      const url = CommonValue.getJobUrl();
      const body = {
        error_message: null,
        status: JobStatus.AGENT_SCREEN_CAPTURE,
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
      dispatch(setError(err));
      console.error('Failed to capture job:', err);
      return null;
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    }
  }, [captureMode, captureWithProvider, dispatch, forceShowTextAction]);

  const askRAG = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      forceShowTextAction();
      const url = CommonValue.getJobRagAIAnswerUrl();
      const body = {
        image_filename: imageName,
        alignment: {
          bottom: alignment.bottom,
          left: alignment.left,
          right: alignment.right,
          top: alignment.top,
        },
      };
      console.log('Ask RAG with body: ', body);
      const [data, fetchError] = await fetchData(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log('Ask RAG successfully with response ', data);

      if (fetchError) {
        throw fetchError;
      }

      return data;
    } catch (err: any) {
      dispatch(setError(err));
      console.error('Failed to answer image question:', err);
      return null;
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    }
  }, [imageName, alignment, dispatch, forceShowTextAction]);

  return { capture, askRAG, loading, error };
};
