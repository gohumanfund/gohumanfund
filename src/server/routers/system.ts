import { createTRPCRouter, protectedProcedure } from '../trpc';
import { db } from '~/server/db';
import { sql } from 'drizzle-orm';

export const systemRouter = createTRPCRouter({
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const [dbStatus, apiStatus, userStats, subscriptionStats] =
      await Promise.all([
        db.execute(sql`SELECT 1`),
        db
          .select()
          .from(db.apiLogs)
          .orderBy(db.apiLogs.timestamp.desc())
          .limit(1),
        db
          .select({
            total: sql<number>`COUNT(*)`,
            active: sql<number>`SUM(CASE WHEN last_login > NOW() - INTERVAL '30 days' THEN 1 ELSE 0 END)`,
          })
          .from(db.users),
        db
          .select({
            total: sql<number>`COUNT(*)`,
            active: sql<number>`SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END)`,
          })
          .from(db.subscriptions),
      ]);

    return {
      database: {
        status: dbStatus ? 'OK' : 'Error',
        latency: dbStatus[0].latency,
      },
      api: {
        status: 'OK',
        requestsPerMinute: apiStatus[0]?.requests_per_minute ?? 0,
      },
      users: {
        total: userStats[0].total,
        active: userStats[0].active,
      },
      subscriptions: {
        total: subscriptionStats[0].total,
        active: subscriptionStats[0].active,
      },
    };
  }),
});
