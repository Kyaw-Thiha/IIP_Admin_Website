import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const announcementRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.announcement.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.announcement.findMany({
      orderBy: [{ createdAt: "desc" }, { title: "asc" }],
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        image: z.string(),
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.announcement.create({
        data: {
          title: input.title,
          image: input.image,
          text: input.text,
        },
      });
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.string(),
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.announcement.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          image: input.image,
          text: input.text,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.announcement.delete({
        where: {
          id: input.id,
        },
      });
    }),
});