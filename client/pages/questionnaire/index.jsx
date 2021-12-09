import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Head from 'next/head'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import UncheckedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckedIcon from '@mui/icons-material/CheckBoxOutlined'

export default function Questionnaire() {
  const questions = [
    'Menggambar atau menunjukkan atau memberikan peta',
    'Menjelaskan arah secara lisan',
    'Menulis arah',
    'Pergi dengannya',
  ]

  return <>
    <Head>
      <title>Kuesioner | Presisi</title>
      <meta name="description" content="Rekomendasi cara belajar berdasarkan model VARK" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="py-8 h-screen">
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* progress overview */}
        <div>
          <div className="flex justify-between items-center">
            <div className="font-bold">1/16</div>
            <IconButton href="/">
              <CloseIcon />
            </IconButton>
          </div>
          <LinearProgress
            variant="determinate"
            value={100 / 16}
            sx={{
              height: '12px',
              borderRadius: '6px'
            }} />
        </div>

        {/* pertanyaan */}
        <div className="question flex-grow flex items-center">
          Kamu ingin menolong seseorang untuk pergi ke bandara, ke pusat kota, dan ke stasiun kereta api, kamu akan melakukan apa ?
        </div>

        {/* pilihan jawaban */}
        <div className="answers-choice grid sm:grid-cols-2 gap-4">
          {questions.map((answer, index) =>
            <Button
              key={index}
              className="answer-item"
              variant={index === 0 ? 'contained' : 'outlined'}
              color={index === 0 ? 'secondary' : 'black'}
              startIcon={index === 0 ? <CheckedIcon /> : <UncheckedIcon />}
              disableElevation={true}
              sx={{
                fontWeight: 'normal',
                justifyContent: 'start',
                textAlign: 'left',
                paddingY: '1rem',
                gap: '0.5rem',
              }}>{answer}</Button>
          )}
        </div>

        {/* navigasi */}
        <div className="flex justify-between items-center">
          <Button variant="outlined" color="black" startIcon={<ArrowBackIcon fontSize="small" />}>Mundur</Button>
          <Button variant="contained" endIcon={<ArrowForwardIcon fontSize="small" />}>Lanjut</Button>
        </div>
      </Container>
    </div>
  </>
}