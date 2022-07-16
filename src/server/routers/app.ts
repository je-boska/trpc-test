import users from '../../../data/users.json';
import * as trpc from '@trpc/server';

export const appRouter = trpc.router().query('getUsers', {
  async resolve() {
    return users;
  },
});

export type AppRouter = typeof appRouter;
