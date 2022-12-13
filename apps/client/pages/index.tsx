import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Title, Text } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Route } from "../lib/constant";
import { jwt } from "../lib/helpers/jwt.helper";
import heroPic from "../public/img/Saly-25.png";
import { User } from "../services/user/entity/user.entity";

type Data = {
  user: User;
};

export const getServerSideProps: GetServerSideProps<Data> = async ({ req }) => {
  const user = jwt.decode(req.cookies.access_token as string) as User;
  return {
    props: { user },
  };
};

export default function HomePage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Presisi</title>
      </Head>

      <header className="px-[16px] py-[16px]">
        <div className="my-container flex items-center">
          <Text
            component={Link}
            href={Route.HOME}
            className="brand text-2xl font-black"
            color="gray"
          >
            Presisi
          </Text>
          <div className="spacer grow"></div>
          {user ? (
            <Button
              component={Link}
              href={Route.PROFILE}
              variant="light"
              rightIcon={<FontAwesomeIcon icon="user" />}
            >
              {user.name.split(" ")[0]}
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                href={Route.SIGNIN}
                className="mr-[16px]"
                variant="light"
              >
                Masuk
              </Button>
              <Button component={Link} href={Route.SIGNUP}>
                Buat akun
              </Button>
            </>
          )}
        </div>
      </header>

      <section className="hero px-[16px] mt-[48px]">
        <div className="my-container grid sm:grid-cols-2 gap-12">
          <div className="headline">
            <Title className="hero-title font-black text-4xl lg:text-5xl">
              Temukan cara belajar terbaik untukmu
            </Title>
            <Text className="description mt-[24px] text-xl" color="gray">
              Sistem rekomendasi cara belajar berdasarkan model VARK menggunakan
              algoritma Certainty Factor
            </Text>
            <Link href={Route.QUIZ}>
              <Button className="mt-[32px]">Coba sekarang</Button>
            </Link>
          </div>
          <div className="illustration self-center order1">
            <Image src={heroPic} alt="Hero section image" priority></Image>
          </div>
        </div>
      </section>

      <footer className="px-[16px] mt-[64px] mb-[32px]">
        <Text className="my-container text-center" color="gray">
          Created by{" "}
          <a
            href="https://izzuzantyaf.space"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            izzuzantyaf
          </a>
        </Text>
      </footer>
    </>
  );
}
