import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
      borderRadius: 5,
    },
  },
}));

export default function User() {
  const { classes } = useStyles();

  const name = "John Doe Test";
  const email = "john@doe.com";

  const initials = name.split(" ").map((word) => word[0]);

  // TODO

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar radius="xl">{initials}</Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
