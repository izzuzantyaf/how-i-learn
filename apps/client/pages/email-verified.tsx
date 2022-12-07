import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeIcon, Title, Text } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { ApiRoute, Route } from "../lib/constant";
import { fetchToServer } from "../lib/helpers/fetcher-to-server.helper";
import { ServerResponse } from "../lib/types/server-response.type";

type Data = {
  isVerifyEmailSuccess: boolean;
};

export const getServerSideProps: GetServerSideProps<Data> = async ({
  query,
}) => {
  const { token } = query;
  console.log("Token", token);
  // make request to server to verify email
  const response = (await fetchToServer({
    path: ApiRoute.VERIFY_EMAIL + `?token=${token}`,
    method: "PATCH",
  })) as ServerResponse;
  return {
    props: { isVerifyEmailSuccess: response.isSuccess },
  };
};

export default function EmailVerifiedPage({
  isVerifyEmailSuccess,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Email status | Presisi</title>
      </Head>
      <main className="email-confirmation-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-screen-sm">
          {isVerifyEmailSuccess ? (
            <>
              <ThemeIcon size="xl" variant="light" color="green">
                <FontAwesomeIcon icon="envelope-circle-check" size="xl" />
              </ThemeIcon>
              <Title order={3} style={{ marginTop: "8px" }}>
                Konfirmasi email berhasil
              </Title>
              <Text>
                Email kamu sudah terverifikasi{" "}
                <Link
                  href={Route.SIGNIN}
                  className="text-blue-500 hover:underline"
                >
                  klik di sini untuk login
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Text style={{ textAlign: "center" }}>
                Ada yang tidak beres!.
                <br />
                <Link
                  href={Route.HOME}
                  className="hover:underline text-blue-500"
                >
                  Klik untuk kembali ke beranda.
                </Link>
              </Text>
            </>
          )}
        </div>
      </main>
    </>
  );
}
