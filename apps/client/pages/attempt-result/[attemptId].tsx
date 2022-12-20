import {
  faArrowLeft,
  faEllipsisVertical,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Box, Menu, Title, Text, Skeleton } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Route } from "../../lib/constant";
import { authService } from "../../services/auth/auth.service";
import { useAttemptService } from "../../services/attempt/useAttemptService";

export default function AttemptResultPage() {
  const router = useRouter();
  const { attemptId } = router.query;
  console.log(`attemptId`, attemptId);
  const {
    findById: {
      isLoading: isAttemptResultLoading,
      isError: isAttemptResultError,
      isSuccess: isAttemptResultSuccess,
      isFetching: isAttemptResultFetching,
      response: attemptResultResponse,
    },
  } = useAttemptService({
    attemptId: parseInt(attemptId as string),
  });

  return (
    <>
      <Head>
        <title>History | Presisi</title>
      </Head>

      <div className="history-detail bg-gray-100 py-[16px]">
        <header className="px-[16px]">
          <div className="my-container flex items-center">
            <ActionIcon component={Link} href={Route.PROFILE}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </ActionIcon>
            <div className="spacer grow"></div>
            <Menu shadow="xl" position="bottom-end" width="192px">
              <Menu.Target>
                <ActionIcon title="profile-menu" radius="md">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown style={{ padding: "8px" }}>
                <Menu.Item
                  color="red"
                  icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                  onClick={authService.signOut}
                >
                  Keluar
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </header>

        <Box
          component="main"
          className="result min-h-screen mt-[8px] px-[16px]"
        >
          <div className="my-container">
            <Title order={3}>Tipe belajar kamu</Title>
            {!attemptResultResponse?.data ? (
              <Skeleton height={92} />
            ) : (
              <Box
                className="flex flex-col items-center justify-center min-h-[92px] shadow rounded-[8px] mt-2"
                bg="orange.1"
              >
                <Text className="font-black text-xl" color="orange.6">
                  {attemptResultResponse?.data?.bestLearningType}
                </Text>
              </Box>
            )}

            <Title order={3} style={{ marginTop: "16px" }}>
              Rekomendasi cara belajar
            </Title>
            <div className="grid sm:grid-cols-2 gap-[8px] mt-[8px]">
              {!attemptResultResponse?.data
                ? Array(8)
                    .fill(null)
                    .map((value, index) => (
                      <Skeleton key={index} height={42.8} />
                    ))
                : attemptResultResponse?.data?.learningRecommendations.map(
                    (recommendation: any, index: number) => (
                      <div
                        key={index}
                        className="p-[8px] px-[12px] rounded-[8px] shadow bg-white border border-gray-100 border-solid"
                      >
                        {recommendation.name}
                      </div>
                    )
                  )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
