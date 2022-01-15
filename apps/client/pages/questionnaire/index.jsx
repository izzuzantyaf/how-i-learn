import Head from "next/head";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
// import IconButton from "@mui/material/IconButton";
// import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import Close from "@mui/icons-material/Close";
// import ArrowForward from "@mui/icons-material/ArrowForward";
// import ArrowBack from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useRef } from "react";
// import CheckBoxOutlineBlankOutlined from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
// import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined'

// mengambil data dari server, dilakukan hanya pada saat build
export async function getStaticProps(ctx) {
  const questionnaire = await fetch(
    process.env.NEXT_PUBLIC_API_BASEURL + "/questionnaires"
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return {
    props: {
      questionnaire,
      sliderMarks: [
        {
          value: 0,
          label: "Tidak akan",
        },
        {
          value: 0.25,
          label: "Mungkin tidak",
        },
        {
          value: 0.5,
          label: "Mungkin",
        },
        {
          value: 0.75,
          label: "Mungkin iya",
        },
        {
          value: 1,
          label: "Pasti",
        },
      ],
    },
  };
}

export default function Questionnaire({ questionnaire, sliderMarks }) {
  const respondent = useRef({});
  const answeringProgress = useRef(
    questionnaire.map((q) => {
      return {
        visual: 0,
        auditory: 0,
        readWrite: 0,
        kinesthetic: 0,
      };
    })
  );
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submitAnswers = async (respondent, answers) => {
    const questionnaireAnswers = questionnaire.map((question, index) => {
      question.answerChoices = question.answerChoices.map((answer) => {
        answer.userCf = answers[index][answer.type];
        return answer;
      });
      return question;
    });

    const payload = {
      respondent,
      questionnaireAnswers,
    };

    return await fetch(
      process.env.NEXT_PUBLIC_API_BASEURL + "/questionnaires/submit-answers",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log(answeringProgress.current);
  }, []);

  return (
    <>
      <Head>
        <title>Kuesioner | Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berdasarkan model VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
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
          <FormDialogue respondent={respondent} />

          <div className="guide bg-yellow-100 rounded-lg py-4 px-6 text-yellow-700">
            <div className="font-bold text-2xl">Panduan</div>
            <ol className="mt-4">
              1. Berikan nilai pada jawaban yang sesuai dengan kamu dengan cara
              menggeser slider
            </ol>
            <ol>2. Kamu boleh memilih lebih dari 1 jawaban</ol>
            <ol>3. Jika tidak ingin memilih suatu jawaban, biarkan saja</ol>
          </div>

          <div className="flex flex-col gap-8 lg:gap-16">
            {questionnaire.map((qaPair, index) => (
              <QuestionAndAnswer
                key={index}
                index={index}
                qaPair={qaPair}
                sliderMarks={sliderMarks}
                answeringProgress={answeringProgress}
              />
            ))}
          </div>

          <Button
            variant="contained"
            size="large"
            sx={{
              alignSelf: "end",
            }}
            disabled={isSubmiting}
            // menyimpan jawaban user ketika tombol submit ditekan
            onClick={async () => {
              setIsSubmiting(true);
              await submitAnswers(
                respondent.current,
                answeringProgress.current
              ).then(() => {
                setIsSubmiting(false);
              });
              window.location.href = "https://forms.gle/9AHUJt2FhPQWqLLu9";
            }}
          >
            {isSubmiting ? "Menyimpan..." : "Submit"}
          </Button>
        </Container>
      </div>
    </>
  );
}

function FormDialogue({ respondent }) {
  const [isDialogueOpen, setIsDialogueOpen] = useState(true);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState(null);
  const [university, setUniversity] = useState("");

  const closeDialogue = () => setIsDialogueOpen(false);

  return (
    <Dialog
      open={isDialogueOpen}
      // onClose={handleClose}
      // onBackdropClick={() => {}}
      // maxWidth="xs"
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Data responden</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Nama"
          type="text"
          maxLength="200"
          fullWidth
          variant="outlined"
          size="small"
          color="secondary"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="university"
          name="university"
          label="Universitas"
          type="text"
          maxLength="100"
          fullWidth
          variant="outlined"
          size="small"
          color="secondary"
          onChange={(e) => setUniversity(e.target.value)}
        />
        <TextField
          margin="dense"
          id="major"
          name="major"
          label="Jurusan kuliah"
          type="text"
          maxLength="100"
          fullWidth
          variant="outlined"
          size="small"
          color="secondary"
          onChange={(e) => setMajor(e.target.value)}
        />
        <TextField
          margin="dense"
          id="age"
          name="age"
          label="Umur"
          type="number"
          min="0"
          max="150"
          fullWidth
          variant="outlined"
          size="small"
          color="secondary"
          onChange={(e) => setAge(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button href="/" color="black">
          Batal
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            closeDialogue();
            respondent.current.name = name;
            respondent.current.university = university;
            respondent.current.major = major;
            respondent.current.age = age;
          }}
          disabled={name == "" || major == "" || age == null ? true : false}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function QuestionAndAnswer({
  index: questionIndex,
  qaPair: { question, answerChoices },
  sliderMarks,
  answeringProgress,
}) {
  const updateAnsweringProgress = ({ questionIndex, answerType, value }) =>
    (answeringProgress.current[questionIndex][answerType] = value);

  return (
    <>
      <div className="number text-3xl font-bold">{questionIndex + 1}</div>
      <div className="question flex items-center py-8">{question}</div>
      <div className="answers-choice grid items-stretch lg:grid-cols-2 gap-4 lg:gap-16">
        {answerChoices.map(({ answer, type }, index) => (
          <div
            key={index}
            className="answer-item font-bold flex flex-col grow"
            // variant={index === 0 ? 'outlined' : 'outlined'}
            // color={index === 0 ? 'black' : 'black'}
            // startIcon={index === 0 ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />}
            // disableElevation={true}
            // disableRipple={true}
            // sx={{
            //   fontWeight: 'bold',
            //   justifyContent: 'start',
            //   textAlign: 'left',
            //   paddingY: '1rem',
            //   paddingX: '1rem',
            //   gap: '0.5rem',
            // }}
          >
            <div className="grow">{answer}</div>
            <div className="px-4">
              <Slider
                aria-label="Restricted values"
                color="secondary"
                min={0}
                max={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) =>
                  sliderMarks[
                    sliderMarks.findIndex((mark) => mark.value === value)
                  ].label
                }
                // getAriaValueText={valuetext}
                // defaultValue={sliderMarks[Math.floor(Math.random() * 4)].value}
                step={null}
                marks={sliderMarks.map(({ value, label }, index) => ({
                  value,
                  label:
                    index === 0 || index === sliderMarks.length - 1
                      ? label
                      : "",
                }))}
                onChange={(e) => {
                  updateAnsweringProgress({
                    questionIndex,
                    answerType: type,
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
