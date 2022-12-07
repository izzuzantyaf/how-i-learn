import { ApiRoute, Route } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";

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
};
