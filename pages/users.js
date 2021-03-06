import Head from "next/head";
import { useState, useEffect } from "react";
import { Table, ScrollArea, Menu, Divider, Drawer, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useClipboard } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";

import { Edit2, Send, Save, Trash2 } from "react-feather";

import Search from "../util/components/forms/Search";
import EditUserForm from "../util/components/forms/EditUser";
import SendMessageForm from "../util/components/forms/SendMessage";

const MOCKUP_USERS = [
  {
    name: "John Doe",
    email: "john@doe.com",
    address: "Mankato Mississippi 96522, Nulla st. 10",
    workplace: "Samsung",
    phone: "(257) 563-7401",
  },
  {
    name: "Cecilia Chapman",
    email: "Cecilia@doe.com",
    address: "Tamuning PA 10855, Sodales Av. 4264",
    workplace: "Apple",
    phone: "(786) 713-8616",
  },
  {
    name: "Kyla Olsen",
    email: "Kyla@doe.com",
    address: "Chelsea MI 67708, Nunc Road 4",
    workplace: "Microsoft",
    phone: "(947) 278-5929",
  },
  {
    name: "Nyssa Vazquez",
    email: "Nyssa@doe.com",
    address: "Latrobe DE 38100, Viverra. Avenue",
    workplace: "Google",
    phone: "(608) 265-2215",
  },
  {
    name: "Aaron Hawkins",
    email: "Aaron@doe.com",
    address: "Santa Rosa MN 98804, Tortor. Street 42",
    workplace: "Facebook",
    phone: "(959) 119-8364",
  },
];

export default function Users(/*props*/) {
  const clipboard = useClipboard();
  const notifications = useNotifications();
  const modals = useModals();

  const [users, setUsers] = useState(MOCKUP_USERS); // props.users
  const [tableRows, setTableRows] = useState([]);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setTableRows(
      users.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>{user.workplace}</td>
          <td>{user.phone}</td>
          <td>
            <Menu>
              <Menu.Label>{user.name}</Menu.Label>
              <Menu.Item
                icon={<Edit2 />}
                onClick={() => {
                  setSelectedProfileData(user);
                  toggleDrawer(true);
                }}
              >
                Szerkeszt??s
              </Menu.Item>
              <Menu.Item icon={<Send />} onClick={() => sendMessage(user)}>
                ??zenet k??ld??se
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<Save />} onClick={() => copyProfile(user)}>
                M??sol??s
              </Menu.Item>
              <Menu.Item
                icon={<Trash2 />}
                onClick={() => deleteProfile(user)}
                color="red"
              >
                Felhaszn??l?? t??rl??se
              </Menu.Item>
            </Menu>
          </td>
        </tr>
      ))
    );
  }, [users]);

  const onSearch = (search) => {
    setSearchLoading(true);

    search = search.toLowerCase().trim();

    if (!search) {
      setUsers(MOCKUP_USERS); // props.users
      setSearchLoading(false);
      return;
    }

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.address.toLowerCase().includes(search) ||
        user.workplace.toLowerCase().includes(search) ||
        user.phone.includes(search)
    );

    setUsers(filteredUsers);

    setSearchLoading(false);
  };

  const cancelSearch = () => {
    setUsers(MOCKUP_USERS); // props.users
  };

  const onSubmitEditForm = (oldUser, newUser) => {
    toggleDrawer(false);

    // edit data in db

    let tmpUsers = users;
    tmpUsers.splice(tmpUsers.indexOf(oldUser), 0, newUser);
    tmpUsers = tmpUsers.filter((u) => u !== oldUser);
    setUsers(tmpUsers);

    notifications.showNotification({
      title: "Profil szerkeszt??se",
      message: `${newUser.name} profilj??t sikeresen szerkesztette`,
      color: "teal",
    });
  };

  const sendMessage = (user) => {
    const onSubmit = (subject, message) => {
      modals.closeModal(modal);
      onSendMessage(user, subject, message);
    };

    const modal = modals.openModal({
      title: "??zenetk??ld??s",
      children: <SendMessageForm user={user} onSubmit={onSubmit} />,
      centered: true,
    });
  };

  const onSendMessage = (user, subject, message) => {
    // send message to user on backend

    notifications.showNotification({
      title: "??zenetk??ld??s",
      message: `Az ??zenetet sikeresen k??zbes??tett??k ${user.email} c??mre`,
      color: "teal",
    });
  };

  const copyProfile = (user) => {
    clipboard.copy(JSON.stringify(user));

    notifications.showNotification({
      title: "Profil m??sol??sa",
      message: `${user.name} profilja JSON form??tumban sikeresen v??g??lapra lett helyezve`,
      color: "teal",
    });
  };

  const deleteProfile = (user) => {
    modals.openConfirmModal({
      title: "Profil t??rl??se",
      children: (
        <Text size="sm" lineClamp={2}>
          Biztosan szeretn?? <b>{user.name}</b> profilj??t t??r??lni?
          <br />
          Ez a m??velet nem visszavonhat??!
        </Text>
      ),
      centered: true,
      labels: { confirm: "Rendben", cancel: "M??gsem" },
      confirmProps: { color: "red" },
      onConfirm: () => onDeleteProfile(user),
    });
  };

  const onDeleteProfile = (user) => {
    // remove data in db

    let tmpUsers = users;
    tmpUsers = tmpUsers.filter((u) => u !== user);
    setUsers(tmpUsers);

    notifications.showNotification({
      title: "Profil t??rl??se",
      message: `${user.name} profilj??t sikeresen t??r??lte`,
      color: "red",
    });
  };

  return (
    <>
      <Head>
        <title>Felhaszn??l??k | Nextine</title>
        <meta
          name="description"
          content="A Nextine oldal felhaszn??l??kat kezel?? oldala."
        />
      </Head>

      <Text align="center" weight="bold" mb="xs" size="lg">
        Felhaszn??l??k
      </Text>

      <Drawer
        opened={drawerOpened}
        onClose={() => toggleDrawer(false)}
        title="Felhaszn??l?? m??dos??t??sa"
        padding="xl"
        size="xl"
      >
        <EditUserForm
          data={selectedProfileData}
          submitForm={onSubmitEditForm}
        />
      </Drawer>

      <Search
        loading={searchLoading}
        onSubmit={onSearch}
        onCancel={cancelSearch}
      />

      {tableRows.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>N??v</th>
                <th>E-mail c??m</th>
                <th>Lakc??m</th>
                <th>Munkahely</th>
                <th>Telefonsz??m</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Nincs megjelen??thet?? adat.
        </Text>
      )}
    </>
  );
}

/*
export async function getServerSideProps() {
  const request = await fetch("http://localhost:3000/api/users");
  const users = await request.json();

  return {
    props: {
      users,
    },
  };
}
*/
