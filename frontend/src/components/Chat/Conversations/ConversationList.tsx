import { Box, Button, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConversationPopulated } from "../../../util/types";
import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modal/ConversationModal";
import { signOut } from "next-auth/react";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversations: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    user: { id },
  } = session;
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box width="100%" overflow="hidden">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or Start a Conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={onClose} session={session} />

      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          userId={id}
          onClick={() => onViewConversations(conversation.id)}
          isSelected={conversation.id === router.query.conversationId}
        />
      ))}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
        bg="#313131"
        px={8}
        py={6}
        zIndex={1}
      >
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationList;
