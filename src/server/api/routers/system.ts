import { createTRPCRouter, protectedProcedure } from '../trpc';

export const systemRouter = createTRPCRouter({
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    // This is a placeholder implementation. In a real application,
    // you'd want to gather actual system metrics here.
    return {
      database: {
        status: 'OK',
        latency: 5,
      },
      api: {
        status: 'OK',
        requestsPerMinute: 100,
      },
      users: {
        total: 1000,
        active: 750,
      },
      subscriptions: {
        total: 1500,
        active: 1200,
      },
    };
  }),
});
