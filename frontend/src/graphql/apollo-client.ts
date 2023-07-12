import { ApolloClient, split, HttpLink, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "https://talkify-i8l1.onrender.com/graphql",
  credentials: "include",
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

const CreateClient = (ctx: GetServerSidePropsContext | null) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        cookie:
          (typeof window === "undefined"
            ? ctx?.req?.headers.cookie || undefined
            : undefined) || "",
      },
    };
  });

  return new ApolloClient({
    credentials: "include",
    link: authLink.concat(link),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
};

export default CreateClient;
