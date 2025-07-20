import { useCallback } from 'react';

import { setShowImage, toggleImage } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch } from '@/lib/redux/store';

export const useShowImageActions = () => {
  const dispatch = useAppDispatch();
  const toggleImageAction = useCallback(() => {
    dispatch(toggleImage());
  }, [dispatch]);
  const forceShowTextAction = useCallback(() => {
    dispatch(setShowImage(false));
  }, [dispatch]);
  const forceShowImageAction = useCallback(() => {
    dispatch(setShowImage(true));
  }, [dispatch]);
  return {
    actions: {
      toggleImageAction,
      forceShowTextAction,
      forceShowImageAction,
    },
  };
};
