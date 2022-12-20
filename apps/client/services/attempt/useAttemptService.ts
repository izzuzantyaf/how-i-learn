import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { attemptService } from "./attempt.service";

export function useAttemptService(
  props: { userId?: number; attemptId?: number } = {}
) {
  const { userId, attemptId } = props;
  const queryClient = useQueryClient();

  const attemptByUserIdQuery = useQuery({
    queryKey: ["attempts_by_user_id", attemptService.findByUserId, userId],
    queryFn: () => attemptService.findByUserId(userId as number),
    enabled: userId === null || userId === undefined ? false : true,
  });

  const attemptByIdQuery = useQuery({
    queryKey: ["attempt_by_id", attemptService.findById, attemptId],
    queryFn: () => attemptService.findById(attemptId as number),
    enabled: attemptId === null || attemptId === undefined ? false : true,
  });

  // delete attempt mutation
  const deleteAttemptMutation = useMutation({
    mutationFn: (id: number) => attemptService.deleteById(id),
  });

  return {
    findById: {
      isLoading: attemptByIdQuery.isLoading,
      isError: attemptByIdQuery.isError,
      isSuccess: attemptByIdQuery.isSuccess,
      isFetching: attemptByIdQuery.isFetching,
      isRefetching: attemptByIdQuery.isRefetching,
      response: attemptByIdQuery.data,
    },
    findByUserId: {
      isLoading: attemptByUserIdQuery.isLoading,
      isError: attemptByUserIdQuery.isError,
      isSuccess: attemptByUserIdQuery.isSuccess,
      isFetching: attemptByUserIdQuery.isFetching,
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
