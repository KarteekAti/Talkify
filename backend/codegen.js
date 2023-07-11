"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: "./src/graphql/schema.graphql",
    generates: {
        "src/graphql/types.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};
exports.default = config;
