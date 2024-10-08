import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // Make sure to install uuid package

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
          id: uuidv4(), // Generate a new UUID for the user
          email: input.email,
          passwordHash,
          name: input.name,
          planTier: 'Basic',
        })
        .returning();

      return newUser[0];
    }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    });
    return user;
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

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(users);
  }),

  createUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        admin: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the current user is an admin
      const currentUser = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id),
      });

      if (!currentUser?.admin) {
        throw new Error('Only admins can create new users');
      }

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
          id: uuidv4(),
          email: input.email,
          passwordHash,
          name: input.name,
          admin: input.admin,
        })
        .returning();

      return newUser[0];
    }),
});
