import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/server-response.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";

export const userService = {
  signup: (createUserDto: CreateUserDto): Promise<ServerResponse<User>> =>
    fetchToServer({
      path: ApiRoute.CREATE_USER,
      method: "POST",
      body: createUserDto,
    }),
};
