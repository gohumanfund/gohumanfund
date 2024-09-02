import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { subscriptions, providers } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const subscriptionRouter = createTRPCRouter({
  addSubscription: protectedProcedure
    .input(
      z.object({
        providerId: z.number(),
        planName: z.string(),
        amount: z.number(),
        billingCycle: z.string(),
        nextBillingDate: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newSubscription = await ctx.db
        .insert(subscriptions)
        .values({
          userId: ctx.session.user.id,
          ...input,
          status: 'active',
        })
        .returning();
      return newSubscription[0];
    }),

  getUserSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const userSubscriptions = await ctx.db
      .select()
      .from(subscriptions)
      .innerJoin(providers, eq(subscriptions.providerId, providers.id))
      .where(eq(subscriptions.userId, ctx.session.user.id));
    return userSubscriptions;
  }),

  updateSubscription: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        planName: z.string().optional(),
        amount: z.number().optional(),
        billingCycle: z.string().optional(),
        nextBillingDate: z.date().optional(),
        status: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const updatedSubscription = await ctx.db
        .update(subscriptions)
        .set(updateData)
        .where(eq(subscriptions.id, id))
        .returning();
      return updatedSubscription[0];
    }),
});
