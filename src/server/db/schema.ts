import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  decimal,
  date,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

export const createTable = pgTableCreator((name) => `subhub_${name}`);

export const users = createTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  passwordHash: varchar('password_hash', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  planTier: varchar('plan_tier', { length: 50 }),
  totalSubscriptionValue: decimal('total_subscription_value', {
    precision: 10,
    scale: 2,
  }),
});

export const providers = createTable('provider', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  apiKey: varchar('api_key', { length: 255 }),
  category: varchar('category', { length: 100 }),
});

export const subscriptions = createTable('subscription', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  providerId: integer('provider_id').references(() => providers.id),
  planName: varchar('plan_name', { length: 255 }),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  billingCycle: varchar('billing_cycle', { length: 50 }),
  nextBillingDate: date('next_billing_date'),
  status: varchar('status', { length: 50 }),
});

export const payments = createTable('payment', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  subscriptionId: integer('subscription_id').references(() => subscriptions.id),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }),
  paymentDate: timestamp('payment_date'),
});

export const paymentAssurance = createTable('payment_assurance', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  coveredAmount: decimal('covered_amount', { precision: 10, scale: 2 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  status: varchar('status', { length: 50 }),
  recoveryAmount: decimal('recovery_amount', { precision: 10, scale: 2 }),
});

export const userAnalytics = createTable('user_analytics', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  totalSaved: decimal('total_saved', { precision: 10, scale: 2 }),
  subscriptionCount: integer('subscription_count'),
  lastOptimizationDate: date('last_optimization_date'),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  payments: many(payments),
  paymentAssurances: many(paymentAssurance),
  analytics: many(userAnalytics),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
  provider: one(providers, {
    fields: [subscriptions.providerId],
    references: [providers.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, { fields: [payments.userId], references: [users.id] }),
  subscription: one(subscriptions, {
    fields: [payments.subscriptionId],
    references: [subscriptions.id],
  }),
}));

export const paymentAssuranceRelations = relations(
  paymentAssurance,
  ({ one }) => ({
    user: one(users, {
      fields: [paymentAssurance.userId],
      references: [users.id],
    }),
  })
);

export const userAnalyticsRelations = relations(userAnalytics, ({ one }) => ({
  user: one(users, { fields: [userAnalytics.userId], references: [users.id] }),
}));

// Keep the existing NextAuth-related tables
export const accounts = createTable(
  'account',
  {
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_user_id_idx').on(account.userId),
  })
);

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('session_token', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_user_id_idx').on(session.userId),
  })
);

export const verificationTokens = createTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
