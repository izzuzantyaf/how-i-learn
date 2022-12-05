import { useQuery } from "@tanstack/react-query";
import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";

export function useQuestionService() {
  const getQuestionsQueryResult = useQuery({
    queryKey: ["questions", ApiRoute.QUESTION],
    queryFn: () => fetchToServer({ path: ApiRoute.QUESTION }),
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
