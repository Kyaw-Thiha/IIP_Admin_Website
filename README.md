# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Adding a new subject to alumni

1. Add a new row in IGCSEAlumni or ALevelAlumni of `prisma/schema.prisma`.

   ❗Add an @default(0) value beside the row initially in order to prevent the table being reseted.

   Run `yarn prisma db push` in the terminal

   (Optional) Remove the @default value and run back `yarn prisma db push` in the terminal

2. Add in `src/server/api/routers/igcseAlumni` or `src/server/api/routers/aLevelAlumni`. It should be added to `create` and `edit` methods

3. Add in `src/components/dialogs/igcseAlumniDialog.tsx` or `src/components/dialogs/aLevelAlumniDialog.tsx`.
   - Inside `AddDialog`, create a reactive variable and setter using react's `useState` hook
   - Add corresponding data in `subjects` array
   - Add corresponding data in `confirm` method
   - Repeat the above 3 steps for `EditDialog`

Don't forget to add new subject inside the client
