import { createTRPCRouter, publicProcedure } from "../trpc";
import { randomUUID } from "crypto";
import * as trpc from "@trpc/server";
import { observable } from '@trpc/server/observable';
import { z } from "zod"


export enum Events {
    SEND_MESSAGE = "SEND_MESSAGE",
}

export const sendMessageSchema = z.object({
    roomId: z.string(),
    message: z.string(),
});

const messageSchema = z.object({
    id: z.string(),
    message: z.string(),
    roomId: z.string(),
    sentAt: z.date(),
    sender: z.object({
        name: z.string(),
    }),
});

export type Message = z.TypeOf<typeof messageSchema>;

export const messageSubSchema = z.object({
    roomId: z.string(),
});


export const roomRouter = createTRPCRouter({
    sendMessage: publicProcedure.input(
        z.object({
            input: sendMessageSchema,
        })
    )
        .mutation(({ ctx, input }) => {
            const message: Message = {
                id: randomUUID(),
                roomId: input.input.roomId,
                message: input.input.message,
                ...input,
                sentAt: new Date(),
                sender: {
                    name: ctx.session?.user?.name || "Unknown User",
                },
            };
            ctx.eventEmitter.emit(Events.SEND_MESSAGE, message);
            return message;
        }),

    onSendMessage: publicProcedure
        .input(
            z.object({
                input: messageSubSchema,
            })
        )
        .subscription(({ ctx, input }) => {
            return observable<Message>((emit) => {
                function onMessage(data: Message) {
                    if (input.input.roomId === data.roomId) {
                        emit.next(data);
                    }
                }

                ctx.eventEmitter.on(Events.SEND_MESSAGE, onMessage);

                return () => {
                    ctx.eventEmitter.off(Events.SEND_MESSAGE, onMessage);
                };
            });

        })


});

