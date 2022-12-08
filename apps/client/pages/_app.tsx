import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Inter } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faCircleInfo,
  faEllipsisVertical,
  faEnvelopeCircleCheck,
  faInfo,
  faXmark,
  faEnvelope,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { NotificationsProvider } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

library.add(
  faArrowRight,
  faArrowLeft,
  faCheck,
  faInfo,
  faXmark,
  faEllipsisVertical,
  faCircleInfo,
  faCheck,
  faEnvelope,
  faEnvelopeCircleCheck,
  faExclamation
);
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          theme={{
            fontFamily: "__Inter_9c9965, __Inter_Fallback_9c9965;",
            headings: {
              fontFamily: "__Inter_9c9965, __Inter_Fallback_9c9965;",
            },
            primaryColor: "orange",
            components: {
              Title: {
                defaultProps: {
                  color: "dark",
                },
              },
              Text: {
                defaultProps: {
                  color: "dark",
                },
              },
              Button: {
                defaultProps: {
                  size: "md",
                  radius: "md",
                },
              },
              TextInput: {
                defaultProps: {
                  size: "md",
                  radius: "md",
                },
              },
              PasswordInput: {
                defaultProps: {
                  size: "md",
                  radius: "md",
                },
              },
              Menu: {
                defaultProps: {
                  radius: "md",
                },
              },
              Modal: {
                defaultProps: {
                  radius: "md",
                  overlayBlur: 3,
                },
                styles: {
                  title: {
                    fontWeight: "bold",
                  },
                },
              },
              Notification: {
                defaultProps: {
                  radius: "md",
                  color: "blue",
                  icon: <FontAwesomeIcon icon="info" />,
                },
                styles: (theme, params) => ({
                  root: {
                    backgroundColor: theme.colors[params.color][1],
                    borderColor: theme.colors[params.color][1],
                    "&::before": {
                      backgroundColor: theme.colors[params.color][6],
                    },
                  },
                  title: { color: theme.colors[params.color][6] },
                  description: { color: theme.colors[params.color][6] },
                  closeButton: {
                    color: theme.colors[params.color][6],
                    "&:hover": {
                      backgroundColor: theme.colors[params.color][2],
                    },
                  },
                }),
              },
              ActionIcon: {
                defaultProps: {
                  size: "lg",
                  radius: "md",
                },
              },
              ThemeIcon: {
                defaultProps: {
                  radius: "md",
                },
              },
            },
          }}
        >
          <NotificationsProvider
            autoClose={5000}
            limit={5}
            position="bottom-center"
          >
            <main className={inter.className}>
              <Component {...pageProps} />
            </main>
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
