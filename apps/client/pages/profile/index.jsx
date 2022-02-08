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
    window.location.href = window.location.origin;
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
          <>
            <div className="font-bold text-xl mt-4">Tipe gaya belajar kamu</div>
            <div className="best-learning-type font-black capitalize text-2xl lg:text-3xl text-center bg-gray-50 text-secondary py-8 rounded-lg">
              {member.bestLearningTypes
                ?.join(", ")
                .replaceAll("readWrite", "Read/write")}
            </div>

            <div className="font-bold text-xl mt-8">
              Rekomendasi cara belajar
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {member.learningMethodRecommendations?.map((lm, index) => (
                <div key={index} className="shadow rounded-lg border p-4">
                  <div className="font-bold">{lm.method}</div>
                  <div className="capitalize">
                    {lm.type == "readWrite" ? "Read/write" : lm.type}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="contained" href="/questionnaire">
              Tes ulang
            </Button>
          </>
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
