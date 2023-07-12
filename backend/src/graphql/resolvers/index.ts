import userResovlers from "./user.js";
import conversationResovlers from "./conversation.js";
import messageResolvers from "./message.js";
import merge from "lodash.merge";

const resolvers = merge(
  {},
  userResovlers,
  conversationResovlers,
  messageResolvers
);

export default resolvers;
