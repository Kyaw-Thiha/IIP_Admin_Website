import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { igcseClassRouter } from "./routers/igcseClass";
import { alevelClassRouter } from "./routers/alevelClass";
import { igcseAlumniRouter } from "./routers/igcseAlumni";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  igcseClass: igcseClassRouter,
  igcseAlumni: igcseAlumniRouter,
  alevelClass: alevelClassRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
