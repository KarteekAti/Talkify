import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import resolvers from "./resolvers/index.js";
import { addResolversToSchema } from "@graphql-tools/schema";

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

export const schema = addResolversToSchema({ schema: typeDefs, resolvers });
