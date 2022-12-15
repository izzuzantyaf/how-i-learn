import {
  ActionIcon,
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Head from "next/head";
import { CreateUserDto } from "../services/user/dto/create-user.dto";
import { useUserService } from "../services/user/useUserService";
import Link from "next/link";
import { Route } from "../lib/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwt } from "../lib/helpers/jwt.helper";
import { redirector } from "../lib/helpers/redirector.helper";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../lib/hooks/useToast";
import { useEffect, useMemo } from "react";

export default function SignUpPage() {
  const {
    signup: {
      run: signUp,
      isLoading: isSignUpLoading,
      isSuccess: isSignUpSuccess,
      response: signUpResponse,
    },
  } = useUserService();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const showToast = useMemo(() => useToast(), []);

  useEffect(() => {
    if (signUpResponse) {
      if (signUpResponse.isSuccess) {
        showToast.success({
          id: "signup",
          title: signUpResponse.message,
        });
        const token = jwt.sign({
          userId: signUpResponse?.data?.id,
          userEmail: signUpResponse?.data?.email,
        });
        redirector.toEmailConfirmationPage(token);
      } else {
        showToast.error({
          id: "signup",
          title: signUpResponse.message,
        });
      }
    }
  }, [showToast, signUpResponse]);

  return (
    <>
      <Head>
        <title>Buat akun | Presisi</title>
      </Head>

      <main className="signup-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-xs">
          <ActionIcon component={Link} href={Route.HOME} variant="light">
            <FontAwesomeIcon icon={faArrowLeft} />
          </ActionIcon>
          <Title order={2} style={{ marginTop: "16px" }}>
            Buat akun
          </Title>
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
            loading={isSignUpLoading || isSignUpSuccess}
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
