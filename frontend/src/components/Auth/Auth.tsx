import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></Input>
            <Button onClick={onSubmit} width="100%">
              Save
            </Button>
          </>
        ) : (
          <>
            <Image height={56} src="/images/Talkify.png" />
            <Text fontSize="3xl">Talkify</Text>
            <Text fontSize="md" maxWidth="70%" textAlign="center">
              Empowering Minds, Connecting Hearts, and Unleashing the Power of
              Conversations Worldwide!
            </Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="24px" src="/images/google.png" />}
            >
              Login with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
