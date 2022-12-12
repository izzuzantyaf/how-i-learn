import {
  ActionIcon,
  Box,
  Button,
  Flex,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Text,
  Title,
} from "@mantine/core";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuestionService } from "../services/question/useQuestionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Route } from "../lib/constant";
import create from "zustand";
import { Question } from "../services/question/question.entity";
import { AnswerChoice } from "../services/answer-choice/answer-choice.entity";
import { useAnswerService } from "../services/answer/useAnswerService";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { jwt } from "../lib/helpers/jwt.helper";
import { User } from "../services/user/entity/user.entity";

const useGuideModalStore = create<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
}>(set => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

const MARKS = [
  { value: 0, label: "Tidak" },
  { value: 0.2, label: "Sedikit yakin" },
  { value: 0.4, label: "Netral" },
  { value: 0.6, label: "Cukup yakin" },
  { value: 0.8, label: "Pasti" },
];

type Data = {
  user: User;
};

export const getServerSideProps: GetServerSideProps<Data> = async ({ req }) => {
  const user = jwt.decode(req.cookies.access_token as string) as User;
  console.log(`user`, user);
  return {
    props: { user },
  };
};

export default function QuizPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const questionService = useQuestionService();
  const answerService = useAnswerService();
  const {
    isLoading: isGetQuestionsLoading,
    isError: isGetQuestionsError,
    response: getQuestionsResponse,
  } = questionService.getAll();
  const questions = useMemo(
    () => (getQuestionsResponse?.data as Question[]) ?? [],
    [getQuestionsResponse]
  );
  const [counter, setCounter] = useState(0);
  const isGuideModalOpen = useGuideModalStore(state => state.isOpen);
  const openGuideModal = useGuideModalStore(state => state.open);
  const closeGuideModal = useGuideModalStore(state => state.close);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [answersWithUserCf, setAnswersWithUserCf] = useState<
    (AnswerChoice & { user_cf: number })[][]
  >([]);
  const answerChoicesContainer = useRef<HTMLDivElement>(null);

  function updateAnswers(order: number, id: number | undefined, value: string) {
    setAnswersWithUserCf(state => {
      state[order] = state[order].map(answerChoice => {
        if (answerChoice.id == id) {
          answerChoice.user_cf = parseFloat(value);
        }
        return answerChoice;
      });
      return [...state];
    });
  }

  /**
   * Scroll up to the top of the answer choices container
   */
  function scrollUpAnswerChoicesView() {
    answerChoicesContainer.current?.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollUpAnswerChoicesView();
  }, [counter]);

  useEffect(() => {
    setAnswersWithUserCf(
      questions.map(({ answer_choices }) =>
        answer_choices.map(answerChoice => ({ ...answerChoice, user_cf: 0.4 }))
      )
    );
  }, [questions]);

  if (isGetQuestionsLoading) return <p>Loading...</p>;
  if (isGetQuestionsError) return <p>Something went wrong.</p>;

  console.log(`answersWithUserCf[${counter}]: `, answersWithUserCf[counter]);

  if (answerService.submit.response?.isSuccess) {
    const result = answerService.submit.response.data;
    return (
      <Box
        component="main"
        className="result min-h-screen"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <div className="my-container px-[16px] py-[16px]">
          <Title order={3}>Tipe belajar kamu</Title>
          <Box className="flex flex-col items-center justify-center min-h-[92px] bg-white shadow-md rounded-lg mt-2">
            <Text className="font-black text-xl">
              {result.bestLearningStyle}
            </Text>
          </Box>
          <Title order={3} style={{ marginTop: "16px" }}>
            Rekomendasi cara belajar
          </Title>
          <div className="grid sm:grid-cols-2 gap-[8px] mt-[8px]">
            {result.learningRecommendations.map(
              (recommendation: any, index: number) => (
                <div
                  key={index}
                  className="p-[8px] px-[12px] rounded-[8px] bg-white"
                >
                  {recommendation.name}
                </div>
              )
            )}
          </div>
          <Button
            component={Link}
            href={Route.HOME}
            style={{ marginTop: "24px" }}
            className="w-full sm:w-auto"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz | Presisi</title>
      </Head>

      <main className="quiz-page">
        <div className="my-container h-screen px-[16px] py-[16px] flex flex-col gap-4">
          <Modal
            opened={isGuideModalOpen}
            onClose={closeGuideModal}
            title="Panduan"
          >
            <List type="ordered">
              <List.Item>
                Berikan nilai tingkat keyakinanmu pada jawaban yang sesuai
                dengan kamu
              </List.Item>
              <List.Item>Kamu boleh memilih lebih dari 1 jawaban</List.Item>
              <List.Item>
                Jika tidak ingin memilih suatu jawaban, pilih <q>Tidak</q>
              </List.Item>
            </List>
          </Modal>

          <Modal
            opened={isCancelModalOpen}
            onClose={() => setIsCancelModalOpen(false)}
            title="Keluar"
            withCloseButton={false}
            centered
          >
            <Text>Jika kamu keluar, maka jawabanmu tidak akan tersimpan</Text>
            <Flex gap="8px" justify="end" style={{ marginTop: "24px" }}>
              <Button
                variant="light"
                color="gray"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Batal
              </Button>
              <Button component={Link} href={Route.HOME} color="red">
                Keluar
              </Button>
            </Flex>
          </Modal>

          <section className="top flex items-center gap-4">
            <Text className="font-bold">{`${counter + 1}/${
              questions.length
            }`}</Text>
            <Progress
              value={((counter + 1) / questions.length) * 100}
              size="lg"
              radius="md"
              className="grow"
            />
            <Menu shadow="xl" position="bottom-end" width="192px">
              <Menu.Target>
                <ActionIcon title="quiz-menu" radius="md">
                  <FontAwesomeIcon icon="ellipsis-vertical" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown style={{ padding: "8px" }}>
                <Menu.Item
                  icon={<FontAwesomeIcon icon="info" />}
                  onClick={openGuideModal}
                >
                  Panduan
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<FontAwesomeIcon icon="xmark" />}
                  onClick={() => setIsCancelModalOpen(true)}
                >
                  Keluar
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </section>

          <div className="question grow flex items-center min-h-[30vh]">
            <Text component="p">{questions[counter]?.question}</Text>
          </div>

          <div
            ref={answerChoicesContainer}
            className="answer-choices grid md:grid-cols-2 gap-4 overflow-y-auto items-end"
          >
            {answersWithUserCf[counter]?.map(choice => (
              <Radio.Group
                key={choice.id}
                name={`answer_${choice.id}`}
                label={choice.answer}
                defaultValue={choice.user_cf.toString()}
                styles={{ label: { fontWeight: "bold" } }}
                onChange={value => {
                  console.log("Clicked value: " + value);
                  updateAnswers(counter, choice.id, value);
                }}
              >
                {MARKS.map(({ label, value }, index) => (
                  <Radio
                    key={`answer_${choice.id}_${index}`}
                    name={`answer_${choice.id}_${index}`}
                    label={label}
                    value={value.toString()}
                    styles={{
                      label: { cursor: "pointer" },
                      radio: { cursor: "pointer" },
                    }}
                  />
                ))}
              </Radio.Group>
            ))}
          </div>

          <div className="quiz-navigation flex gap-4 justify-between items-center">
            <Button
              leftIcon={<FontAwesomeIcon icon="arrow-left" />}
              variant="outline"
              onClick={() => {
                window.scrollTo(0, 0);
                setCounter(current => current - 1);
              }}
              disabled={counter == 0}
              style={{ visibility: counter == 0 ? "hidden" : "visible" }}
            >
              Kembali
            </Button>
            {counter == questions.length - 1 ? (
              <Button
                leftIcon={<FontAwesomeIcon icon="check" />}
                disabled={
                  counter != questions.length - 1 ||
                  answerService.submit.isSuccess
                }
                loading={answerService.submit.isLoading}
                onClick={async () => {
                  console.log(answersWithUserCf);
                  //* Submit user answer to server
                  answerService.submit.submit({
                    user_id: user?.id,
                    answersWithUserCf: answersWithUserCf.flat(1),
                  });
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="outline"
                rightIcon={<FontAwesomeIcon icon="arrow-right" />}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setCounter(current => current + 1);
                }}
                disabled={counter == questions.length - 1}
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
