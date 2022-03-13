import { Text, TextInput, Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/hooks";

export default function SendMessageForm(props) {
  const form = useForm({
    initialValues: {
      subject: "",
      message: "",
    },

    validationRules: {
      subject: (subject) => subject.length > 0,
      message: (message) => message.length > 0,
    },

    errorMessages: {
      subject: "A tárgy nem lehet üres!",
      message: "Az üzenet nem lehet üres!",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        props.onSubmit(values.subject, values.message)
      )}
    >
      <Text size="sm" mb={10}>
        Üzenet küldése <b>{props.user.email}</b> címre:
      </Text>
      <TextInput
        label="Tárgy"
        placeholder="Tárgy"
        mb={5}
        {...form.getInputProps("subject")}
      />
      <Textarea
        label="Üzenet"
        placeholder="Üzenet"
        autosize
        minRows={3}
        maxRows={10}
        {...form.getInputProps("message")}
      />
      <Button style={{ marginTop: 20 }} type="submit">
        Küldés
      </Button>
    </form>
  );
}
