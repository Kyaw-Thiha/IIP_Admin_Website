import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import * as bcrypt from "bcrypt";
// https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l#hashing-passwords

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          permission: true,
        },
      });
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          name: input.name,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
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
        id: true,
        name: true,
        permission: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        password: z.string(),
        editAlumni: z.boolean(),
        editAnnouncements: z.boolean(),
        editUsers: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Hashing the password
      const saltRounds = 16;
      const hashedPassword = await bcrypt.hash(input.password, saltRounds);

      return ctx.prisma.user.create({
        data: {
          name: input.name,
          password: hashedPassword,
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
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
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

  changePassword: publicProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Hashing the password
      const saltRounds = 16;
      const hashedPassword = await bcrypt.hash(input.password, saltRounds);

      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          password: hashedPassword,
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
