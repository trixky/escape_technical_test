import { createServer, IncomingMessage } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createPubSub } from 'graphql-yoga';
import prismaClient from './database/client.js'
import { emplacementCreateOrUpdate, emplacementGetAll } from './database/emplacement.js';
import { getIpRateLimited, setIpRatingLimit } from './cache/ip.js';

export const pubsub = createPubSub<{
    emplacementUpdated: [{ x: number, y: number, color: string }];
}>();

type RateLimitResponse = {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: string;
};

const RATE_LIMIT_RESPONSE: RateLimitResponse = {
    id: -1,
    x: -1,
    y: -1,
    color: 'black'
};

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
                emplacements: () => prismaClient.emplacement.findMany(),
                cases: async () => {
                    const emplacements = await emplacementGetAll();
                    return emplacements.map(({ id, ...rest }) => rest);
                },
            },
            Mutation: {
                createOrUpdateEmplacement: async (_, { x, y, color }, context) => {
                    const req = ((context as any).req as IncomingMessage)
                    // TODO: put the rate limit in a middleware
                    const ips = req.socket.remoteAddress || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                    if (ips === undefined) return RATE_LIMIT_RESPONSE

                    const ip = (ips instanceof Array) ? ips[0] : ips; // TODO : check if this is correct

                    if (ip === undefined) return RATE_LIMIT_RESPONSE

                    const limited = await getIpRateLimited(ip)

                    if (limited) return RATE_LIMIT_RESPONSE;
                    await setIpRatingLimit(ip);

                    const emplacement = await emplacementCreateOrUpdate(x, y, color);

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
