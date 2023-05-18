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

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        classId: z.string(),
        esl: z.number(),
        efl: z.number(),
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
          classId: input.classId,
          esl: input.esl,
          efl: input.efl,
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

  editImage: protectedProcedure
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

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        esl: z.number(),
        efl: z.number(),
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
          esl: input.esl,
          efl: input.efl,
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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEAlumni.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
