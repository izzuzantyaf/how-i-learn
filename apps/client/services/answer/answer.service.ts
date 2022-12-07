import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";

export const answerService = {
  submit: (submitAnswerDto: SubmitAnswerDto) =>
    fetchToServer({
      path: ApiRoute.SUBMIT_ANSWER,
      method: "POST",
      body: submitAnswerDto,
    }),
};
