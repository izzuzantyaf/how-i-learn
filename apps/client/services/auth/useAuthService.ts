import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";

export function useAuthService() {
  const sendConfirmationEmailMutation = useMutation({
    mutationFn: authService.sendConfirmationEmailFromBrowser,
  });

  const verifyEmailMutation = useMutation({
    mutationFn: authService.verifyEmail,
  });

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
  });

  return {
    sendConfirmationEmail: {
      run: sendConfirmationEmailMutation.mutate,
      isLoading: sendConfirmationEmailMutation.isLoading,
      isError: sendConfirmationEmailMutation.isError,
      isSuccess: sendConfirmationEmailMutation.isSuccess,
      response: sendConfirmationEmailMutation.data,
    },
    verifyEmail: {
      run: verifyEmailMutation.mutate,
      isLoading: verifyEmailMutation.isLoading,
      isError: verifyEmailMutation.isError,
      isSuccess: verifyEmailMutation.isSuccess,
      response: verifyEmailMutation.data,
    },
    signIn: {
      run: signInMutation.mutate,
      isLoading: signInMutation.isLoading,
      isError: signInMutation.isError,
      isSuccess: signInMutation.isSuccess,
      response: signInMutation.data,
    },
  };
}
