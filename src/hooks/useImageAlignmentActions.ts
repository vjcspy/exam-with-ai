import { debounce } from 'es-toolkit';
import { useEffect, useMemo } from 'react';

import { setAlignment } from '@/lib/redux/slices/alignmentSlice';
import { setShowImage, toggleAlignment } from '@/lib/redux/slices/uiSlice';
import { useAppDispatch } from '@/lib/redux/store';

export const useImageAlignmentActions = () => {
  const dispatch = useAppDispatch();
  const debouncedSetAlignment = useMemo(
    () =>
      debounce((newAlignment: { top: number; right: number; bottom: number; left: number }) => {
        dispatch(setAlignment(newAlignment));
      }, 100),
    [dispatch]
  );
  const handleToggleAlignment = () => {
    dispatch(setShowImage(true));
    dispatch(toggleAlignment());
  };

  const handleAlignmentChange = (newAlignment: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }) => {
    // Call the debounced function
    debouncedSetAlignment(newAlignment);
  };

  // Clean up the debounced function when the component unmounts
  useEffect(() => {
    return () => {
      // If es-toolkit's debounce has a cancel/flush method, call it here.
      // For many debounce implementations, this might not be strictly necessary
      // as the function itself will stop executing once the component unmounts.
      // However, it's good practice to consider.
      // If debouncedSetAlignment had a .cancel() method, you would call:
      debouncedSetAlignment.cancel();
    };
  }, [debouncedSetAlignment]);

  return { actions: { handleAlignmentChange, handleToggleAlignment } };
};
