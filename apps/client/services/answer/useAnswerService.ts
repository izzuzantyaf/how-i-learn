import { useMutation } from "@tanstack/react-query";
import { answerService } from "./answer.service";

export function useAnswerService() {
  const submitMutation = useMutation({
    mutationFn: answerService.submit,
  });
  return {
    submit: {
      submit: submitMutation.mutate,
      isLoading: submitMutation.isLoading,
      isError: submitMutation.isError,
      isSuccess: submitMutation.isSuccess,
      response: submitMutation.data,
    },
  };
}
