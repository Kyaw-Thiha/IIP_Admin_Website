import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import * as bcrypt from "bcrypt";
// https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l#hashing-passwords
// https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/

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
          id: true,
          name: true,
          email: true,
          password: true,
          permission: true,
        },
      });
    }),

  getCurrentUser: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id,
      },
      select: {
        id: true,
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
        id: true,
        name: true,
        email: true,
        permission: true,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        editAnnouncements: z.boolean(),
        editAlumni: z.boolean(),
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

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        editAnnouncements: z.boolean(),
        editAlumni: z.boolean(),
        editUsers: z.boolean(),
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
        oldPassword: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({ where: { id: input.id } });

      const isSamePassword = await bcrypt.compare(
        input.oldPassword,
        user?.password ?? ""
      );

      if (isSamePassword) {
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
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
