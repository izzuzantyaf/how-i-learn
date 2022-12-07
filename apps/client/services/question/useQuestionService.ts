import { useQuery } from "@tanstack/react-query";
import { ApiRoute } from "../../lib/constant";
import { questionService } from "./question.service";

export function useQuestionService() {
  const getQuestionsQueryResult = useQuery({
    queryKey: ["questions", ApiRoute.QUESTION],
    queryFn: questionService.getAll,
  });

  return {
    getAll: () => ({
      isLoading: getQuestionsQueryResult.isLoading,
      isError: getQuestionsQueryResult.isError,
      isSuccess: getQuestionsQueryResult.isSuccess,
      response: getQuestionsQueryResult.data,
    }),
  };
}
