import { useQuery } from "@tanstack/react-query";
import { questionService } from "./question.service";

export function useQuestionService() {
  const getQuestionsQueryResult = useQuery({
    queryKey: ["questions"],
    queryFn: questionService.getAll,
  });

  return {
    getAll: () => ({
      isGetQuestionsLoading: getQuestionsQueryResult.isLoading,
      isGetQuestionsError: getQuestionsQueryResult.isError,
      isGetQuestionsSuccess: getQuestionsQueryResult.isSuccess,
      getQuestionsResponse: getQuestionsQueryResult.data,
    }),
  };
}
