import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createPubSub } from 'graphql-yoga';

export const pubsub = createPubSub<{
  hello: [string];
}>();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }

      type Subscription {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'world'
      },
      Subscription: {
        hello: {
          subscribe: () => pubsub.subscribe('hello'),
          resolve: (payload) => payload
        }
      }
    }
  })
});

let i = 0;
setInterval(() => {
  i++;
  pubsub.publish('hello', `world ${i}`);
}, 5_000);

const server = createServer(yoga);
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
