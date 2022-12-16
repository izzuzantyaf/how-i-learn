import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { attemptService } from "./attempt.service";

export function useAttemptService({ userId }: { userId: number }) {
  const queryClient = useQueryClient();

  const attemptByUserIdQuery = useQuery({
    queryKey: ["attempts_by_user_id", attemptService.findByUserId, userId],
    queryFn: () => attemptService.findByUserId(userId),
    enabled: userId ? true : false,
  });

  // delete attempt mutation
  const deleteAttemptMutation = useMutation({
    mutationFn: (id: number) => attemptService.deleteById(id),
  });

  return {
    findByUserId: {
      isLoading: attemptByUserIdQuery.isLoading,
      isError: attemptByUserIdQuery.isError,
      isSuccess: attemptByUserIdQuery.isSuccess,
      isRefetching: attemptByUserIdQuery.isRefetching,
      response: attemptByUserIdQuery.data,
    },
    deleteById: {
      isDeleteAttemptByIdLoading: deleteAttemptMutation.isLoading,
      isDeleteAttemptByIdError: deleteAttemptMutation.isError,
      isDeleteAttemptByIdSuccess: deleteAttemptMutation.isSuccess,
      deleteAttemptByIdResponse: deleteAttemptMutation.data,
      deleteAttemptById: deleteAttemptMutation.mutate,
    },
    invalidateAttemptHistory: () => {
      queryClient.invalidateQueries({
        queryKey: ["attempts_by_user_id"],
      });
    },
  };
}
