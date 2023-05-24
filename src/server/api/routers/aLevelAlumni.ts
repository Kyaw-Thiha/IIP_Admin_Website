import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const aLevelAlumniRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.aLevelAlumni.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.aLevelAlumni.findMany({
      orderBy: [{ totalGrades: "desc" }, { name: "asc" }],
    });
  }),

  search: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.aLevelAlumni.findMany({
        where: {
          name: {
            search: input.name,
          },
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        gender: z.union([z.literal("Male"), z.literal("Female")]),
        classId: z.string(),
        english: z.number(),
        pureMaths: z.number(),
        furtherMaths: z.number(),
        chemistry: z.number(),
        physics: z.number(),
        biology: z.number(),
        it: z.number(),
        cs: z.number(),
        business: z.number(),
        accounting: z.number(),
        economics: z.number(),
        history: z.number(),
        geography: z.number(),
        psychology: z.number(),
        totalGrades: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelAlumni.create({
        data: {
          name: input.name,
          image: input.image,
          gender: input.gender,
          classId: input.classId,
          english: input.english,
          pureMaths: input.pureMaths,
          furtherMaths: input.furtherMaths,
          chemistry: input.chemistry,
          physics: input.physics,
          biology: input.biology,
          it: input.it,
          cs: input.cs,
          business: input.business,
          accounting: input.accounting,
          economics: input.economics,
          history: input.history,
          geography: input.geography,
          psychology: input.psychology,
          totalGrades: input.totalGrades,
        },
      });
    }),

  editImage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelAlumni.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        },
      });
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        gender: z.union([z.literal("Male"), z.literal("Female")]),
        english: z.number(),
        pureMaths: z.number(),
        furtherMaths: z.number(),
        chemistry: z.number(),
        physics: z.number(),
        biology: z.number(),
        it: z.number(),
        cs: z.number(),
        business: z.number(),
        accounting: z.number(),
        economics: z.number(),
        history: z.number(),
        geography: z.number(),
        psychology: z.number(),
        totalGrades: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelAlumni.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          gender: input.gender,
          english: input.english,
          pureMaths: input.pureMaths,
          furtherMaths: input.furtherMaths,
          chemistry: input.chemistry,
          physics: input.physics,
          biology: input.biology,
          it: input.it,
          cs: input.cs,
          business: input.business,
          accounting: input.accounting,
          economics: input.economics,
          history: input.history,
          geography: input.geography,
          psychology: input.psychology,
          totalGrades: input.totalGrades,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelAlumni.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
