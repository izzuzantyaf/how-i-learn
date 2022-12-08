import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeIcon, Title, Text, Button } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { Route } from "../lib/constant";
import { jwt } from "../lib/helpers/jwt.helper";
import { useToast } from "../lib/hooks/useToast";
import { authService } from "../services/auth/auth.service";
import { useAuthService } from "../services/auth/useAuthService";

type Data = {
  userId: number;
  userEmail: string;
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
  let decodedPayload;
  try {
    decodedPayload = jwt.verify(query.token as string) as {
      userId: number;
      userEmail: string;
    };
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
  const result = await authService.sendConfirmationEmailFromServer(
    userId,
    req.headers.host as string
  );
  if (!result.isSuccess)
    return {
      redirect: {
        destination: Route.HOME,
        permanent: false,
      },
    };

  return {
    props: {
      userId,
      userEmail,
    },
  };
};

export default function EmailConfirmationPage({
  userId,
  userEmail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    sendConfirmationEmail: {
      run: sendConfirmationEmail,
      isLoading: isSendConfirmationEmailLoading,
      response: sendConfirmationEmailResponse,
    },
  } = useAuthService();

  const showToast = useToast();

  if (sendConfirmationEmailResponse) {
    if (sendConfirmationEmailResponse.isSuccess) {
      showToast.success({
        id: "send_confirmation_email",
        title: sendConfirmationEmailResponse.message,
        message: "",
      });
    } else {
      showToast.error({
        id: "send_confirmation_email",
        title: sendConfirmationEmailResponse.message,
        message: "",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Konfirmasi Email | Presisi</title>
      </Head>
      <main className="email-confirmation-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-screen-sm">
          <ThemeIcon
            variant="light"
            style={{
              width: "min-content",
              height: "min-content",
              padding: "8px",
            }}
          >
            <FontAwesomeIcon icon="envelope" size="2xl" />
          </ThemeIcon>
          <Title order={3} style={{ marginTop: "8px" }}>
            Konfirmasi Email
          </Title>
          <Text>
            Klik link verifikasi email sudah dikirimkan ke email kamu{" "}
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
