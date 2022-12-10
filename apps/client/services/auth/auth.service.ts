import { ApiRoute, Route } from "../../lib/constant";
import { removeAccessTokenFromCookie } from "../../lib/helpers/cookie.helper";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/server-response.type";
import { SignInDto } from "./dto/signin.dto";

export const authService = {
  sendConfirmationEmailFromServer: async (userId: number, host: string) => {
    const protocol =
      host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
        ? "http"
        : "https";
    const origin = `${protocol}://${host}`;
    console.log("origin", origin);

    return await fetchToServer({
      path: ApiRoute.SEND_EMAIL_CONFIRMATION,
      method: "POST",
      body: {
        userId,
        url: origin + Route.EMAIL_VERIFIED,
      },
    });
  },
  sendConfirmationEmailFromBrowser: (userId: number) =>
    fetchToServer({
      path: ApiRoute.SEND_EMAIL_CONFIRMATION,
      method: "POST",
      body: {
        userId,
        url: origin + Route.EMAIL_VERIFIED,
      },
    }),
  verifyEmail: (token: string) =>
    fetchToServer({
      path: ApiRoute.VERIFY_EMAIL + `?token=${token}`,
      method: "PATCH",
    }),
  signIn: ({
    username,
    password,
  }: SignInDto): Promise<ServerResponse<{ access_token: string }>> =>
    fetchToServer({
      path: ApiRoute.SIGNIN,
      method: "POST",
      body: {
        username,
        password,
      },
    }),
  signOut: () => {
    removeAccessTokenFromCookie();
  },
};
