import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";
import { Resolvers } from "../types";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Mutation: {
    createConversation: async (parent, args, context: GraphQLContext, info) => {
      const { session, prisma } = context;
      const { participantsIds } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const { id: userId } = session.user;
      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        });

        return { conversationId: conversation.id };
      } catch (error) {
        console.log("createConversation error", error);
        throw new GraphQLError("Error creating conversation");
      }
    },
  },
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
