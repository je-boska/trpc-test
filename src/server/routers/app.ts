import * as trpc from '@trpc/server';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';

const defaultPostsSelect = Prisma.validator<Prisma.PostsSelect>()({
  id: true,
  title: true,
});

export const appRouter = trpc.router().query('getPosts', {
  async resolve() {
    const posts = await prisma.posts.findMany({ select: defaultPostsSelect });
    return posts;
  },
});

export type AppRouter = typeof appRouter;
