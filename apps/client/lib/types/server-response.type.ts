export type ServerResponse<ResponseDataType = any> = {
  isSuccess: boolean;
  message: string;
  data: ResponseDataType;
  errors: ResponseDataType;
};
