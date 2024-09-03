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
  boolean,
  pgTable,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

export const createTable = pgTableCreator(
  (name: string) => `gohumanfund_${name}`
);

export const users = createTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: varchar('image', { length: 255 }),
  // Additional custom fields
  passwordHash: varchar('password_hash', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  bannedReason: text('banned_reason'),
  bannedUntil: timestamp('banned_until'),
  bannedAt: timestamp('banned_at'),
  admin: boolean('admin').default(false).notNull(),
  lastLogin: timestamp('last_login'),
});

export const userIsBanned = sql`CASE WHEN "banned_until" IS NOT NULL AND CURRENT_TIMESTAMP < "banned_until" THEN true ELSE false END`;

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

export const learningResources = createTable('learning_resource', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(), // 'video' or 'article'
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  link: varchar('link', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const workshops = createTable('workshop', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: timestamp('date').notNull(),
  registrationLink: varchar('registration_link', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const successStories = createTable('success_story', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  founderName: varchar('founder_name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const apiLogs = pgTable('api_logs', {
  id: serial('id').primaryKey(),
  timestamp: timestamp('timestamp').defaultNow(),
  requestsPerMinute: integer('requests_per_minute'),
});

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id),
  status: text('status', { enum: ['active', 'inactive', 'cancelled'] }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ALL_TABLES = [
  users,
  accounts,
  sessions,
  verificationTokens,
  learningResources,
  workshops,
  successStories,
  apiLogs,
  subscriptions,
];

export const ALL_RELATIONS = [];
