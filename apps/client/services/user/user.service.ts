import { useMutation } from "@tanstack/react-query";
import { ApiRoute } from "../../lib/constant";
import { fetchToServer } from "../../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../../lib/types/response.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";

export function useUserService() {
  const mutation = useMutation({
    mutationFn: (createUserDto: CreateUserDto) =>
      fetchToServer({
        path: ApiRoute.CREATE_USER,
        method: "POST",
        body: createUserDto,
      }),
  });

  return {
    signup: {
      run: mutation.mutate,
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
      response: mutation.data as ServerResponse<User>,
    },
  };
}
