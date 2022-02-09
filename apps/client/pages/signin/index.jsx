import Head from "next/head";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useLocalStorage from "../../hooks/useLocalStorage";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postSignInResponse, setPostSignInResponse] = useState(null);
  const [canSubmit, setCanSubmit] = useState(true);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const [member, setMember] = useLocalStorage("member", {});

  useEffect(() => {
    if (window.localStorage.getItem("member")) {
      window.location.href = window.location.origin + "/profile";
    }
  }, []);

  useEffect(() => {
    if (postSignInResponse) setIsSnackBarOpen(true);
  }, [postSignInResponse]);

  const signIn = async payload => {
    return await fetch(process.env.NEXT_PUBLIC_API_BASEURL + "/signin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .catch(err => err);
  };

  return (
    <>
      <Head>
        <title>Masuk | Presisi</title>
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

          {/* form buat input email dan password */}
          <div className="flex flex-col gap-4 grow self-center justify-center max-w-xs">
            <div className="text-2xl font-bold">Masuk</div>
            <form action="" method="POST" className="flex flex-col gap-4">
              <TextField
                required
                size="small"
                id="outlined-required"
                type="email"
                label="Email"
                color="secondary"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                required
                size="small"
                id="outlined-password-input"
                label="Password"
                type="password"
                color="secondary"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              {/* button masuk */}
              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit}
                onClick={async e => {
                  e.preventDefault();
                  setCanSubmit(false);
                  await signIn({ email, password })
                    .then(res => {
                      setPostSignInResponse(res);
                      if (res.type === "success") {
                        setMember(res.member);
                        window.location.href =
                          window.location.origin + "/profile";
                      }
                    })
                    .catch(err => console.error(err));
                  setCanSubmit(true);
                }}
              >
                {canSubmit ? (
                  "Masuk"
                ) : (
                  <CircularProgress color="inherit" size="1.5rem" />
                )}
              </Button>
            </form>

            <Snackbar
              open={isSnackBarOpen}
              autoHideDuration={3000}
              onClose={() => {
                setIsSnackBarOpen(false);
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                severity={postSignInResponse?.type ?? "error"}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {postSignInResponse?.message}
              </Alert>
            </Snackbar>

            <p className="text-xs self-center">
              Belum punya akun?.{" "}
              <a href="/signup" className="text-secondary">
                Daftar di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
