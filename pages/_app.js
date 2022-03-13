import Head from "next/head";
import { useState } from "react";
import { MantineProvider, AppShell, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import Header from "../util/components/sections/Header";
import Navbar from "../util/components/sections/Navbar";

function Application({ Component, pageProps }) {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme}>
        <MantineProvider
          theme={{ colorScheme }}
          withNormalizeCSS
          withGlobalStyles
        >
          <NotificationsProvider>
            <ModalsProvider>
              <AppShell
                padding="md"
                header={
                  <Header
                    opened={opened}
                    setOpened={setOpened}
                    toggleColorScheme={toggleColorScheme}
                  />
                }
                navbar={<Navbar opened={opened} />}
                styles={(theme) => ({
                  main: {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Component {...pageProps} />
              </AppShell>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default Application;
