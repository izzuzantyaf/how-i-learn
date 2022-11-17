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
  faEllipsisVertical,
  faInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

library.add(
  faArrowRight,
  faArrowLeft,
  faCheck,
  faInfo,
  faXmark,
  faEllipsisVertical
);

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
            },
          }}
        >
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
