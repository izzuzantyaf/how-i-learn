import {
  faCheck,
  faExclamation,
  faInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showNotification } from "@mantine/notifications";

type ToastProps = {
  id?: string;
  title: string;
  message?: string;
};

export function useToast() {
  return {
    info: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "blue",
        icon: <FontAwesomeIcon icon={faInfo} />,
      }),
    success: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "green",
        icon: <FontAwesomeIcon icon={faCheck} />,
      }),
    warn: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "yellow",
        icon: <FontAwesomeIcon icon={faExclamation} />,
      }),
    error: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "red",
        icon: <FontAwesomeIcon icon={faXmark} />,
      }),
  };
}
