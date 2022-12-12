import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/server-response.type";
import { Attempt } from "./entities/attempt.entity";

export const attemptService = {
  findByUserId: (userId: number) =>
    fetchToServer({
      path: ApiRoute.ATTEMPT_BY_USER_ID + `/${userId}`,
      method: "GET",
    }) as Promise<ServerResponse<Attempt[]>>,
};
