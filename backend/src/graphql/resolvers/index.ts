import userResovlers from "./user";
import conversationResovlers from "./conversation";
import merge from "lodash.merge";

const resolvers = merge({}, userResovlers, conversationResovlers);

export default resolvers;
