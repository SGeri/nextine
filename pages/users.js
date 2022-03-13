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

export default function Users(props) {
  const clipboard = useClipboard();
  const notifications = useNotifications();
  const modals = useModals();

  const [users, setUsers] = useState(props.users);
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
                Szerkesztés
              </Menu.Item>
              <Menu.Item icon={<Send />} onClick={() => sendMessage(user)}>
                Üzenet küldése
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<Save />} onClick={() => copyProfile(user)}>
                Másolás
              </Menu.Item>
              <Menu.Item
                icon={<Trash2 />}
                onClick={() => deleteProfile(user)}
                color="red"
              >
                Felhasználó törlése
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
      setUsers(props.users);
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
    setUsers(props.users);
  };

  const onSubmitEditForm = (oldUser, newUser) => {
    toggleDrawer(false);

    // edit data in db

    let tmpUsers = users;
    tmpUsers.splice(tmpUsers.indexOf(oldUser), 0, newUser);
    tmpUsers = tmpUsers.filter((u) => u !== oldUser);
    setUsers(tmpUsers);

    notifications.showNotification({
      title: "Profil szerkesztése",
      message: `${newUser.name} profilját sikeresen szerkesztette`,
      color: "teal",
    });
  };

  const sendMessage = (user) => {
    const onSubmit = (subject, message) => {
      modals.closeModal(modal);
      onSendMessage(user, subject, message);
    };

    const modal = modals.openModal({
      title: "Üzenetküldés",
      children: <SendMessageForm user={user} onSubmit={onSubmit} />,
      centered: true,
    });
  };

  const onSendMessage = (user, subject, message) => {
    // send message to user on backend

    notifications.showNotification({
      title: "Üzenetküldés",
      message: `Az üzenetet sikeresen kézbesítettük ${user.email} címre`,
      color: "teal",
    });
  };

  const copyProfile = (user) => {
    clipboard.copy(JSON.stringify(user));

    notifications.showNotification({
      title: "Profil másolása",
      message: `${user.name} profilja JSON formátumban sikeresen vágólapra lett helyezve`,
      color: "teal",
    });
  };

  const deleteProfile = (user) => {
    modals.openConfirmModal({
      title: "Profil törlése",
      children: (
        <Text size="sm" lineClamp={2}>
          Biztosan szeretné <b>{user.name}</b> profilját törölni?
          <br />
          Ez a művelet nem visszavonható!
        </Text>
      ),
      centered: true,
      labels: { confirm: "Rendben", cancel: "Mégsem" },
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
      title: "Profil törlése",
      message: `${user.name} profilját sikeresen törölte`,
      color: "red",
    });
  };

  return (
    <>
      <Head>
        <title>Felhasználók | Nextine</title>
        <meta
          name="description"
          content="A Nextine oldal felhasználókat kezelő oldala."
        />
      </Head>

      <Text align="center" weight="bold" mb="xs" size="lg" size="lg">
        Felhasználók
      </Text>

      <Drawer
        opened={drawerOpened}
        onClose={() => toggleDrawer(false)}
        title="Felhasználó módosítása"
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
                <th>Név</th>
                <th>E-mail cím</th>
                <th>Lakcím</th>
                <th>Munkahely</th>
                <th>Telefonszám</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Nincs megjeleníthető adat.
        </Text>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const request = await fetch("http://localhost:3000/api/users");
  const users = await request.json();

  return {
    props: {
      users,
    },
  };
}
