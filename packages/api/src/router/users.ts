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
                    location: true,

                }
            });
        }),

    returnUserName: publicProcedure
        .input(z.object({
            email: z.string().email(),
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: { email: input.email },
                select: {
                    username: true,
                }
            })
        }),

    editProfile: publicProcedure
        .input(z.object({
            email: z.string().email(),
            username: z.string().optional(),
            about: z.string().optional(),
            currentRole: z.string().optional(),
            classOf: z.string().optional(),
            location: z.string().optional(),
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.update({
                where: { email: input.email },
                data: input
            })
        })


})

