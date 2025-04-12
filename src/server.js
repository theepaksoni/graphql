import { createSchema, createYoga, createPubSub } from "graphql-yoga";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import resolvers from "./graphql/resolvers/resolvers.js";
import db from "./model/db.js";

const pubsub = createPubSub();

const schema = createSchema({
  typeDefs: readFileSync("./src/graphql/schema.graphql", "utf-8"), // Structure
  resolvers, // Behaviour
});

const yoga = createYoga({
  schema,
  context: () => {
    return { db, pubsub };
  },
});

const server = createServer(yoga);

server.listen(4040, () =>
  console.log("GraphQL Server started 🚀 at PORT : 4040")
);
