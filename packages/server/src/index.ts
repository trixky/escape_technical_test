import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createPubSub } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const pubsub = createPubSub<{
    hello: [string];
}>();

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
      type Query {
        hello: String
        emplacements: [Emplacement]
      }

      type Mutation {
        createOrUpdateEmplacement(x: Float!, y: Float!, color: String!): Emplacement
        }

      type Subscription {
        hello: String
      }

      type Emplacement {
        id: Int
        x: Float
        y: Float
        color: String
      }
    `,
        resolvers: {
            Query: {
                hello: () => 'world',
                emplacements: () => prisma.emplacement.findMany(),
            },
            Mutation: {
                createOrUpdateEmplacement: async (_, { x, y, color }) => {
                    return await prisma.emplacement.upsert({
                        where: {
                            x_y: { x, y }
                        },
                        update: {
                            color
                        },
                        create: {
                            x,
                            y,
                            color
                        },
                    });
                },
            },
            Subscription: {
                hello: {
                    subscribe: () => pubsub.subscribe('hello'),
                    resolve: (payload) => payload,
                },
            },
        },
    }),
});

let i = 0;
setInterval(() => {
    i++;
    pubsub.publish('hello', `world ${i}`);
}, 5000);

const server = createServer(yoga);
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
});
