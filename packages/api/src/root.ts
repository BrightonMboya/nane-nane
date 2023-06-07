import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { resourcesRouter } from "./router/resources";
import { userRouter } from "./router/users";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  resources: resourcesRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
