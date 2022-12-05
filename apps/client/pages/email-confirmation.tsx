import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeIcon, Title, Text, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { ApiRoute, Route } from "../lib/constant";
import { fetchToServer } from "../lib/helpers/fetcher-to-server.helper";
import { jose } from "../lib/helpers/jose.helper";
import { useAuthService } from "../services/auth/auth.service";

type Data = {
  userId: number;
  userEmail: string;
  isSuccess: boolean;
  message: string;
};

export const getServerSideProps: GetServerSideProps<Data> = async ({
  req,
  query,
}) => {
  console.log("Query", query);
  if (!query.token) {
    return {
      redirect: {
        destination: Route.HOME,
        permanent: false,
      },
    };
  }
  let decodedPayload = null;
  try {
    decodedPayload = JSON.parse(
      jose.base64url.decode((query.token as string) ?? "").toString()
    );
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: Route.HOME,
        permanent: false,
      },
    };
  }
  console.log("Payload", decodedPayload);
  const userId: number = decodedPayload?.userId;
  const userEmail: string = decodedPayload?.userEmail;
  const url = new URL(req.url as string, `https://${req.headers.host}`);
  const emailVerifyUrl = url.origin + Route.EMAIL_VERIFIED;
  console.log("Email verify url", emailVerifyUrl);
  const result = await fetchToServer({
    path: ApiRoute.SEND_EMAIL_CONFIRMATION,
    method: "POST",
    body: { userId, url: emailVerifyUrl },
  });

  return {
    props: {
      userId,
      userEmail,
      isSuccess: result.isSuccess,
      message: result.message,
    },
  };
};

export default function EmailConfirmationPage({
  userId,
  userEmail,
  isSuccess,
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    sendConfirmationEmail: {
      run: sendConfirmationEmail,
      isLoading: isSendConfirmationEmailLoading,
      isSuccess: isSendConfirmationEmailSuccess,
      isError: isSendConfirmationEmailError,
      response: sendConfirmationEmailResponse,
    },
  } = useAuthService();

  if (sendConfirmationEmailResponse) {
    showNotification({
      id: "send_confirmation_email",
      title: sendConfirmationEmailResponse.message,
      message: "",
      color: sendConfirmationEmailResponse.isSuccess ? "green" : "red",
      icon: sendConfirmationEmailResponse.isSuccess ? (
        <FontAwesomeIcon icon="check" />
      ) : (
        <FontAwesomeIcon icon="xmark" />
      ),
    });
  }

  return (
    <>
      <Head>
        <title>Konfirmasi Email | Presisi</title>
      </Head>
      <main className="email-confirmation-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-screen-sm">
          <ThemeIcon size="xl" variant="light">
            <FontAwesomeIcon icon="envelope" size="xl" />
          </ThemeIcon>
          <Title order={3} style={{ marginTop: "8px" }}>
            Konfirmasi Email
          </Title>
          <Text>
            Link verifikasi email sudah dikirimkan ke email kamu{" "}
            <b>{userEmail}</b>. Jika email sudah terverifikasi kamu bisa{" "}
            <Link href={Route.SIGNIN} className="text-blue-500 hover:underline">
              klik di sini untuk login
            </Link>
            . Jika tidak ada email masuk klik tombol di bawah untuk mengirim
            ulang.
          </Text>
          <Button
            variant="outline"
            style={{ marginTop: "16px" }}
            loading={isSendConfirmationEmailLoading}
            onClick={() => {
              sendConfirmationEmail(userId);
            }}
          >
            Kirim Ulang
          </Button>
        </div>
      </main>
    </>
  );
}
