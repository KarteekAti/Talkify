import { Prisma, PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";
import { Context } from "graphql-ws/lib/server";
import { PubSub } from "graphql-subscriptions";
import {
  conversationPopulated,
  participantPopulated,
} from "../graphql/resolvers/conversation.js";
import { messagePopulated } from "../graphql/resolvers/message.js";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

export interface Session {
  user?: User;
  expires: ISODateString;
}

export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  emailVerified: boolean;
  name: string;
}

export interface MessageSentSubscriptionPayload {
  messageSent: MessagePopulated;
}

export interface ConversationUpdatedSubscriptionPayload {
  conversationUpdated: {
    conversation: ConversationPopulated;
  };
}

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;
