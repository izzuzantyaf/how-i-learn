import Head from "next/head";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Close from "@mui/icons-material/Close";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
// import CheckBoxOutlineBlankOutlined from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
// import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined'

export async function getStaticProps(ctx) {
  const questionnaire = await fetch(
    "https://dev-presisi-server.herokuapp.com/api/questionnaires"
  ).then((res) => res.json());

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
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  // const [respondent, setRespondent] = useState({});

  function liftName(name) {
    setName(name);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [counter]);

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
          <FormDialogue liftName={liftName} />

          <ProgressOverview
            counter={counter}
            totalQuestion={questionnaire.length}
          />

          <div className="grow flex flex-col lg:px-6">
            <Question question={questionnaire[counter].question} />
            <AnswerChoices
              answerChoices={questionnaire[counter].answerChoices}
              sliderMarks={sliderMarks}
            />
          </div>

          {/* navigasi */}
          <div className="flex justify-between items-center">
            <Button
              variant="outlined"
              color="black"
              startIcon={<ArrowBack fontSize="small" />}
              onClick={counter > 0 ? () => setCounter(counter - 1) : () => {}}
              disabled={counter === 0}
            >
              Mundur
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowForward fontSize="small" />}
              // disabled={true}
              onClick={
                counter < questionnaire.length - 1
                  ? () => setCounter(counter + 1)
                  : () => {}
              }
            >
              Lanjut
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

function ProgressOverview({ counter, totalQuestion }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-bold">{`${counter + 1}/${totalQuestion}`}</div>
        <IconButton href="/">
          <Close />
        </IconButton>
      </div>
      <LinearProgress
        variant="determinate"
        value={(100 / 16) * (counter + 1)}
        sx={{
          height: "12px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}

function FormDialogue({ liftName }) {
  const [isDialogueOpen, setIsDialogueOpen] = useState(true);
  const [name, setName] = useState("");
  const handleClose = () => {
    setIsDialogueOpen(false);
  };
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
          label="Nama kamu"
          type="text"
          maxLength="200"
          fullWidth
          variant="outlined"
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button href="/" color="black">
          Batal
        </Button>
        <Button
          onClick={() => {
            handleClose();
            liftName(name);
          }}
          variant="contained"
          disabled={name == false ? true : false}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Question({ question }) {
  return <div className="question py-8 grow flex items-center">{question}</div>;
}

function AnswerChoices({ answerChoices, sliderMarks }) {
  return (
    <div className="answers-choice grid lg:grid-cols-2 gap-4 lg:gap-20">
      {answerChoices.map(({ answer }, index) => (
        <div
          key={index}
          className="answer-item font-bold"
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
          <div className="flex flex-col grow">
            {answer}
            <div className="px-4">
              <Slider
                aria-label="Restricted values"
                color="secondary"
                min={0}
                max={1}
                defaultValue={0}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) =>
                  sliderMarks[
                    sliderMarks.findIndex((mark, index) => mark.value === value)
                  ].label
                }
                // getAriaValueText={valuetext}
                step={null}
                marks={sliderMarks.map(({ value, label }, index) => ({
                  value,
                  label:
                    index === 0 || index === sliderMarks.length - 1
                      ? label
                      : "",
                }))}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
