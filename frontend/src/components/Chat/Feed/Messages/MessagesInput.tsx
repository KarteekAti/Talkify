import { useMutation } from "@apollo/client";
import { Box, Button, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { ReactPropTypes, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { ObjectId } from "bson";
import MeassageOperations from "../../../../graphql/operations/message";
import { MutationSendMessageArgs } from "../../../../gql/graphql";
import { GraphQLError } from "graphql";
import { MessagesData } from "../../../../util/types";

interface MessagesInputProps {
  session: Session;
  conversationId: string;
}

const MessagesInput: React.FC<MessagesInputProps> = ({
  session,
  conversationId,
}) => {
  const [messagesBody, setMessageBody] = useState("");
  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    MutationSendMessageArgs
  >(MeassageOperations.Mutation.sendMessage);

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (messagesBody.trim() === "") throw new Error("Empty Input Field");
      const { id: senderId } = session.user;
      const messageId = new ObjectId().toString();
      const messageBody = messagesBody;
      setMessageBody("");
      const newMessage: MutationSendMessageArgs = {
        id: messageId,
        conversationId,
        senderId,
        body: messageBody,
      };

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          const existing = cache.readQuery<MessagesData>({
            query: MeassageOperations.Query.messages,
            variables: { conversationId },
          });

          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MeassageOperations.Query.messages,
            variables: { conversationId },
            data: {
              ...existing,
              messages: [
                {
                  id: messageId,
                  body: messageBody,
                  senderId,
                  conversationId,
                  sender: {
                    id: senderId,
                    username: session.user.username,
                    image: session.user.image,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...existing?.messages,
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send Message");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box display="flex" px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          placeholder="Type a Message..."
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.600",
          }}
          resize="none"
          value={messagesBody}
          onChange={(e) => setMessageBody(e.currentTarget.value)}
        />
        <Button display={{ base: "flex", md: "none" }} onClick={onSendMessage}>
          <BsFillSendFill />
        </Button>
      </form>
    </Box>
  );
};

export default MessagesInput;
