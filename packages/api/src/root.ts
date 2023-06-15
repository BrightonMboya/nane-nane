import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { resourcesRouter } from "./router/resources";
import { roomRouter } from "./router/room";
import { chatRouter } from "./router/chat";

import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  resources: resourcesRouter,
  room: roomRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
