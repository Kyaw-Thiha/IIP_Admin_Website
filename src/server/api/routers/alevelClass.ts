import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const aLevelClassRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.aLevelClass.findMany({
      orderBy: [{ year: "desc" }, { series: "desc" }],
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.aLevelClass.findFirst({
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
          z.literal("Jan"),
          z.literal("May/Jun"),
          z.literal("Oct"),
        ]),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.aLevelClass.findFirst({
        where: {
          year: input.year,
          series: input.series,
        },
        include: {
          alumni: { orderBy: [{ totalGrades: "desc" }, { name: "asc" }] },
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        year: z.number(),
        series: z.union([
          z.literal("Jan"),
          z.literal("May/Jun"),
          z.literal("Oct"),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelClass.create({
        data: {
          year: input.year,
          series: input.series,
        },
      });
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.number(),
        series: z.union([
          z.literal("Jan"),
          z.literal("May/Jun"),
          z.literal("Oct"),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelClass.update({
        where: {
          id: input.id,
        },
        data: {
          year: input.year,
          series: input.series,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.aLevelClass.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
