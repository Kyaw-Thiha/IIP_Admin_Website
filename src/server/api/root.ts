import { createTRPCRouter } from "@/server/api/trpc";
import { igcseClassRouter } from "@/server/api/routers/igcseClass";
import { igcseAlumniRouter } from "@/server/api/routers/igcseAlumni";
import { aLevelClassRouter } from "@/server/api/routers/alevelClass";
import { aLevelAlumniRouter } from "@/server/api/routers/aLevelAlumni";
import { announcementRouter } from "@/server/api/routers/announcement";
import { userRouter } from "@/server/api/routers/users";
import { deletedImageRouter } from "@/server/api/routers/deletedImage";

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
  deletedImage: deletedImageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
