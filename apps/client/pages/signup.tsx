import { Button, PasswordInput, TextInput } from "@mantine/core";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Buat akun | Presisi</title>
      </Head>

      <main className="signup-page px-[16px] min-h-screen flex flex-col justify-center">
        <div className="my-container max-w-xs">
          <h1 className="text-2xl font-bold">Buat akun</h1>
          <form id="user_signup" className="flex flex-col gap-2 mt-[8px]">
            <TextInput
              label="Nama"
              name="name"
              placeholder="Nama kamu"
              required
            />
            <TextInput
              type="email"
              label="Email"
              name="email"
              placeholder="Email yang aktif"
              required
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Password"
              required
            />
          </form>
          <Button form="user_signup" className="w-full mt-[16px]">
            Buat akun
          </Button>
        </div>
      </main>
    </>
  );
}
