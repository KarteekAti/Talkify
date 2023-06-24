import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import {
  CreateUsernameResponse,
  CreateUsernameMutationVariables,
} from "../../gql/graphql";
import { useState } from "react";
import UserOperations from "../../graphql/operations/user";
import toast from "react-hot-toast";
import { CreateUsernameData } from "../../util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  console.log(session);
  const [username, setUsername] = useState("");
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameMutationVariables
  >(UserOperations.Mutation.createUsername);

  const onSubmit = async () => {
    try {
      if (!username) throw new Error("Empty Field");
      const { data } = await createUsername({ variables: { username } });

      if (!data) {
        throw new Error("Hi");
      }
      if (data.createUsername.error) {
        const { error } = data.createUsername;
        throw new Error(error);
      }
      toast.success("Username Successfully Created! 🚀");

      reloadSession();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
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
            <Button onClick={onSubmit} width="100%" isLoading={loading}>
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
