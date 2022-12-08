import { Title } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { Route } from "../lib/constant";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profil | Presisi</title>
      </Head>
      <main className="profile-page">
        <Title>Ini adalah halaman profile</Title>
        <Link href={Route.HOME}>Ke beranda</Link>
      </main>
    </>
  );
}
