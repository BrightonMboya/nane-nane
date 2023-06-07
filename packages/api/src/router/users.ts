import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    createEmail: publicProcedure
        .input(z.object({
            email: z.string().email(),
            username: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.create({ data: input });
        }),

    profile: publicProcedure
        .input(z.object({
            email: z.string().email(),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: { email: input.email },
                select: {
                    username: true,
                    about: true,
                    currentRole: true,
                    classOf: true,

                }
            });
        })

})

