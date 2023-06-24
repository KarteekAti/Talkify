import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { getSession } from "next-auth/react";
import { schema } from "./graphql/index";
import { GraphQLContext, Session } from "./util/types";
import { PrismaClient } from "@prisma/client";

async function startApolloSever() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const prisma = new PrismaClient();

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
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLContext> => {
        try {
          const session = await getSession({ req });
          console.log(session);
          return { session: session as Session, prisma };
        } catch (error) {
          throw error;
        }
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startApolloSever().catch((err) => console.log(err));
