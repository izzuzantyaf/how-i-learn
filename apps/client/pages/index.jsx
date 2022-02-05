import Head from "next/head";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AssignmentTurnedInOutlined from "@mui/icons-material/AssignmentTurnedInOutlined";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import PermIdentityOutlined from "@mui/icons-material/PermIdentityOutlined";
import { useState, useEffect } from "react";

export default function Home() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("member")) {
      setMember(JSON.parse(window.localStorage.getItem("member")));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berdasarkan model VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="pt-8 bg-gray-100">
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
            className="brand"
          >
            Presisi
          </Typography>
          {member ? (
            <Button
              href="/profile"
              color="black"
              variant="text"
              startIcon={<PermIdentityOutlined />}
              sx={{ flexShrink: 0 }}
            >
              Profil
            </Button>
          ) : (
            <>
              <Button href="/signin" variant="contained" sx={{ flexShrink: 0 }}>
                Masuk
              </Button>
              <Button
                href="/signup"
                color="black"
                variant="outlined"
                sx={{ flexShrink: 0 }}
              >
                Buat akun
              </Button>
            </>
          )}
        </Container>
      </nav>

      <div
        className="hero bg-gray-100 pb-32"
        style={{ borderRadius: "0 0 48px 48px" }}
      >
        <Container>
          <p className="font-black w-5/6 text-4xl sm:text-5xl pt-16">
            Temukan cara belajar kamu
          </p>
          <p className="pt-8 w-5/6 sm:text-2xl">
            Sistem rekomendasi cara belajar berdasarkan model VARK menggunakan
            algoritma Certainty Factor
          </p>
          <Button
            href="/questionnaire"
            variant="contained"
            sx={{ marginTop: "2rem" }}
          >
            Coba sekarang
          </Button>
        </Container>
      </div>

      <main>
        <Container>
          <div className="flow-card bg-white py-8 px-4 rounded-2xl shadow-lg flex justify-around items-center relative -top-16 max-w-3xl mx-auto">
            <div className="flow-item space-y-2 text-center">
              <AssignmentTurnedInOutlined color="secondary" fontSize="large" />
              <p className="text-xs md:text-lg">Isi kuesioner</p>
            </div>
            <div className="flow-item space-y-2 text-center">
              <ExtensionOutlined color="secondary" fontSize="large" />
              <p className="text-xs md:text-lg">Tipe gaya belajar</p>
            </div>
            <div className="flow-item space-y-2 text-center">
              <VerifiedOutlined color="secondary" fontSize="large" />
              <p className="text-xs md:text-lg">Cara belajar</p>
            </div>
          </div>

          {/* <Box className="flow-card-item text-2xl sm:text-3xl lg:text-4xl font-bold">
          Jawab beberapa pertanyaan
        </Box>
        <Box className="flow-card-item text-2xl sm:text-3xl lg:text-4xl font-bold">
          Ketahui tipe gaya belajar kamu
        </Box>
        <Box className="flow-card-item text-2xl sm:text-3xl lg:text-4xl font-bold">
          Dapatkan rekomendasi cara belajar
        </Box> */}
        </Container>
      </main>
    </>
  );
}
