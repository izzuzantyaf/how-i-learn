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
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

library.add(faArrowRight, faArrowLeft, faCheck);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          theme={{
            primaryColor: "orange",
            components: {
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
