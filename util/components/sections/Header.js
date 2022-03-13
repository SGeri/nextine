import { Burger, Header, MediaQuery, Text, ActionIcon } from "@mantine/core";
import { Sun } from "react-feather";

export default function HeaderComponent(props) {
  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={() => props.setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text size="lg">Nextine - A NextJS és Mantine projekt</Text>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ActionIcon
            title="Szín beállítás"
            onClick={props.toggleColorScheme}
            size="lg"
            radius="md"
            variant="outline"
          >
            <Sun />
          </ActionIcon>
        </div>
      </div>
    </Header>
  );
}
