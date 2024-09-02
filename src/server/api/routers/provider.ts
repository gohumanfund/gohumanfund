import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { providers } from '../../db/schema';

export const providerRouter = createTRPCRouter({
  createProvider: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        apiKey: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProvider = await ctx.db
        .insert(providers)
        .values(input)
        .returning();
      return newProvider[0];
    }),

  getAllProviders: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(providers);
  }),
});
