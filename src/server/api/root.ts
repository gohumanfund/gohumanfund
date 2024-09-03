import { createTRPCRouter } from '~/server/api/trpc';
// import AppRouter from "next/dist/client/components/app-router";
import { userRouter } from '~/server/api/routers/user';
import { systemRouter } from '~/server/api/routers/system';
import { type AnyRouter, type inferRouterContext } from '@trpc/server';
import { learnRouter } from '~/server/api/routers/learn';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  system: systemRouter,
  learn: learnRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCallerFactory = <TRouter extends AnyRouter>(router: TRouter) => {
  return (ctx: inferRouterContext<TRouter>) => {
    return router.createCaller(ctx);
  };
};

export const createCaller = createCallerFactory(appRouter);

// export const createCaller = (ctx: inferRouterContext<AppRouter>) => {
//   return appRouter.createCaller(ctx);
// };
