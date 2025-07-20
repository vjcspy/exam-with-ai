import { useAppSelector } from '@/lib/redux/store';
import { CommonValue } from '@/lib/values/common.value';

export const useCurrentImage = () => {
  const jobState = useAppSelector((state) => state.job);

  if (!jobState.job) {
    return {};
  }
  let imageName: null | string;
  let imageUrl: null | string;

  if (jobState.selectedImageKey != null) {
    imageName = jobState.job.data[jobState.selectedImageKey];
    imageUrl = !!imageName ? CommonValue.getCurrentJobImage(imageName) : null;
  } else {
    const key = `IMAGE_PROVIDER|${jobState.captureWithProvider?.toUpperCase()}|${jobState.runtimeMode.toUpperCase()}`;
    imageName = jobState.job.data[key];
    imageUrl = !!imageName ? CommonValue.getCurrentJobImage(imageName) : null;
  }
  return { imageName, imageUrl };
};
