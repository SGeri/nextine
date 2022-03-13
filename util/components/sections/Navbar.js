import { Navbar, Text } from "@mantine/core";
import { Home, Mail, Settings, Users } from "react-feather";

import User from "./User";

export default function NavbarComponent(props) {
  return (
    <Navbar
      hidden={!props.opened}
      width={{ sm: 300, lg: 400 }}
      hiddenBreakpoint="sm"
      p="md"
      height="100vh"
      style={{ paddingTop: -70 }}
    >
      <Navbar.Section grow>
        <NavLink name="Otthon" icon={<Home />} link="/" />
        <NavLink name="Felhasználók" icon={<Users />} link="/users" />
        <NavLink name="Üzenetek" icon={<Mail />} link="/messages" />
        <NavLink name="Beállítások" icon={<Settings />} link="/settings" />

        <a href="/settings" style={{ all: "unset", width: "100%" }}>
          <div style={{ position: "absolute", bottom: 0 }}>
            <User />
          </div>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}

function NavLink(props) {
  return (
    <a href={props.link} style={{ all: "unset" }}>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
        {props.icon}
        <Text style={{ marginLeft: 10 }}>{props.name}</Text>
      </div>
    </a>
  );
}
