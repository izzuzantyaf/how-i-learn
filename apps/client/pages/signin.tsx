import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { Route } from "../lib/constant";
import { SignInDto } from "../services/auth/dto/signin.dto";
import { useAuthService } from "../services/auth/useAuthService";
import jwt from "jsonwebtoken";
import { useToast } from "../lib/hooks/useToast";
import { User } from "../services/user/entity/user.entity";
import { jose } from "../lib/helpers/jose.helper";

export default function SignInPage() {
  const {
    signIn: {
      run: signIn,
      isLoading: isSignInLoading,
      isSuccess: isSignInSuccess,
      isError: isSignInError,
      response: signInResponse,
    },
  } = useAuthService();

  const showToast = useToast();

  if (signInResponse) {
    if (signInResponse.isSuccess) {
      // if login success, grab the access token
      // check if the user is verified
      // if not verified, redirect to email confirmation page
      // if verified, store access token to cookies

      const { access_token } = signInResponse.data;
      let decodedPayload: any;
      try {
        // decode the access token
        decodedPayload = jwt.verify(
          access_token,
          process.env.NEXT_PUBLIC_JWT_SECRET as string
        );
        console.log("decodedPayload", decodedPayload);
      } catch (error) {
        console.log(error);
        return <p>Something went wrong!</p>;
      }
      if (!decodedPayload.email_confirmed) {
        const token = jose.base64url.encode(
          JSON.stringify({
            userId: decodedPayload.id,
            userEmail: decodedPayload.email,
          })
        );
        location.href =
          location.origin + Route.EMAIL_CONFIRMATION + `?token=${token}`;
        return;
      }
      location.href = location.origin + Route.PROFILE;
    } else {
      showToast.danger({
        id: "signin",
        title: signInResponse.message,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Masuk | Presisi</title>
      </Head>
      <main className="signin-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-xs">
          <ActionIcon component={Link} href={Route.HOME} variant="light">
            <FontAwesomeIcon icon="arrow-left" />
          </ActionIcon>
          <Title order={2} style={{ marginTop: "16px" }}>
            Masuk
          </Title>
          <form
            id="user_signin"
            className="flex flex-col gap-2 mt-[8px]"
            onSubmit={async event => {
              event.preventDefault();
              const form = event.target as HTMLFormElement;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData.entries());
              console.log("Sign in dto", data);
              signIn(data as SignInDto);
            }}
          >
            <TextInput
              type="email"
              label="Email"
              name="username"
              placeholder="Email"
              required
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Password"
              required
            />
          </form>
          <Button
            type="submit"
            form="user_signin"
            className="w-full mt-[16px]"
            loading={isSignInLoading}
          >
            Masuk
          </Button>
          <Text style={{ marginTop: "16px", textAlign: "center" }} fz="sm">
            Belum punya akun?.{" "}
            <Link
              href={Route.SIGNUP}
              style={{ cursor: "pointer" }}
              className="text-blue-500 hover:underline"
            >
              Buat akun
            </Link>
          </Text>
        </div>
      </main>
    </>
  );
}
