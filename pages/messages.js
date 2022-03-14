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

const MOCKUP_MESSAGES = [
  {
    sender: "john@doe.com",
    subject: "Lorem Ipsum",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    timestamp: "2022.03.11. 18:50",
    isRead: false,
  },
  {
    sender: "test@gmail.com",
    subject: "Lorem Ipsum 2",
    content:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    timestamp: "2022.03.11. 18:51",
    isRead: true,
  },
  {
    sender: "email@cecil.com",
    subject: "Lorem Ipsum 3",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    timestamp: "2022.03.11. 18:52",
    isRead: true,
  },
  {
    sender: "john@doe.com",
    subject: "test",
    content: "test",
    timestamp: "2022.03.11. 18:53",
    isRead: true,
  },
];

export default function Messages(/*props*/) {
  const notifications = useNotifications();
  const modals = useModals();

  const [messages, setMessages] =
    useState(MOCKUP_MESSAGES); /* props.messages */
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

/*
export async function getServerSideProps() {
  const request = await fetch("http://localhost:3000/api/messages");
  const messages = await request.json();

  return {
    props: {
      messages,
    },
  };
}
*/
