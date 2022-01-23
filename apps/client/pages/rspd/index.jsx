import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";

// export async function getServerSideProps(ctx) {
//   let respondents = await fetch(
//     process.env.NEXT_PUBLIC_APP_API_BASEURL + "/respondents"
//   )
//     .then((res) => res.json())
//     .catch((err) => err);

//   const processedRespondents = respondents.map(
//     ({
//       name,
//       learningTypes: { visual, auditory, readWrite, kinesthetic },
//       bestLearningTypes,
//     }) => {
//       return {
//         name,
//         visual,
//         auditory,
//         readWrite,
//         kinesthetic,
//         bestLearningTypesCode: bestLearningTypes
//           .map((bestLearningType) => bestLearningType.at(0).toUpperCase())
//           .join(""),
//       };
//     }
//   );

//   return {
//     props: {
//       processedRespondents,
//     },
//   };
// }

export default function Rspd() {
  const [respondents, setRespondents] = useState([]);

  useEffect(() => {
    const fetchRespondents = async () => {
      let respondents = await fetch(
        process.env.NEXT_PUBLIC_APP_API_BASEURL + "/respondents"
      )
        .then((res) => res.json())
        .catch((err) => err);

      respondents = respondents.map(
        ({ name, learningTypes, bestLearningTypes }) => {
          return {
            name,
            ...learningTypes,
            bestLearningTypesCode: bestLearningTypes
              .map((bestLearningType) => bestLearningType.at(0).toUpperCase())
              .join(""),
          };
        }
      );

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
          "Loading..."
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
                <td>Tipe gaya belajar</td>
              </tr>
            </thead>
            <tbody>
              {respondents.map(
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
        )}
      </div>
    </>
  );
}
