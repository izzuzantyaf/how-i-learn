import {
  ActionIcon,
  Button,
  Flex,
  List,
  Menu,
  Modal,
  Progress,
  Slider,
  Text,
} from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import { useQuestionService } from "../services/question.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Route } from "../lib/constant";
import create from "zustand";

const useGuideModalStore = create<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
}>(set => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default function QuizPage() {
  const { getAll } = useQuestionService();
  const { questions, isLoading, isError } = getAll();
  const [counter, setCounter] = useState(0);
  const MARKS = [
    { value: 0, label: "Tidak" },
    { value: 0.2, label: "Sedikit yakin" },
    { value: 0.4, label: "Netral" },
    { value: 0.6, label: "Cukup Yakin" },
    { value: 0.8, label: "Pasti" },
  ];
  const isGuideModalOpen = useGuideModalStore(state => state.isOpen);
  const openGuideModal = useGuideModalStore(state => state.open);
  const closeGuideModal = useGuideModalStore(state => state.close);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Something went wrong.</p>;

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
          <Modal
            opened={isGuideModalOpen}
            onClose={closeGuideModal}
            title="Panduan"
          >
            <List type="ordered">
              <List.Item>
                Berikan nilai tingkat keyakinanmu pada jawaban yang sesuai
                dengan kamu dengan cara menggeser slider
              </List.Item>
              <List.Item>Kamu boleh memilih lebih dari 1 jawaban</List.Item>
              <List.Item>
                Jika tidak ingin memilih suatu jawaban, geser slider ke skala{" "}
                <q>Tidak</q>
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
            />{" "}
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

          <div className="question grow flex items-center">
            <Text component="p">{questions[counter]?.question}</Text>
          </div>

          <div className="answer-choices grid md:grid-cols-2 gap-4 items-end">
            {questions[counter]?.answer_choices.map(
              (choice: any, index: number) => (
                <div key={index}>
                  <Text component="p">{choice.answer}</Text>
                  <Slider
                    defaultValue={0.4}
                    min={0}
                    max={0.8}
                    step={0.2}
                    marks={MARKS}
                    label={val =>
                      MARKS.find(
                        mark => mark.value == parseFloat(val.toPrecision(2)) //* Force float number to 2 decimal, because float in js is weird. Like this, 0.6000000000000001 has to be forced to 0.6
                      )?.label
                    }
                    styles={{
                      markLabel: { display: "none" },
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
              style={{ visibility: counter == 0 ? "hidden" : "visible" }}
            >
              Kembali
            </Button>
            {counter == questions.length - 1 ? (
              <Button
                leftIcon={<FontAwesomeIcon icon="check" />}
                disabled={counter != questions.length - 1}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="light"
                rightIcon={<FontAwesomeIcon icon="arrow-right" />}
                onClick={() => setCounter(current => current + 1)}
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
