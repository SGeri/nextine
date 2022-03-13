import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Container,
  Table,
  ScrollArea,
  Text,
  TextInput,
  Group,
  Button,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useNotifications } from "@mantine/notifications";

import { Send } from "react-feather";

import PlaceholderAlert from "../util/components/PlaceholderAlert";
import SendMessageForm from "../util/components/forms/SendMessage";

export default function Messages(props) {
  const notifications = useNotifications();
  const modals = useModals();

  const [messages, setMessages] = useState(props.messages);
  const [tableRows, setTableRows] = useState([]);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    setTableRows(
      messages.map((message, index) => (
        <tr
          key={index}
          style={{ fontWeight: !message.isRead && "bold" }}
          onClick={() => openMessage(message)}
        >
          <td>{message.sender}</td>
          <td>{message.subject}</td>
          <td>{clampText(message.content, 50)}</td>
          <td>{message.timestamp}</td>
        </tr>
      ))
    );
  }, [messages]);

  const openMessage = (message) => {
    modals.openModal({
      title: "Üzenet megtekintése",
      children: (
        <>
          <Text size="lg" weight={700} mb={20}>
            {message.sender}: {message.subject}
          </Text>
          <Text size="sm" mb={20}>
            {message.content}
          </Text>
          <Text size="xs">{message.timestamp}</Text>
        </>
      ),
      centered: true,
      labels: { cancel: "Rendben" },
    });

    let tmpMessages = messages;

    tmpMessages = tmpMessages.map((msg) => {
      if (msg == message) {
        return { ...msg, isRead: true };
      }

      return msg;
    });
    setMessages(tmpMessages);
  };

  const sendMessage = () => {
    if (!address) {
      setAddressError("A cím nem lehet üres!");
      return;
    }
    setAddressError("");

    const user = { email: address };

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

  return (
    <>
      <Head>
        <title>Üzenetek | Nextine</title>
        <meta name="description" content="A Nextine oldal üzenetek oldala." />
      </Head>

      <Container mb="md">
        <Text align="center" weight="bold" mb="xs" size="lg">
          Üzenetek
        </Text>

        <PlaceholderAlert />
      </Container>

      <Group
        mb={20}
        style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
      >
        <TextInput
          placeholder="Címzett megadása"
          style={{ minWidth: 350, width: "20%" }}
          value={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
          error={addressError}
        />
        <Button leftIcon={<Send />} onClick={sendMessage}>
          Küldés
        </Button>
      </Group>

      {tableRows.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Küldő címe</th>
                <th>Tárgy</th>
                <th>Üzenet</th>
                <th>Idő</th>
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

function clampText(text, clamp) {
  if (text.length < clamp) {
    return text;
  }

  return text.substring(0, clamp) + "...";
}

export async function getServerSideProps() {
  const request = await fetch("http://localhost:3000/api/messages");
  const messages = await request.json();

  return {
    props: {
      messages,
    },
  };
}
