import { useMutation } from "@tanstack/react-query";
import { userService } from "./user.service";

export function useUserService() {
  const mutation = useMutation({
    mutationFn: userService.signup,
  });

  return {
    signup: {
      run: mutation.mutate,
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
      response: mutation.data,
    },
  };
}
