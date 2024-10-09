import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createPubSub } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pubsub = createPubSub<{
    emplacementUpdated: [{ x: number, y: number, color: string }];
}>();

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                hello: String
                emplacements: [Emplacement]
                cases: [Case]
            }

            type Mutation {
                createOrUpdateEmplacement(x: Float!, y: Float!, color: String!): Emplacement
            }

            type Subscription {
                emplacementUpdated: Emplacement
            }

            type Emplacement {
                id: Int
                x: Float
                y: Float
                color: String
            }

            type Case {
                x: Float
                y: Float
                color: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'world',
                emplacements: () => prisma.emplacement.findMany(),
                cases: async () => {
                    const emplacements = await prisma.emplacement.findMany();
                    return emplacements.map(({ id, ...rest }) => rest);
                },
            },
            Mutation: {
                createOrUpdateEmplacement: async (_, { x, y, color }) => {
                    const emplacement = await prisma.emplacement.upsert({
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

                    pubsub.publish('emplacementUpdated', {
                        x: emplacement.x,
                        y: emplacement.y,
                        color: emplacement.color
                    });

                    return emplacement;
                },
            },
            Subscription: {
                emplacementUpdated: {
                    subscribe: () => pubsub.subscribe('emplacementUpdated'),
                    resolve: (payload) => {
                        return payload;
                    },
                },
            },
        },
    }),
});

const server = createServer(yoga);
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
});
