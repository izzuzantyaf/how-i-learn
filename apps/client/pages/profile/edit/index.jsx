import Head from "next/head";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
// import EditOutlined from "@mui/icons-material/EditOutlined";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";

export default function ProfileEdit() {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);

  const [postUpdateResponse, setPostUpdateResponse] = useState(null);
  const [postDeleteResponse, setPostDeleteResponse] = useState(null);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [member, setMember] = useLocalStorage("member");

  useEffect(() => {
    if (!window.localStorage.getItem("member")) {
      window.location.href = window.location.origin + "/signin";
    } else {
      setMember(JSON.parse(window.localStorage.getItem("member")));
    }
  }, []);

  useEffect(() => {
    setName(member?.name);
    setEmail(member?.email);
    setPassword(member?.password);
    setPasswordConfirm(member?.password);
  }, [member]);

  // useEffect(() => {
  //   setIsNameValid(validateName(name));
  //   setIsEmailValid(validateEmail(email));
  //   setIsPasswordValid(validatePassword(password));
  //   setIsPasswordConfirmValid(
  //     validatePasswordConfirm(password, passwordConfirm)
  //   );
  // }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setCanSubmit(
      isNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid
    );
  }, [isNameValid, isEmailValid, isPasswordValid, isPasswordConfirmValid]);

  useEffect(() => {
    if (postUpdateResponse) setIsSnackBarOpen(true);
  }, [postUpdateResponse]);

  useEffect(() => {
    if (postDeleteResponse) setIsDeleteModalOpen(true);
  }, [postDeleteResponse]);

  const validateName = name => name.length > 0;

  const validateEmail = email =>
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email
    );

  const validatePassword = password => password.length >= 8;

  const validatePasswordConfirm = (password, passwordConfirm) =>
    password === passwordConfirm;

  const update = async payload => {
    return await fetch(process.env.NEXT_PUBLIC_API_BASEURL + "/member/update", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .catch(err => err);
  };

  const deleteAccount = async payload => {
    return await fetch(process.env.NEXT_PUBLIC_API_BASEURL + "/member/delete", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .catch(err => err);
  };

  const logout = () => {
    window.localStorage.removeItem("member");
    window.location.href = window.location.origin;
  };

  return (
    <>
      <Head>
        <title>Edit Profil | Presisi</title>
        <meta
          name="description"
          content="Rekomendasi cara belajar berdasarkan model VARK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {member ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            minHeight: "100vh",
            paddingY: "1.5rem",
          }}
        >
          <div className="flex items-center gap-4 justify-between">
            <IconButton href="/profile">
              <ArrowBack />
            </IconButton>
            <Button
              variant="outlined"
              color="error"
              onClick={logout}
              endIcon={<LogoutOutlined />}
              sx={{ alignSelf: "end", flexShrink: 0 }}
            >
              Keluar
            </Button>
          </div>

          <div className="title font-black text-3xl md:text-4xl">
            Edit profil
          </div>

          <TextField
            required
            name="name"
            size="small"
            id="name"
            type="text"
            label="Nama"
            color="secondary"
            defaultValue={member?.name}
            error={!isNameValid}
            helperText={!isNameValid ? "Nama tidak boleh kosong" : ""}
            onChange={e => {
              setName(e.target.value);
              setIsNameValid(validateName(e.target.value));
            }}
          />
          <TextField
            required
            name="email"
            size="small"
            id="email"
            type="email"
            label="Email"
            color="secondary"
            disabled={true}
            defaultValue={member?.email}
            error={!isEmailValid}
            helperText={!isEmailValid ? "Email tidak valid" : ""}
            onChange={e => {
              setEmail(e.target.value);
              setIsEmailValid(validateEmail(e.target.value));
            }}
          />
          <TextField
            required
            name="password"
            size="small"
            id="password"
            label="Password"
            type="password"
            color="secondary"
            defaultValue={member?.password}
            error={!isPasswordValid}
            helperText={!isPasswordValid ? "Password minimal 8 karakter" : ""}
            onChange={e => {
              setPassword(e.target.value);
              setIsPasswordValid(validatePassword(e.target.value));
              setIsPasswordConfirmValid(
                validatePasswordConfirm(e.target.value, passwordConfirm)
              );
            }}
          />
          <TextField
            required
            name="passwordConfirm"
            size="small"
            id="passwordConfirm"
            label="Ketik ulang password"
            type="password"
            color="secondary"
            defaultValue={member?.password}
            error={!isPasswordConfirmValid}
            helperText={!isPasswordConfirmValid ? "Password tidak sama" : ""}
            onChange={e => {
              setPasswordConfirm(e.target.value);
              setIsPasswordConfirmValid(
                validatePasswordConfirm(password, e.target.value)
              );
            }}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={async e => {
              setCanSubmit(false);
              await update({
                _id: member._id,
                name,
                password,
                passwordConfirm,
              })
                .then(res => {
                  setPostUpdateResponse(res);
                  if (res.type === "success") setMember(res.member);
                })
                .catch(err => console.error(err));
              setCanSubmit(true);
            }}
            disabled={!canSubmit}
          >
            Update
          </Button>

          <Button
            type="submit"
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlined />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Hapus akun
          </Button>

          <Dialog
            open={isDeleteModalOpen}
            // onClose={handleClose}
            // onBackdropClick={() => {}}
            // maxWidth="xs"
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>Hapus akun</DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                Akun kamu akan dihapus secara permanen. Apakah kamu yakin?
              </div>
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", gap: "0.5rem", justifyContent: "end" }}
            >
              <Button
                variant="text"
                color="black"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
              >
                Batal
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteAccount({ _id: member._id }).then(res => {
                    if (res.type === "success") {
                      window.localStorage.removeItem("member");
                      window.location.reload();
                    }
                  });
                }}
              >
                Ya, hapus akun
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={3000}
            onClose={() => {
              setIsSnackBarOpen(false);
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity={postUpdateResponse?.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {postUpdateResponse?.message}
            </Alert>
          </Snackbar>
        </Container>
      ) : null}
    </>
  );
}
