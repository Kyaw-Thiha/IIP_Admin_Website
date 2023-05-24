import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const deletedImageRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.deletedImage.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.deletedImage.findMany({
      orderBy: { dateDeleted: "desc" },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deletedImage.create({
        data: {
          url: input.url,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deletedImage.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
