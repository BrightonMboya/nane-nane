import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { resourcesRouter } from "./router/resources";
import { roomRouter } from "./router/room";
import { chatRouter } from "./router/chat";
import { createTRPCRouter } from "./trpc";
import { userRouter } from "./router/users";
import { eventsRouter } from "./router/events";
import { tweetsRouter } from "./router/tweets";
import { tweetRouter } from "./router/tweetRouter";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  resources: resourcesRouter,
  room: roomRouter,
  chat: chatRouter,
  users: userRouter,
  events: eventsRouter,
  tweets: tweetRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
