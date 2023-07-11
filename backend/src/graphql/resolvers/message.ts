import { GraphQLError } from "graphql";
import {
  GraphQLContext,
  MessageSentSubscriptionPayload,
} from "../../util/types";
import { Resolvers } from "../types";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { userIsConversationParticipant } from "../../util/functions";
import { conversationPopulated } from "./conversation";

const resolvers: Resolvers = {
  Query: {
    messages: async (parent, args, context: GraphQLContext, info) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }
      const { id: userId } = session.user;
      const { conversationId } = args;

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: conversationPopulated,
      });

      if (!conversation) {
        throw new GraphQLError("Conversation Doesn't Exist.");
      }
      const allowedToView = userIsConversationParticipant(
        conversation.participants,
        userId
      );

      if (!allowedToView) {
        throw new GraphQLError("Not Authorized to view this Conversation.");
      }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: messagePopulated,
          orderBy: {
            createdAt: "desc",
          },
        });

        return messages;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, args, context: GraphQLContext, info) => {
      const { prisma, pubsub, session } = context;
      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }
      const { id: userId } = session.user;
      const { body, conversationId, id, senderId } = args;
      if (senderId !== userId) {
        throw new GraphQLError("Can't send message on someone's behalf.");
      }
      try {
        const newMessage = await prisma.message.create({
          data: {
            id,
            senderId,
            conversationId,
            body,
          },
          include: messagePopulated,
        });

        const participant = await prisma.conversationParticipant.findFirst({
          where: {
            userId,
            conversationId,
          },
        });

        if (!participant) {
          throw new GraphQLError("Participant Doesn't Exist.");
        }

        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: participant.id,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
          include: conversationPopulated,
        });
        pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });
        pubsub.publish("CONVERSATION_UPDATED", {
          conversationUpdated: {
            conversation,
          },
        });
        return true;
      } catch (error: any) {
        throw new GraphQLError("Can't send Message");
      }
    },
  },
  Subscription: {
    messageSent: {
      //@ts-ignore
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["MESSAGE_SENT"]);
        },
        (
          payload: MessageSentSubscriptionPayload,
          args: { conversationId: string }
        ) => {
          return payload.messageSent.conversationId === args.conversationId;
        }
      ),
    },
  },
};

export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
});

export default resolvers;
