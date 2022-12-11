// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Route } from "./lib/constant";
import { jose } from "./lib/helpers/jose.helper";

const mustAuthenticatedRoutes = [Route.PROFILE];
const deniedWhenAuthenticatedRoutes = [Route.SIGNIN, Route.SIGNUP];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("request.nextUrl.pathname: ", request.nextUrl.pathname);
  console.log("request.url: ", request.url);
  const access_token = request.cookies.get("access_token")?.value as string;
  console.log("access_token: ", access_token);
  if (
    mustAuthenticatedRoutes.includes(request.nextUrl.pathname as Route) &&
    !access_token
  ) {
    return NextResponse.redirect(new URL(Route.HOME, request.url));
  }
  if (
    deniedWhenAuthenticatedRoutes.includes(request.nextUrl.pathname as Route) &&
    access_token
  ) {
    return NextResponse.redirect(new URL(Route.PROFILE, request.url));
  }

  let decodedJWT;
  try {
    decodedJWT = await jose.verify(access_token);
  } catch (error) {
    console.error(error);
  }
  console.log("decodedJWT: ", decodedJWT);
  Object.assign(request, { user: decodedJWT?.payload });
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
