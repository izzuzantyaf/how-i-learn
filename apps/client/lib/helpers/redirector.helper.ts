import { Route } from "../constant";

export const redirector = {
  to: (route: Route) => {
    location.href = location.origin + route;
  },
  toHomePage: () => {
    location.href = location.origin + Route.HOME;
  },
  toLoginPage: () => {
    location.href = location.origin + Route.SIGNIN;
  },
  toRegisterPage: () => {
    location.href = location.origin + Route.SIGNUP;
  },
  toProfilePage: () => {
    location.href = location.origin + Route.PROFILE;
  },
  toQuizPage: () => {
    location.href = location.origin + Route.QUIZ;
  },
  toEmailConfirmationPage: (token: string) => {
    location.href =
      location.origin + Route.EMAIL_CONFIRMATION + `?token=${token}`;
  },
};
