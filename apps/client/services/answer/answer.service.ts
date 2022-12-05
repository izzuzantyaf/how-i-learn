import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";

export function useAnswerService() {
  const mutation = useMutation({
    mutationFn: (submitAnswerDto: SubmitAnswerDto) =>
      fetchToServer({
        path: ApiRoute.SUBMIT_ANSWER,
        method: "POST",
        body: submitAnswerDto,
      }),
  });
  return {
    submit: {
      submit: mutation.mutate,
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
      response: mutation.data,
    },
  };
}
