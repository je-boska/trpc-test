import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { prisma } from '../../../server/prisma';
import { postsRouter } from '../../../server/routers/posts';

export async function createContext(
  ctxOptions?: trpcNext.CreateNextContextOptions
) {
  const req = ctxOptions?.req;
  const res = ctxOptions?.res;

  return {
    req,
    res,
    prisma,
    posts: prisma.posts,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}

const router = createRouter()
  .transformer(superjson)
  .merge('posts.', postsRouter);

export const appRouter = router;
export type AppRouter = typeof router;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
