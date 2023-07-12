import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types.js";
import {
  CreateUsernameResponse,
  Resolvers,
  SearchedUser,
  User,
} from "../types.js";

export const resolvers: Resolvers = {
  Mutation: {
    createUsername: async (
      parent,
      args,
      context: GraphQLContext,
      info
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not Authorized",
        };
      }

      const id = session.user.id;
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: "Username Already Taken.",
          };
        }
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            username,
          },
        });
        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          error: (error as Error).message,
        };
      }
    },
  },

  Query: {
    searchUsers: async (parent, args, context: GraphQLContext, info) => {
      const { username: searchedUsername } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError("Not Authorized");
      }

      console.log(session?.user);
      const { username: myUsername } = session.user;
      try {
        const users = prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (error: any) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};

export default resolvers;
