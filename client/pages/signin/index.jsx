import Head from 'next/head'
import { Button, IconButton, TextField } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function SignIn() {

  return <>
    <Head>
      <title>Masuk | Presisi</title>
      <meta name="description" content="Rekomendasi cara belajar berdasarkan model VARK" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="py-8 h-screen">
      <div className="container h-full mx-auto px-6 flex flex-col gap-4">
        {/* icon back */}
        <IconButton href="/" sx={{ alignSelf: 'flex-start' }}>
          <ArrowBackIcon />
        </IconButton>
        {/* form buat input email dan password */}
        <div className="flex flex-col gap-4 flex-grow self-center justify-center max-w-xs">
          <div className="text-2xl font-bold">Masuk</div>
          <form action="" method="post" className="flex flex-col gap-4">
            <TextField
              required
              size="small"
              id="outlined-required"
              type="email"
              label="Email"
              color="secondary"
            />
            <TextField
              required
              size="small"
              id="outlined-password-input"
              label="Password"
              type="password"
              color="secondary"
            />
            {/* button masuk */}
            <Button
              type="submit"
              variant="contained"
            >
              Masuk
            </Button>
          </form>
          <p className="text-xs self-center">Belum punya akun?. <a href="/signup" className="text-secondary">Daftar di sini</a></p>
        </div>
      </div>
    </div>
  </>
}