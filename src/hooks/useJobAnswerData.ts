import { useAppSelector } from '@/lib/redux/store';

export const useJobAnswerData = () => {
  const jobState = useAppSelector((state) => state.job);
  const ragAnswer = jobState.job?.data?.rag_answer || null;
  const aiAnswer = jobState.job?.data?.ai_answer || null;
  const question = jobState.job?.data?.question || null;
  const errorMessage = jobState.job?.error_message || null;
  const processMessage = jobState.job?.data?.processing_status || null;
  return {
    state: {
      question,
      ragAnswer,
      aiAnswer,
      errorMessage,
      processMessage,
    },
  };
};
