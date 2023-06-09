import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1),
        name: z.string().min(1),
        userId: z.string().min(1)
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input } });
  }),

  getCommunities: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.communities.findMany();
  }),
  getCommunityById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.communities.findFirst({ where: { id: input } });
  })
});
