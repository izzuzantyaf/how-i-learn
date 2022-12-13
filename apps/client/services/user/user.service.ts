import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/server-response.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entity/user.entity";

export const userService = {
  signup: (createUserDto: CreateUserDto): Promise<ServerResponse<User>> =>
    fetchToServer({
      path: ApiRoute.CREATE_USER,
      method: "POST",
      body: createUserDto,
    }),
  update: (updateUserDto: UpdateUserDto): Promise<ServerResponse<User>> =>
    fetchToServer({
      path: ApiRoute.UPDATE_USER,
      method: "PATCH",
      body: updateUserDto,
    }),
  findById: (id: number): Promise<ServerResponse<User>> =>
    fetchToServer({
      path: ApiRoute.USER + `/${id}`,
      method: "GET",
    }),
};
