import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const igcseClassRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.iGCSEClass.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getByYearAndSeries: publicProcedure
    .input(
      z.object({
        year: z.number(),
        series: z.union([
          z.literal("Feb/Mar"),
          z.literal("May/Jun"),
          z.literal("Oct/Nov"),
        ]),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.iGCSEClass.findFirst({
        where: {
          year: input.year,
          series: input.series,
        },
        include: {
          alumni: {
            orderBy: [{ totalGrades: "desc" }, { name: "asc" }],
          },
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.iGCSEClass.findMany({
      orderBy: [{ year: "desc" }, { series: "desc" }],
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        series: z.union([
          z.literal("Feb/Mar"),
          z.literal("May/Jun"),
          z.literal("Oct/Nov"),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEClass.create({
        data: {
          year: input.year,
          series: input.series,
        },
      });
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.number(),
        series: z.union([
          z.literal("Feb/Mar"),
          z.literal("May/Jun"),
          z.literal("Oct/Nov"),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEClass.update({
        where: {
          id: input.id,
        },
        data: {
          year: input.year,
          series: input.series,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.iGCSEClass.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
