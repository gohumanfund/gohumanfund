import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input.email));
      if (existingUser.length > 0) {
        throw new Error('User already exists');
      }

      const passwordHash = await bcrypt.hash(input.password, 10);
      const newUser = await ctx.db
        .insert(users)
        .values({
          email: input.email,
          passwordHash,
          name: input.name,
          planTier: 'Basic',
        })
        .returning();

      return newUser[0];
    }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, ctx.session.user.id));
    return user[0];
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db
        .update(users)
        .set(input)
        .where(eq(users.id, ctx.session.user.id))
        .returning();
      return updatedUser[0];
    }),
});
