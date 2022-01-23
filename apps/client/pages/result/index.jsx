import Head from "next/head";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
// import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

export default function Result() {
  const [result, setResult] = useState({});

  useEffect(() => {
    // jika tidak ada data hasil di local storage maka redirect ke home
    if (localStorage.getItem("result") == null)
      window.location.href = window.location.origin;
    // jika ada data hasil di local storage maka set result state
    else setResult(JSON.parse(localStorage.getItem("result")));
  }, []);

  return (
    <>
      <Head>
        <title>Hasil | Presisi</title>
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
        {/* <Dialogue /> */}

        <div className="font-bold text-xl">Tipe gaya belajar kamu</div>
        <div className="best-learning-type font-black capitalize text-2xl lg:text-3xl text-center bg-gray-50 text-secondary py-8 rounded-lg">
          {result.bestLearningTypes
            ?.join(", ")
            .replaceAll("readWrite", "Read/write")}
        </div>

        <div className="font-bold text-xl mt-8">Rekomendasi cara belajar</div>
        <div className="grid md:grid-cols-2 gap-4">
          {result.learningMethodRecommendations?.map((lm, index) => (
            <div key={index} className="shadow rounded-lg border p-4">
              <div className="font-bold">{lm.method}</div>
              <div className="capitalize">
                {lm.type == "readWrite" ? "Read/write" : lm.type}
              </div>
            </div>
          ))}
        </div>

        <Button href="/" variant="contained" startIcon={<ArrowBack />}>
          Kembali ke home
        </Button>
      </Container>
    </>
  );
}

// function Dialogue() {
//   const [isDialogueOpen, setIsDialogueOpen] = useState(true);

//   const closeDialogue = () => setIsDialogueOpen(false);

//   return (
//     <Dialog
//       open={isDialogueOpen}
//       // onClose={handleClose}
//       // onBackdropClick={() => {}}
//       // maxWidth="xs"
//     >
//       {/* <DialogTitle sx={{ fontWeight: "bold" }}>Data responden</DialogTitle> */}
//       <DialogContent
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1rem",
//         }}
//       >
//         <div>
//           Minta tolong juga untuk isi Google Form buat beta testing ya teman2,
//           thank you
//         </div>

//         <Button
//           href="https://forms.gle/9AHUJt2FhPQWqLLu9"
//           target="_blank"
//           rel="noopener noreferrer"
//           variant="contained"
//           endIcon={<OpenInNewOutlinedIcon />}
//           onClick={() => {
//             closeDialogue();
//           }}
//           sx={{
//             alignSelf: "end",
//           }}
//         >
//           Form beta testing
//         </Button>
//       </DialogContent>
//       {/* <DialogActions>
//         <Button
//           variant="contained"
//           onClick={() => {
//             closeDialogue();
//             respondent.current.name = name;
//             respondent.current.university = university;
//             respondent.current.major = major;
//             respondent.current.age = age;
//           }}
//           disabled={name == "" || major == "" || age == null ? true : false}
//         >
//           OK
//         </Button>
//       </DialogActions> */}
//     </Dialog>
//   );
// }
