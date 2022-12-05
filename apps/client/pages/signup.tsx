import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import Head from "next/head";
import { CreateUserDto } from "../services/user/dto/create-user.dto";
import { useUserService } from "../services/user/user.service";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { Route } from "../lib/constant";

export default function SignUpPage() {
  const {
    signup: {
      run: signUp,
      isLoading: isSignUpLoading,
      response: signUpResponse,
    },
  } = useUserService();

  if (signUpResponse) {
    showNotification({
      id: "signup",
      title: signUpResponse.message,
      message: "",
      color: signUpResponse.isSuccess ? "green" : "red",
    });
  }

  return (
    <>
      <Head>
        <title>Buat akun | Presisi</title>
      </Head>

      <main className="signup-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-xs">
          <h1 className="text-2xl font-bold">Buat akun</h1>
          <form
            id="user_signup"
            className="flex flex-col gap-2 mt-[8px]"
            onSubmit={async event => {
              event.preventDefault();
              const form = event.target as HTMLFormElement;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData.entries());
              console.log("CreateUserDto", data);
              signUp(data as CreateUserDto);
            }}
          >
            <TextInput
              label="Nama"
              name="name"
              placeholder="Nama kamu"
              error={signUpResponse?.errors?.name}
              required
            />
            <TextInput
              type="email"
              label="Email"
              name="email"
              placeholder="Email yang aktif"
              error={signUpResponse?.errors?.email}
              required
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Password"
              error={signUpResponse?.errors?.password}
              required
            />
          </form>
          <Button
            type="submit"
            form="user_signup"
            className="w-full mt-[16px]"
            loading={isSignUpLoading}
          >
            Buat akun
          </Button>
          <Text style={{ marginTop: "16px", textAlign: "center" }} fz="sm">
            Sudah punya akun?.{" "}
            <Link
              href={Route.SIGNIN}
              style={{ cursor: "pointer" }}
              className="text-blue-500 hover:underline"
            >
              Masuk
            </Link>
          </Text>
        </div>
      </main>
    </>
  );
}
