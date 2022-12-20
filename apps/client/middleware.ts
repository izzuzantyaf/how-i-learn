// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Route } from "./lib/constant";
import { jose } from "./lib/helpers/jose.helper";

const mustAuthenticatedRoutes = [
  Route.PROFILE,
  Route.EDIT_PROFILE,
  Route.ATTEMPT_RESULT,
];
const deniedWhenAuthenticatedRoutes = [Route.SIGNIN, Route.SIGNUP];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("request.nextUrl.pathname: ", request.nextUrl.pathname);
  console.log("request.url: ", request.url);
  const access_token = request.cookies.get("access_token")?.value as string;
  console.log("access_token: ", access_token);

  let decodedJWT;
  try {
    decodedJWT = await jose.verify(access_token);
  } catch (error) {
    console.error(error);
  }
  console.log("decodedJWT: ", decodedJWT);
  Object.assign(request, { user: decodedJWT?.payload });

  if (
    mustAuthenticatedRoutes.includes(request.nextUrl.pathname as Route) &&
    !decodedJWT
  ) {
    return NextResponse.redirect(new URL(Route.SIGNIN, request.url));
  }
  if (
    deniedWhenAuthenticatedRoutes.includes(request.nextUrl.pathname as Route) &&
    decodedJWT
  ) {
    return NextResponse.redirect(new URL(Route.PROFILE, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
