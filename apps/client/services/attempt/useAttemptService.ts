import { useQuery } from "@tanstack/react-query";
import { attemptService } from "./attempt.service";

export function useAttemptService({ userId }: { userId: number }) {
  const attemptByUserIdQuery = useQuery({
    queryKey: ["attempts_by_user_id", attemptService.findByUserId, userId],
    queryFn: () => attemptService.findByUserId(userId),
  });

  return {
    findByUserId: {
      isLoading: attemptByUserIdQuery.isLoading,
      isError: attemptByUserIdQuery.isError,
      isSuccess: attemptByUserIdQuery.isSuccess,
      response: attemptByUserIdQuery.data,
    },
  };
}
