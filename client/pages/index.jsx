import Head from 'next/head'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import ExtensionIcon from '@mui/icons-material/ExtensionOutlined'
import VerifiedIcon from '@mui/icons-material/VerifiedOutlined'

export default function Home() {
  return <>
    <Head>
      <title>Presisi</title>
      <meta name="description" content="Rekomendasi cara belajar berdasarkan model VARK" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav className="pt-8 bg-gray-200">
      <Container className="flex items-center gap-4">
        <Typography
          variant="h6"
          sx={{ width: '100%' }}
          className="brand font-bold">Presisi</Typography>
        <Button
          variant="outlined"
          color="black"
          className="font-bold flex-shrink-0">Masuk</Button>
        <Button
          variant="contained"
          className="font-bold flex-shrink-0">Buat akun</Button>
      </Container>
    </nav>

    <Box className="hero bg-gray-200 pb-32" style={{ borderRadius: '0 0 48px 48px' }}>
      <Container>
        <p className="font-black w-5/6 text-4xl sm:text-5xl pt-16">
          Temukan cara belajar kamu
        </p>
        <p className="pt-8 w-5/6 sm:text-2xl">Sistem rekomendasi cara belajar berdasarkan model VARK menggunakan algoritma Certainty Factor</p>
        <Button
          variant="contained"
          className="font-bold mt-8 md:text-xl md:px-8">Mulai sekarang</Button>
      </Container>
    </Box>

    <main>
      <Container>
        <Box
          className="flow-card bg-white py-8 px-4 rounded-2xl shadow-lg flex justify-around items-center relative -top-16 mx-auto"
          maxWidth="md"
        >
          <Box className="flow-item space-y-2 text-center">
            <AssignmentTurnedInIcon color="secondary" className="md:text-4xl" />
            <p className="text-xs md:text-lg">Isi kuesioner</p>
          </Box>
          <Box className="flow-item space-y-2 text-center">
            <ExtensionIcon color="secondary" className="md:text-4xl" />
            <p className="text-xs md:text-lg">Tipe gaya belajar</p>
          </Box>
          <Box className="flow-item space-y-2 text-center">
            <VerifiedIcon color="secondary" className="md:text-4xl" />
            <p className="text-xs md:text-lg">Cara belajar</p>
          </Box>
        </Box>

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
}
