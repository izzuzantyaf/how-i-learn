import jsonwebtoken from "jsonwebtoken";
export const jwt = {
  sign: (payload: string | object | Buffer) =>
    jsonwebtoken.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET as string),
  decode: (token: string) => jsonwebtoken.decode(token),
  verify: (token: string) =>
    jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string),
};
