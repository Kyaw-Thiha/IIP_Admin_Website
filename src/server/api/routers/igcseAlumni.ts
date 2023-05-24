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
      orderBy: [{ totalGrades: "desc" }, { name: "asc" }],
    });
  }),

  search: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.iGCSEAlumni.findMany({
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
        esl: z.number(),
        efl: z.number(),
        englishLiterature: z.number(),
        emaths: z.number(),
        amaths: z.number(),
        chemistry: z.number(),
        physics: z.number(),
        biology: z.number(),
        ict: z.number(),
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
      return ctx.prisma.iGCSEAlumni.create({
        data: {
          name: input.name,
          image: input.image,
          gender: input.gender,
          classId: input.classId,
          esl: input.esl,
          efl: input.efl,
          englishLiterature: input.englishLiterature,
          emaths: input.emaths,
          amaths: input.amaths,
          chemistry: input.chemistry,
          physics: input.physics,
          biology: input.biology,
          ict: input.ict,
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
      return ctx.prisma.iGCSEAlumni.update({
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
        esl: z.number(),
        efl: z.number(),
        englishLiterature: z.number(),
        emaths: z.number(),
        amaths: z.number(),
        chemistry: z.number(),
        physics: z.number(),
        biology: z.number(),
        ict: z.number(),
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
      return ctx.prisma.iGCSEAlumni.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          gender: input.gender,
          esl: input.esl,
          efl: input.efl,
          englishLiterature: input.englishLiterature,
          emaths: input.emaths,
          amaths: input.amaths,
          chemistry: input.chemistry,
          physics: input.physics,
          biology: input.biology,
          ict: input.ict,
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
      return ctx.prisma.iGCSEAlumni.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
