import Head from "next/head";
import {
  createStyles,
  useMantineTheme,
  Container,
  Text,
  Title,
  Button,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>Nextine</title>
        <meta name="description" content="A Nextine főoldala." />
      </Head>

      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Üdvözöljük újra,{" "}
            <Text component="span" color={theme.primaryColor} inherit>
              NÉV
            </Text>
            !
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              Tekintse meg az esetleges új jelentkezéseket vagy pillantson rá
              üzeneteire!
            </Text>
          </Container>

          <div className={classes.controls}>
            <Link href="/users">
              <Button
                className={classes.control}
                size="lg"
                variant="default"
                color="gray"
              >
                Felhasználók
              </Button>
            </Link>
            <Link href="/messages">
              <Button className={classes.control} size="lg">
                Üzenetek
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
