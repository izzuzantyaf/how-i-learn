import Head from "next/head";

export async function getServerSideProps(ctx) {
  let respondents = await fetch(
    process.env.NEXT_PUBLIC_APP_API_BASEURL + "/respondents"
  )
    .then((res) => res.json())
    .catch((err) => err);

  const processedRespondents = respondents.map(
    ({
      name,
      learningTypes: { visual, auditory, readWrite, kinesthetic },
      bestLearningTypes,
    }) => {
      return {
        name,
        visual,
        auditory,
        readWrite,
        kinesthetic,
        bestLearningTypesCode: bestLearningTypes
          .map((bestLearningType) => bestLearningType.at(0).toUpperCase())
          .join(""),
      };
    }
  );

  return {
    props: {
      processedRespondents,
    },
  };
}

export default function Rspd({ processedRespondents }) {
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
        <table>
          <thead>
            <tr>
              <td>No</td>
              <td>Nama</td>
              <td>Visual</td>
              <td>Auditory</td>
              <td>Read/write</td>
              <td>Kinesthetic</td>
              <td>Tipe gaya belajar</td>
            </tr>
          </thead>
          <tbody>
            {processedRespondents.map(
              (
                {
                  name,
                  visual,
                  auditory,
                  readWrite,
                  kinesthetic,
                  bestLearningTypesCode,
                },
                index
              ) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{visual}</td>
                  <td>{auditory}</td>
                  <td>{readWrite}</td>
                  <td>{kinesthetic}</td>
                  <td>{bestLearningTypesCode}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
