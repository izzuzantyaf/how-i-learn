import { useQuery } from "@tanstack/react-query";
import { ApiRoute } from "../lib/constant";
import { fetchToServer } from "../lib/helpers/fetcher-to-server.helper";

function getAll() {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchToServer({ path: ApiRoute.QUESTION }),
  });
  return { isLoading, isError, isSuccess, data };
}
export function useQuestionService() {
  return {
    getAll,
  };
}
