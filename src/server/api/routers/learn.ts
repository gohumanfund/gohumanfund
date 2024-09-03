import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { desc, eq } from 'drizzle-orm';
import {
  learningResources,
  workshops,
  successStories,
} from '~/server/db/schema';

export const learnRouter = createTRPCRouter({
  getLearningResources: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(learningResources)
      .orderBy(desc(learningResources.createdAt));
  }),

  getLearningResourceById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [resource] = await ctx.db
        .select()
        .from(learningResources)
        .where(eq(learningResources.id, input.id));
      return resource;
    }),

  getWorkshops: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(workshops).orderBy(desc(workshops.date));
  }),

  getWorkshopById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [workshop] = await ctx.db
        .select()
        .from(workshops)
        .where(eq(workshops.id, input.id));
      return workshop;
    }),

  getSuccessStories: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(successStories)
      .orderBy(desc(successStories.createdAt));
  }),

  getSuccessStoryById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [story] = await ctx.db
        .select()
        .from(successStories)
        .where(eq(successStories.id, input.id));
      return story;
    }),
});
