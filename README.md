# GitHub Stats

Your GitHub contributions smartly organized and visualized - showcase meaningful metrics on your CV

## What's this?

Before stating whether this tool is useful or not (it might be) let's disclose its primary goal: improving our skills.

Why our? Because this tool is open source and everyone is more than welcome to contribute to it!

You can grab an issue at any time, or join the [Discord](https://discord.gg/bqwyEa6We6) server to discuss the project and its future. Nothing is set in stone, so feel free to share your ideas and suggestions.

## Technologies involved

The app is currently based on [Next.js](https://nextjs.org/) with TypeScript and Tailwind CSS (actually with [DaisyUI](https://daisyui.com/), a Tailwind CSS component library).

We manage some data, specifically from the [GitHub APIs](https://docs.github.com/en/graphql) using the [GraphQL](https://graphql.org/) endpoint and [React Query](https://tanstack.com/query/latest/).

There's a login feature with [NextAuth](https://next-auth.js.org/) using GitHub as a provider.

### Coming soon

The plan is to also add at some point some kind of user profile and settings, stored where? It's up to you to decide! It could be on MongoDB with an ORM like Prisma or something entirely different. A first start could be using localStorage to validate the concept and then decide which database to use.

Testing will also be involved in the process, not sure if Vitest or Jest for component testing and either Cypress or Playwright for E2E testing.

## How to contribute?

As mentioned in the beginning, you can grab an issue (write a comment first!) or join the [Discord](https://discord.gg/bqwyEa6We6) server so we can have a chat about the project.

The goal of this project isn't the outcome itself but rather the process of building it, together! As a result, we'll end up having a nice tool to showcase our GitHub contributions and a project we can use as a reference when we need to implement something similar in other projects.

Instructions on how to run the app locally can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

Thanks for reading and happy coding!
