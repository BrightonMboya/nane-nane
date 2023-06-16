import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"

export const eventsRouter = createTRPCRouter({
    all: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.events.findMany({ orderBy: { id: "desc" } });
    }),
    byId: publicProcedure.input(
        z.object({
            id: z.string()
        })
    )
        .query(({ ctx, input }) => {
            return ctx.prisma.events.findFirst({ where: { id: input.id } });
        })
})
