import * as joseModule from "jose";
// joseModule.
const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
export const jose = {
  verify: async (token: string) => await joseModule.jwtVerify(token, secret),
  decode: (token: string) => joseModule.decodeJwt(token),
};
