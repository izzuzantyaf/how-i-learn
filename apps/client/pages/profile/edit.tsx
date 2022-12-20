import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Flex,
  Menu,
  Modal,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { Route } from "../../lib/constant";
import { jwt } from "../../lib/helpers/jwt.helper";
import { useToast } from "../../lib/hooks/useToast";
import { authService } from "../../services/auth/auth.service";
import { User } from "../../services/user/entity/user.entity";
import { useUserService } from "../../services/user/useUserService";
import { useEffect, useMemo, useState } from "react";
import {
  faArrowLeft,
  faEllipsisVertical,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthService } from "../../services/auth/useAuthService";

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

export default function EditProfilePage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    update: {
      run: updateUser,
      isLoading: isUpdateUserLoading,
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
      response: updateUserResponse,
    },
    findById: {
      isLoading: isFindUserByIdLoading,
      isSuccess: isFindUserByIdSuccess,
      isError: isFindUserByIdError,
      response: findUserByIdResponse,
    },
    deleteById: {
      run: deleteUser,
      isLoading: isDeleteUserLoading,
      isSuccess: isDeleteUserSuccess,
      isError: isDeleteUserError,
      response: deleteUserResponse,
    },
  } = useUserService({ userId: user.id });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const showToast = useMemo(() => useToast(), []);

  useEffect(() => {
    if (isUpdateUserSuccess && updateUserResponse) {
      if (updateUserResponse?.isSuccess) {
        showToast.success({
          id: "update_user",
          title: updateUserResponse?.message,
        });
      } else {
        showToast.error({
          id: "update_user",
          title: updateUserResponse?.message,
        });
      }
    }
  }, [isUpdateUserSuccess, showToast, updateUserResponse]);

  useEffect(() => {
    if (deleteUserResponse?.isSuccess) {
      authService.signOut();
    }
  }, [deleteUserResponse?.isSuccess]);

  return (
    <>
      <Head>
        <title>Edit profil | Presisi</title>
      </Head>

      <div className="edit-profile-page py-[16px]">
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

        <main className="px-[16px] mt-[16px]">
          <div className="my-container">
            <Title order={3}>Edit profil</Title>
            <form
              id="edit_profile"
              className="flex flex-col gap-2 mt-[8px]"
              onSubmit={async event => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log("User update data", data);
                const updateUserDto = {
                  id: user.id,
                  ...data,
                };
                updateUser(updateUserDto);
              }}
            >
              <TextInput
                // {...form.getInputProps("name")}
                label="Nama"
                name="name"
                placeholder="Nama kamu"
                defaultValue={findUserByIdResponse?.data?.name}
                error={updateUserResponse?.errors?.name}
                required
              />
              <TextInput
                type="email"
                label="Email"
                name="email"
                placeholder="Email yang aktif"
                defaultValue={findUserByIdResponse?.data?.email}
                disabled
              />
            </form>
            <Button
              type="submit"
              form="edit_profile"
              className="w-full mt-[16px]"
              loading={isUpdateUserLoading}
              // disabled={!form.isDirty("name")}
            >
              Simpan
            </Button>
            <Button
              form="delete_user"
              className="w-full mt-[16px]"
              color="red"
              variant="light"
              // loading={isDeleteUserLoading}
              onClick={() => setIsDeleteModalOpen(true)}
              // disabled={!form.isDirty("name")}
            >
              Hapus Akun
            </Button>
          </div>
        </main>

        <Modal
          opened={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Hapus Akun"
          withCloseButton={false}
          centered
        >
          <Text>
            Data history tes juga akan hilang. Yakin untuk hapus akun?
          </Text>
          <Flex gap="8px" justify="end" style={{ marginTop: "24px" }}>
            <Button
              variant="light"
              color="gray"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              onClick={() => deleteUser(user.id)}
              color="red"
              loading={isDeleteUserLoading}
            >
              Ya, hapus
            </Button>
          </Flex>
        </Modal>
      </div>
    </>
  );
}
