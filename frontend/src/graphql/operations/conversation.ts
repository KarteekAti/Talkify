import { gql } from "@apollo/client";
import { MessageFields } from "./message";

const ConversationFields = `
  id
  updatedAt
  participants {
    user {
      id
      username
      image
    }
    hasSeenLatestMessage
  }
  latestMessage {
    ${MessageFields}
  }
`;

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          ${ConversationFields}
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantsIds: [String!]!) {
        createConversation(participantsIds: $participantsIds) {
          conversationId
        }
      }
    `,
    markConversationAsRead: gql`
      mutation MarkConversationAsRead(
        $userId: String!
        $conversationId: String!
      ) {
        markConversationAsRead(userId: $userId, conversationId: $conversationId)
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated{
          ${ConversationFields}
        }
      }
    `,
    conversationUpdated: gql`
      subscription ConversationUpdated{
        conversationUpdated{
          conversation {
            ${ConversationFields}
          }
        }
      }
    `,
  },
};
