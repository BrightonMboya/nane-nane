import { createTRPCRouter, publicProcedure } from "../trpc";
import { randomUUID } from "crypto";
import * as trpc from "@trpc/server";
import { z } from "zod"
import { customAlphabet } from "nanoid";


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
        })
});

export const roomRouters = createRouter()

    .subscription("onSendMessage", {
        input: messageSubSchema,
        resolve({ ctx, input }) {
            return new trpc.Subscription<Message>((emit) => {
                function onMessage(data: Message) {
                    if (input.roomId === data.roomId) {
                        emit.data(data);
                    }
                }

                ctx.ee.on(Events.SEND_MESSAGE, onMessage);

                return () => {
                    ctx.ee.off(Events.SEND_MESSAGE, onMessage);
                };
            });
        },
    });