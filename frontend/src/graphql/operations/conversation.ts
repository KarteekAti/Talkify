import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createConversation: gql`
      mutation Mutation($participantsIds: [String!]!) {
        createConversation(participantsIds: $participantsIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
