import { useMutation } from "@tanstack/react-query";
import { ApiRoute, Route } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/server-response.type";

export function useAuthService() {
  const sendConfirmationEmailMutation = useMutation({
    mutationFn: (userId: number) =>
      fetchToServer({
        path: ApiRoute.SEND_EMAIL_CONFIRMATION,
        method: "POST",
        body: {
          userId,
          url: location.origin + Route.EMAIL_VERIFIED,
        },
      }),
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) =>
      fetchToServer({
        path: ApiRoute.VERIFY_EMAIL + `?token=${token}`,
        method: "PATCH",
      }),
  });

  return {
    sendConfirmationEmail: {
      run: sendConfirmationEmailMutation.mutate,
      isLoading: sendConfirmationEmailMutation.isLoading,
      isError: sendConfirmationEmailMutation.isError,
      isSuccess: sendConfirmationEmailMutation.isSuccess,
      response: sendConfirmationEmailMutation.data as ServerResponse,
    },
    verifyEmail: {
      run: verifyEmailMutation.mutate,
      isLoading: verifyEmailMutation.isLoading,
      isError: verifyEmailMutation.isError,
      isSuccess: verifyEmailMutation.isSuccess,
      response: verifyEmailMutation.data as ServerResponse,
    },
  };
}
