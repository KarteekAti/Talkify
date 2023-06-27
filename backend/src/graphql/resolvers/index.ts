import userResovlers from "./user";
import conversationResovlers from "./conversation";
import messageResolvers from "./message";
import merge from "lodash.merge";

const resolvers = merge(
  {},
  userResovlers,
  conversationResovlers,
  messageResolvers
);

export default resolvers;
