import { ApolloClient, split, HttpLink, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({
  uri: "https://talkify-i8l1.onrender.com/graphql",
  credentials: "include",
});

const apolloAuthContext = setContext(async (_, { headers }) => {
  const jwt_token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: jwt_token ? jwt_token : "",
    },
  };
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://talkify-i8l1.onrender.com/graphql/subscriptions",
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const link =
  typeof window !== "undefined" && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  ssrMode: true,
  link: apolloAuthContext.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: "include",
});
