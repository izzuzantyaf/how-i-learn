import { Button, Container } from "@mantine/core";
import Head from "next/head";

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

      <main>
        <header className="px-[16px] py-[16px]">
          <div className="container mx-auto flex items-center">
            <h1 className="text-3xl font-bold">Presisi</h1>
            <div className="spacer grow"></div>
            <Button
              sx={{
                marginRight: 16,
              }}
            >
              Masuk
            </Button>
            <Button variant="outline">Buat akun</Button>
          </div>
        </header>
        <section className="hero">
          <div className="headline"></div>
        </section>
      </main>
    </>
  );
}
