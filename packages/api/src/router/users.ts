import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    createEmail: publicProcedure
        .input(z.object({
            email: z.string().email(),
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.create({ data: input });
        })

})

