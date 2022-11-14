import { Button, Progress, Slider } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import { useQuestionService } from "../services/question.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuizPage() {
  const questionService = useQuestionService();
  const { data, isLoading, isSuccess } = questionService.getAll();
  const [counter, setCounter] = useState(0);
  const MARKS = [
    { value: 0, label: "Tidak" },
    { value: 0.2, label: "Sedikit yakin" },
    { value: 0.4, label: "Netral" },
    { value: 0.6, label: "Cukup Yakin" },
    { value: 0.8, label: "Pasti" },
  ];

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Head>
        <title>Quiz | Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berbasis metode VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="quiz-page">
        <div className="my-container min-h-screen px-[16px] py-[16px] flex flex-col h-full gap-4">
          <section className="top flex items-center">
            <Progress
              value={((counter + 1) / data.data.length) * 100}
              size="lg"
              radius="md"
              className="grow"
            />{" "}
          </section>
          <div className="question grow flex items-center">
            <p className="">{data.data[counter]?.question}</p>
          </div>
          <div className="answer-choices grid md:grid-cols-2 gap-4 items-end">
            {data.data[counter]?.answer_choices.map(
              (choice: any, index: number) => (
                <div key={index}>
                  <label>{choice.answer}</label>
                  <Slider
                    defaultValue={0.4}
                    min={0}
                    max={0.8}
                    step={0.2}
                    marks={MARKS}
                    label={val =>
                      MARKS.find(
                        mark => mark.value == parseFloat(val.toPrecision(2))
                      )?.label
                    }
                    styles={{
                      markLabel: { display: "none" },
                      label: {
                        position: "absolute",
                      },
                    }}
                  />
                </div>
              )
            )}
          </div>
          <div className="quiz-navigation flex gap-4 justify-between items-center">
            <Button
              leftIcon={<FontAwesomeIcon icon="arrow-left" />}
              variant="light"
              onClick={() => setCounter(current => current - 1)}
              disabled={counter == 0}
            >
              Kembali
            </Button>
            {counter == data.data.length - 1 ? (
              <Button
                leftIcon={<FontAwesomeIcon icon="check" />}
                disabled={counter != data.data.length - 1}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="light"
                rightIcon={<FontAwesomeIcon icon="arrow-right" />}
                onClick={() => setCounter(current => current + 1)}
                disabled={counter == data.data.length - 1}
              >
                Lanjut
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
