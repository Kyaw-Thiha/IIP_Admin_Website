import { createTRPCRouter } from "@/server/api/trpc";
import { igcseClassRouter } from "./routers/igcseClass";
import { aLevelClassRouter } from "./routers/aLevelClass";
import { igcseAlumniRouter } from "./routers/igcseAlumni";
import { aLevelAlumniRouter } from "./routers/aLevelAlumni";
import { announcementRouter } from "./routers/announcement";
import { userRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  igcseClass: igcseClassRouter,
  igcseAlumni: igcseAlumniRouter,
  aLevelClass: aLevelClassRouter,
  aLevelAlumni: aLevelAlumniRouter,
  announcement: announcementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
