import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { igcseClassRouter } from "./routers/igcseClass";
import { aLevelClassRouter } from "./routers/aLevelClass";
import { igcseAlumniRouter } from "./routers/igcseAlumni";
import { aLevelAlumniRouter } from "./routers/aLevelAlumni";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  igcseClass: igcseClassRouter,
  igcseAlumni: igcseAlumniRouter,
  aLevelClass: aLevelClassRouter,
  aLevelAlumni: aLevelAlumniRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
