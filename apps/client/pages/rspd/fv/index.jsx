import Head from 'next/head';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Rspd() {
  const [respondents, setRespondents] = useState([]);

  useEffect(() => {
    const fetchRespondents = async () => {
      let respondents = await fetch(
        process.env.NEXT_PUBLIC_APP_API_BASEURL + '/respondents/validation'
      )
        .then(res => res.json())
        .catch(err => err);

      setRespondents(respondents);
    };

    fetchRespondents();
  }, []);

  return (
    <>
      <Head>
        <title>Playground | Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berdasarkan model VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {respondents.length === 0 ? (
          'Loading...'
        ) : (
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>Nama</td>
                <td>Visual</td>
                <td>Auditory</td>
                <td>Read/write</td>
                <td>Kinesthetic</td>
                <td>Hasil (pakar)</td>
                <td>Visual</td>
                <td>Auditory</td>
                <td>Read/write</td>
                <td>Kinesthetic</td>
                <td>Hasil (aplikasi)</td>
              </tr>
            </thead>
            <tbody>
              {respondents.map(
                (
                  {
                    name,
                    learningTypesPoint: {
                      visual: visualPoint,
                      auditory: auditoryPoint,
                      readWrite: readWritePoint,
                      kinesthetic: kinestheticPoint,
                    },
                    bestLearningTypesCodeBasedOnPoint,
                    learningTypesFinalCf: {
                      visual: visualFinalCf,
                      auditory: auditoryFinalCf,
                      readWrite: readWriteFinalCf,
                      kinesthetic: kinestheticFinalCf,
                    },
                    bestLearningTypesCodeBasedOnFinalCf,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{visualPoint}</td>
                    <td>{auditoryPoint}</td>
                    <td>{readWritePoint}</td>
                    <td>{kinestheticPoint}</td>
                    <td>{bestLearningTypesCodeBasedOnPoint}</td>
                    <td>{visualFinalCf}</td>
                    <td>{auditoryFinalCf}</td>
                    <td>{readWriteFinalCf}</td>
                    <td>{kinestheticFinalCf}</td>
                    <td>{bestLearningTypesCodeBasedOnFinalCf}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
