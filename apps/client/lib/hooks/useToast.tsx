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
        icon: <FontAwesomeIcon icon="info" />,
      }),
    success: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "green",
        icon: <FontAwesomeIcon icon="check" />,
      }),
    warn: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "yellow",
        icon: <FontAwesomeIcon icon="exclamation" />,
      }),
    error: ({ id, title, message }: ToastProps) =>
      showNotification({
        id,
        title,
        message: message ?? "",
        color: "red",
        icon: <FontAwesomeIcon icon="xmark" />,
      }),
  };
}
