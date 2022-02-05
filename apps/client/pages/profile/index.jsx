import Head from "next/head";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useEffect, useState } from "react";

export default function Profile() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (!window.localStorage.getItem("member")) {
      window.location.href = window.location.origin + "/signin";
    } else {
      setMember(JSON.parse(window.localStorage.getItem("member")));
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("member");
    window.location.href = window.location.origin + "/signin";
  };

  return (
    <>
      <Head>
        <title>Profil | Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berdasarkan model VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minHeight: "100vh",
          paddingY: "1.5rem",
        }}
      >
        <div className="flex justify-end gap-4">
          <Button
            variant="contained"
            href="/profile/edit"
            startIcon={<EditOutlined />}
            sx={{ alignSelf: "end" }}
          >
            Edit profil
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={logout}
            endIcon={<LogoutOutlined />}
            sx={{ alignSelf: "end" }}
          >
            Keluar
          </Button>
        </div>

        <div className="text-3xl md:text-4xl font-black">
          Halo, {member?.name}
        </div>

        {member?.bestLearningTypes && member?.learningMethodRecommendations ? (
          <div>ada</div>
        ) : (
          <div>
            Kamu belum punya rekomendasi cara belajar,{" "}
            <a href="/questionnaire" className="text-blue-500">
              klik di sini
            </a>{" "}
            untuk mendapatkannya
          </div>
        )}
      </Container>
    </>
  );
}
