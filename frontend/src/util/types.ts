import { Prisma } from "@prisma/client";
import {
  Conversation,
  CreateConversationResponse,
  CreateUsernameResponse,
} from "../gql/graphql";

import { User } from "next-auth";
import { conversationPopulated, participantPopulated } from "./populatedFields";

export interface CreateUsernameData {
  createUsername: CreateUsernameResponse;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;

export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface ConversationCreatedSubscriptionData {
  subscriptionData: {
    data: {
      conversationCreated: ConversationPopulated;
    };
  };
}

export interface CreateConversationData {
  createConversation: CreateConversationResponse;
}
