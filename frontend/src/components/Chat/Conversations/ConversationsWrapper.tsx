import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import { gql, useMutation, useQuery } from "@apollo/client";
import ConversationOperations from "../../../graphql/operations/conversation";
import {
  ConversationCreatedSubscriptionData,
  ConversationPopulated,
  ConversationsData,
  ParticipantPopulated,
} from "../../../util/types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SkeletonLoader from "../../common/SkeletonLoader";
import { MutationMarkConversationAsReadArgs } from "../../../gql/graphql";
import toast from "react-hot-toast";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  //State
  const router = useRouter();
  const { conversationId } = router.query;
  const { id: userId } = session.user;

  const {
    data: conversationData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

  const [markConversationAsRead] = useMutation<
    { markConversationAsRead: boolean },
    MutationMarkConversationAsReadArgs
  >(ConversationOperations.Mutations.markConversationAsRead);

  const onViewConversations = async (
    conversationId: string,
    hasSeenLatestMessage: boolean
  ) => {
    router.push({ query: { conversationId } }, undefined, { shallow: true });
    if (hasSeenLatestMessage) return;
    try {
      await markConversationAsRead({
        variables: {
          userId,
          conversationId,
        },
        optimisticResponse: {
          markConversationAsRead: true,
        },
        update: (cache) => {
          const participantsFragment = cache.readFragment<{
            participants: Array<ParticipantPopulated>;
          }>({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment Participants on Conversation {
                participant {
                  user {
                    id
                    username
                    image
                  }
                  hasSeenLatestMessage
                }
              }
            `,
          });
          if (!participantsFragment) return;

          const participants = [...participantsFragment.participants];
          const userParticipantIdx = participants.findIndex(
            (p) => p.user.id === userId
          );

          if (userParticipantIdx === -1) return;

          const userParticipant = participants[userParticipantIdx];

          participants[userParticipantIdx] = {
            ...userParticipant,
            hasSeenLatestMessage: true,
          };

          cache.writeFragment({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment UpdatedParticipant on Conversation {
                participants
              }
            `,
            data: {
              participants,
            },
          });
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev;
        const newConversation = subscriptionData.data.conversationCreated;
        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewConversations();
  }, []);
  console.log(conversationData);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      flexDirection="column"
      gap={4}
      py={6}
      px={3}
      position="relative"
    >
      {conversationsLoading ? (
        <SkeletonLoader
          count={conversationData?.conversations.length}
          height="80px"
          width="400px"
        />
      ) : (
        <ConversationList
          session={session}
          conversations={conversationData?.conversations || []}
          onViewConversations={onViewConversations}
        />
      )}
    </Box>
  );
};

export default ConversationsWrapper;
