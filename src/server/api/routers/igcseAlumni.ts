import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const igcseAlumniRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.iGCSEAlumni.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.iGCSEAlumni.findMany({
      orderBy: [{ name: "desc" }],
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        grades: z.string(),
        classId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEAlumni.create({
        data: {
          name: input.name,
          image: input.image,
          grades: input.grades,
          classId: input.classId,
        },
      });
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
        grades: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEAlumni.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          image: input.image,
          grades: input.grades,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEAlumni.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
