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

export default function SignInPage() {
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
              console.log("CreateUserDto", data);
              // signUp(data as CreateUserDto);
            }}
          >
            <TextInput
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              // error={signInResponse?.errors?.email}
              required
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Password"
              // error={signInResponse?.errors?.password}
              required
            />
          </form>
          <Button
            type="submit"
            form="user_signin"
            className="w-full mt-[16px]"
            // loading={isSignInLoading}
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
