import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";

export function useUserService(
  options: {
    userId?: number;
  } = {}
) {
  const { userId } = options;
  const signUpMutation = useMutation({
    mutationFn: userService.signup,
  });

  const updateMutation = useMutation({
    mutationFn: userService.update,
  });

  const findByIdQuery = useQuery({
    queryKey: ["user_by_id", userId],
    queryFn: () => userService.findById(userId as number),
    enabled: userId === null || userId === undefined ? false : true,
  });

  return {
    signup: {
      run: signUpMutation.mutate,
      isLoading: signUpMutation.isLoading,
      isError: signUpMutation.isError,
      isSuccess: signUpMutation.isSuccess,
      response: signUpMutation.data,
    },
    update: {
      run: updateMutation.mutate,
      isLoading: updateMutation.isLoading,
      isError: updateMutation.isError,
      isSuccess: updateMutation.isSuccess,
      response: updateMutation.data,
    },
    findById: {
      isLoading: findByIdQuery.isLoading,
      isError: findByIdQuery.isError,
      isSuccess: findByIdQuery.isSuccess,
      isRefetching: findByIdQuery.isRefetching,
      response: findByIdQuery.data,
    },
  };
}
