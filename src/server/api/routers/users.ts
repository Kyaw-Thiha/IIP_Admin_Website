import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          name: true,
          email: true,
          permission: true,
        },
      });
    }),

  getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
        select: {
          name: true,
          email: true,
          permission: true,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.findMany({
      orderBy: [
        {
          permission: {
            editUsers: "asc",
          },
        },
        { name: "asc" },
      ],
      select: {
        name: true,
        email: true,
        permission: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        editAlumni: z.boolean(),
        editAnnouncements: z.boolean(),
        editUsers: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          permission: {
            create: {
              editAlumni: input.editAlumni,
              editAnnouncements: input.editAnnouncements,
              editUsers: input.editUsers,
            },
          },
        },
      });
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),

  editPermissions: publicProcedure
    .input(
      z.object({
        id: z.string(),
        editAlumni: z.boolean(),
        editAnnouncements: z.boolean(),
        editUsers: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          permission: {
            update: {
              editAlumni: input.editAlumni,
              editAnnouncements: input.editAnnouncements,
              editUsers: input.editUsers,
            },
          },
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
