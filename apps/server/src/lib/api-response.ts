interface ServerResponse {
  isSuccess: boolean;
  message: string;
  data?: any;
  errors?: any;
}

export class SuccessfulResponse implements ServerResponse {
  isSuccess = true;
  // message: string;
  // data: any;

  constructor(public message: string = 'Sukses', public data?: any) {
    // this.message = message;
    // this.data = data;
  }
}

export class ErrorResponse implements ServerResponse {
  isSuccess = false;

  constructor(public message: string = 'Gagal', public errors?: any) {}
}
