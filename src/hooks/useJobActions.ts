import { useCallback } from 'react';

export const useJobActions = () => {
  const capture = useCallback(() => {
    // curl --location --request PUT 'https://metan.bluestone.systems/image-question-jobs/PBF_EXAM' \
    // --header 'Content-Type: application/json' \
    // --data-raw '{
    //     "error_message": null,
    //     "data": {
    //         "capture_mode": "specific",
    //         "capture_with_provider": "DirectX1",
    //     }
    // }'
  }, []);
};
