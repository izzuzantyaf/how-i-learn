import { Button } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import heroPic from "../public/img/Saly-25.png";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berbasis metode VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-[16px] py-[16px]">
        <div className="my-container flex items-center">
          <h1 className="text-2xl font-medium">Presisi</h1>
          <div className="spacer grow"></div>
          <Button className="mr-[16px]" variant="outline">
            Masuk
          </Button>
          <Button>Buat akun</Button>
        </div>
      </header>

      <section className="hero px-[16px] mt-[48px]">
        <div className="my-container grid sm:grid-cols-2 gap-4">
          <div className="headline ">
            <h1 className="hero-title font-extrabold text-4xl md:text-5xl">
              Temukan cara belajar terbaik untukmu
            </h1>
            <p className="description mt-[24px] text-gray-500 text-xl">
              Sistem rekomendasi cara belajar berdasarkan model VARK menggunakan
              algoritma Certainty Factor
            </p>
            <Button className="mt-[32px]">Coba sekarang</Button>
          </div>
          <div className="illustration hidden sm:block self-center">
            <Image src={heroPic} alt="Hero section image"></Image>
          </div>
        </div>
      </section>

      <footer className="px-[16px] mt-[64px]">
        <div className="my-container text-center text-gray-500">
          Created by{" "}
          <a
            href="https://izzuzantyaf.space"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            izzuzantyaf
          </a>
        </div>
      </footer>
    </>
  );
}
