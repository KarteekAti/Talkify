import { Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/MessagesHeader";
import MessagesInput from "./Messages/MessagesInput";
import Messages from "./Messages/Messages";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  const { conversationId } = router.query;
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      width="100%"
    >
      {conversationId && typeof conversationId === "string" && (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            <MessagesHeader userId={userId} conversationId={conversationId} />
            <Messages conversationId={conversationId} userId={userId} />
          </Flex>
          <MessagesInput session={session} conversationId={conversationId} />
        </>
      )}
    </Flex>
  );
};
export default FeedWrapper;
