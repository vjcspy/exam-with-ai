import { useAppSelector } from '@/lib/redux/store';
import { CommonValue } from '@/lib/values/common.value';

export const useCurrentImage = () => {
  const jobState = useAppSelector((state) => state.job);

  if (!jobState.job) {
    return null;
  }

  if (jobState.selectedImageKey != null) {
    return !!jobState.job.data[jobState.selectedImageKey]
      ? CommonValue.getCurrentJobImage(jobState.job.data[jobState.selectedImageKey])
      : null;
  } else {
    const key = `IMAGE_PROVIDER|${jobState.captureWithProvider?.toUpperCase()}|${jobState.runtimeMode.toUpperCase()}`;

    const imageName = jobState.job.data[key];
    return !!imageName ? CommonValue.getCurrentJobImage(imageName) : null;
  }
};
