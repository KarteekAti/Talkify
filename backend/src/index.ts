import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";

async function startApolloSever() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    introspection: true,
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server)
  );

  httpServer.listen(4000, () => {
    console.log("Sever Started on Port 4000");
  });
}

startApolloSever().catch((err) => console.log(err));
