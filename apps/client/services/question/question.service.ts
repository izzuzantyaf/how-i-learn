import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/server-response.type";
import { Question } from "./question.entity";

export const questionService = {
  getAll: (): Promise<ServerResponse<Question[]>> =>
    fetchToServer({ path: ApiRoute.QUESTION }),
};
