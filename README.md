# r/ploce

Instructions for the test can be found in [the subject.md file](./SUBJECT.md)

## Setup

1. Clone this repository
   You are provided with a monorepo containing two packages:

   - A package `server`, implementing a GraphQL API using [Yoga](https://the-guild.dev/graphql/yoga-server/docs) and [Pothos](https://pothos-graphql.dev/)
   - A package `website` with a frontend written with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/)

2. Install the necessary system dependencies

   - The following codebase lives in a [Node.Js](https://nodejs.org) project. Thus, `Node 20` or above is required to run it.
   - We recommend using [Volta](https://volta.sh/) to manage Node.js versions

3. Install the repository dependencies

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm run dev --workspace=@rploce/server
   ```

   The following log should appear `Server is running on http://localhost:4000/graphql`, and you should be able to browse `http://localhost:4000/graphql` and retrieve the canvas JSON.

5. Browse the website

   ```sh
   npm run dev --workspace=@rploce/website
   ```

   You should be able to browse `http://localhost:5173/` to visit the website.
