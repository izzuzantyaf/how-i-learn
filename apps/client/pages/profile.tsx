import { Button, Title } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { Route } from "../lib/constant";
import { authService } from "../services/auth/auth.service";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profil | Presisi</title>
      </Head>
      <main className="profile-page">
        <Title>Ini adalah halaman profile</Title>
        <Button component={Link} href={Route.HOME} variant="outline">
          Beranda
        </Button>
        <Button
          onClick={() => {
            authService.signOut();
            location.reload();
          }}
          variant="outline"
        >
          Keluar
        </Button>
      </main>
    </>
  );
}
