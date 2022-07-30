import { z } from 'zod';
import { createRouter } from '../../pages/api/trpc/[trpc]';

export const postsRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      const posts = await ctx.posts.findMany({ orderBy: { id: 'asc' } });
      return posts;
    },
  })
  .mutation('add', {
    input: z.object({
      title: z.string().min(1).max(200),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.posts.create({
        data: input,
      });
      return post;
    },
  });
