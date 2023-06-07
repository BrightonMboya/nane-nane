import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { chatRouter } from "./router/chat";
import { resourcesRouter } from "./router/resources";
import { createTRPCRouter } from "./trpc";
import { userRouter } from "./router/users";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  resources: resourcesRouter,
  chat: chatRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
