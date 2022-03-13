import Head from "next/head";
import { Container, Text, Paper, Button, Avatar, Group } from "@mantine/core";

import PlaceholderAlert from "../util/components/PlaceholderAlert";

export default function Settings() {
  const name = "John Doe Test";
  const email = "john@doe.com";

  const initials = name.split(" ").map((word) => word[0]);

  const logout = () => {
    // TODO
  };

  return (
    <>
      <Head>
        <title>Beállítások | Nextine</title>
        <meta
          name="description"
          content="A Nextine oldal felhasználói beállítások oldala."
        />
      </Head>

      <Container mb={30}>
        <Text align="center" weight="bold" mb="xs" size="lg">
          Beállítások
        </Text>

        <PlaceholderAlert />
      </Container>

      <Group position="center" mb={20}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text size="xl" mb={10}>
            Felhasználó
          </Text>
          <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
              minWidth: 300,
              maxWidth: 450,
            })}
          >
            <Avatar size={120} radius={120} mx="auto">
              {initials}
            </Avatar>
            <Text align="center" size="lg" weight={500} mt="md">
              {name}
            </Text>
            <Text align="center" color="dimmed" size="sm">
              {email}
            </Text>

            <Button variant="default" fullWidth mt="md" onClick={logout}>
              Kijelentkezés
            </Button>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text size="xl" mb={10}>
            Fejlesztő
          </Text>
          <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
              minWidth: 300,
              maxWidth: 450,
            })}
          >
            <Avatar
              src="https://avatars.githubusercontent.com/u/53351035?v=4"
              size={120}
              radius={120}
              mx="auto"
            />
            <Text align="center" size="lg" weight={500} mt="md">
              SGeri
            </Text>
            <Text align="center" color="dimmed" size="sm">
              sarffygeri@gmail.com • Fullstack JS Fejlesztés
            </Text>

            <Button variant="default" fullWidth mt="md">
              <a href="https://github.com/SGeri" style={{ all: "unset" }}>
                Github Profil
              </a>
            </Button>
          </Paper>
        </div>
      </Group>

      {/* TODO Settings */}
    </>
  );
}
