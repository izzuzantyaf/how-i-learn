import Head from "next/head";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Buat akun | Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berdasarkan model VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-8 h-screen">
        <div className="container h-full mx-auto px-6 flex flex-col gap-4">
          {/* icon back */}
          <IconButton href="/" sx={{ alignSelf: "flex-start" }}>
            <ArrowBack />
          </IconButton>
          {/* form buat input nama, email, dan password */}
          <div className="flex flex-col gap-4 grow self-center justify-center max-w-xs">
            <div className="text-2xl font-bold">Buat akun</div>
            <form action="" method="POST" className="flex flex-col gap-4">
              <TextField
                required
                name="name"
                size="small"
                id="outlined-required"
                type="text"
                label="Nama"
                color="secondary"
              />
              <TextField
                required
                name="email"
                size="small"
                id="outlined-required"
                type="email"
                label="Email"
                color="secondary"
              />
              <TextField
                required
                name="password"
                size="small"
                id="outlined-password-input"
                label="Password"
                type="password"
                color="secondary"
              />
              <TextField
                required
                name="passwordConfirm"
                size="small"
                id="outlined-password-input"
                label="Ketik ulang password"
                type="password"
                color="secondary"
              />
              {/* button masuk */}
              <Button
                type="submit"
                variant="contained"
                onClick={(e) => e.preventDefault()}
              >
                Daftar
              </Button>
            </form>
            <p className="text-xs self-center">
              Sudah punya akun?.{" "}
              <a href="/signin" className="text-secondary">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
