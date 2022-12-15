export enum Route {
  HOME = "/",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
  QUIZ = "/quiz",
  EMAIL_CONFIRMATION = "/email-confirmation",
  EMAIL_VERIFIED = "/email-verified",
  PROFILE = "/profile",
  EDIT_PROFILE = "/profile/edit",
}

export enum ApiRoute {
  USER = "/users",
  CREATE_USER = "/users",
  UPDATE_USER = "/users",
  QUESTION = "/questions",
  SUBMIT_ANSWER = "/answers/submit",
  SEND_EMAIL_CONFIRMATION = "/auth/send-email-verification-link",
  VERIFY_EMAIL = "/auth/verify-email",
  SIGNIN = "/auth/signin",
  ATTEMPT = "/attempts",
  ATTEMPT_BY_USER_ID = "/attempts/user",
}
