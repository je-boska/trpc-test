import * as trpc from '@trpc/server';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { z } from 'zod';
import { MyContextType } from '../context';

const defaultPostsSelect = Prisma.validator<Prisma.PostsSelect>()({
  id: true,
  title: true,
});

export const appRouter = trpc
  .router<MyContextType>()
  .query('getPosts', {
    async resolve() {
      const posts = await prisma.posts.findMany({ select: defaultPostsSelect });
      return posts;
    },
  })
  .mutation('createPost', {
    input: z.object({ title: z.string().min(1).max(200) }),
    async resolve({ input }) {
      const post = prisma.posts.create({
        data: input,
        select: defaultPostsSelect,
      });
      return post;
    },
  });

export type AppRouter = typeof appRouter;
