import { useQuery } from "@tanstack/react-query";
import { ApiRoute } from "../lib/constant";
import { fetchToServer } from "../lib/helpers/fetcher-to-server.helper";

function getAll() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["questions", ApiRoute.QUESTION],
    queryFn: () => fetchToServer({ path: ApiRoute.QUESTION }),
  });
  return {
    isLoading,
    isError,
    isSuccess,
    response: data,
  };
}

export function useQuestionService() {
  return {
    getAll,
  };
}
