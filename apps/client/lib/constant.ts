export enum Route {
  HOME = "/",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
  QUIZ = "/quiz",
  EMAIL_CONFIRMATION = "/email-confirmation",
  EMAIL_VERIFIED = "/email-verified",
}

export enum ApiRoute {
  CREATE_USER = "/users",
  QUESTION = "/questions",
  SUBMIT_ANSWER = "/answers/submit",
  SEND_EMAIL_CONFIRMATION = "/auth/send-email-verification-link",
}
