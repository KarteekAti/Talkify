import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  MutationCreateConversationArgs,
  QuerySearchUsersArgs,
} from "../../../../gql/graphql";
import UserOperations from "../../../../graphql/operations/user";
import conversationOperations from "../../../../graphql/operations/conversation";
import {
  CreateConversationData,
  SearchUsersData,
  SearchedUser,
} from "../../../../util/types";
import UserSearchList from "./UserSearchList";
import Participants from "../Participants";
import { Session } from "next-auth";

interface ConversationModalProps {
  isOpen: boolean;
  session: Session;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  session,
  onClose,
}) => {
  //States
  const { id: userId } = session.user;
  const [username, setUsername] = useState<string>("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  // Queries

  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    QuerySearchUsersArgs
  >(UserOperations.Queries.searchUsers);

  // Mutations

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, MutationCreateConversationArgs>(
      conversationOperations.Mutations.createConversation
    );

  // Events

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      searchUsers({ variables: { username } });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addParticipants = (user: SearchedUser) => {
    const participantExists = participants.some(
      (participant) => participant.id === user.id
    );

    console.log(participantExists);
    if (!participantExists) setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipants = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const onCreateConversations = async () => {
    try {
      const participantsIds = [userId, ...participants.map((p) => p.id)];
      const { data } = await createConversation({
        variables: { participantsIds },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Return

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.100">
          <ModalHeader textAlign="center">
            Find or Start Conversations
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  width="100%"
                  type="submit"
                  isLoading={loading}
                  isDisabled={!username}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipants}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipants={removeParticipants}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  onClick={onCreateConversations}
                  isLoading={createConversationLoading}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
